# sass-auto-index

This module for dart-sass.
create some _index.scss by scanning in the specified directory.
Automatically write @forward in _index.scss.



## use on npm scripts.

watch mode: -w --watch

```json
 "sass-auto-index":"chokidar './src/assets/scss/' -c 'npm run css' -i '/.*_index\\.scss/' --initial"
```

If you are using an existing module to “watch" files and directories,  you need using ignore for avoid loops.
(sass-auto-index uses chokidar internally.)

```json
 "sass-auto-index":"chokidar './src/assets/scss/' -c 'npm run css' -i '/.*_index\\.scss/' --initial"
```

