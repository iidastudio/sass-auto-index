# sass-auto-index

This module for dart-sass.
create some _index.scss by scanning in the specified directory.
Automatically write @forward in _index.scss.

It can be use on npm scripts.

watch mode: -w --watch
ex) sass-auto-index targetDir -w

notice: If you “watch" file and directory, you need using ignore for avoid loops.
ex) "chokidar './src/assets/scss/' -c 'npm run css' -i /._index\.scss/ --initial"