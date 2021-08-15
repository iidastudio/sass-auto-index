# sass-auto-index

This module for dart-sass.
create some _index.scss by scanning in the specified directory.
Automatically write @forward in _index.scss.

notice) If you want to npm scripts watch, you need to avoid loops.

ex) "chokidar './src/assets/scss/' -c 'npm run css' -i /.*index.scss/ --initial"