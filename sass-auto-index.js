/**
 * dart-sassの @use @forward を使いやすくするmodule
 * 指定ディレクトリの子・子孫ディレクトリ内で、_xxx.scssの形式でファイルを作成すると
 * _index.scssが自動で作成されその中に@forward 'xxx';の形式で自動記述される
 * 指定ディレクトリ直下では_xxx.scssファイルを作成しても_index.scssは作成されない
 * 
 * ※chokidar等の監視moduleを使用するとループしてしまうので_index.scssを監視対象からはずしてあげる必要がある
 * chokidarでは、-i '/hoge/' のように除外対象を正規表現で指定できるが、頭のアンダースコアが認識されないので'^.*index.scss$'として使用
 * ex) "chokidar './src/assets/scss/' -c 'npm run css' -i /^.*index.scss$/ --initial"
 */

const fs = require('fs');
const path = require('path');

let fileNames = [];
let childrenDirPath = [];

// 指定ディレクトリ内のディレクトリを読み込む関数
const readTarget = (targetPath) => {
  fs.readdir(targetPath, {withFileTypes: true}, (err, children) => {
    // エラー処理
    if (err) {
      console.error('This Directory is undifind.');
      return;
    }

    // ディレクトリが空だったら終了
    if (!children.length) {
      console.log('some empty directory exists.');
      return;
    }

    // ディレクトリなのかファイルなのかをチェックしてそれぞれを配列に入れる
    for (const child of children) {

      if (child.isFile() && targetPath !== process.argv[2] ) {
        let filename = child.name.toLowerCase();
        // もし_index.scss以外のアンダースコアから始まるscssファイルだったらアンダースコアと拡張子を削除
        if( filename.match(/^_.*\.(scss)$/) && filename !== '_index.scss' ){
          fileNames.push(filename.slice(1, -5));
        }
      } else if (child.isDirectory()) {
        const childDirPath = path.join(targetPath, child.name);
        childrenDirPath.push(childDirPath);

        const inDir = fs.readdirSync(childDirPath);
        if (targetPath !== process.argv[2] && inDir.length) {
          fileNames.push(child.name);
        }
      }
    }

    // ディレクトリ内のファイル名を_index.scss作成関数に渡して実行
    if (fileNames.length) {
        makeIndex(fileNames, targetPath);
        fileNames = [];
    }

    // ディレクトリ内にあったディレクトリをもう一度同じ処理
    if (childrenDirPath.length) {
      for(const childDirPath of childrenDirPath) {
          readTarget(childDirPath);
      }
      // １つのディレクトリを取得したら空にしないと溜まり続けて終わらなくなる
      childrenDirPath = [];
    }
    return;
  });
}

// _index.scssを作成
const makeIndex = (fileNames, dirPath) => {
  const forwardName = [];
  for(const fileName of fileNames) {
    forwardName.push(`@forward '${fileName}';`);
  }
  const str = forwardName.join('\n');
  fs.writeFile(`${dirPath}/_index.scss`, str, (err) => {
    if(err) {
      console.log(err);
    }
  });
}

readTarget(process.argv[2]);