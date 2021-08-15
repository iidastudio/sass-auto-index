#!/usr/bin/env node
'use strict';

const chokidar = require('chokidar');
const sai = require('./index');

let watch;
const argArray = process.argv.slice(2);

argArray.forEach(arg => {
  if(arg === "-w" || arg === "--watch") {
    watch = true;
    return;
  } else {
    watch = false;
  }
});

console.log(argArray);

if(watch === true) {
  chokidar.watch(argArray, {ignored: [/[\/\\]\./, /._index\.scss/]})
  .on('add', (path) => {
    sai.readTarget(argArray[0]);
  })
  .on('addDir', (path) => {
    sai.readTarget(argArray[0]);
  })
  .on('unlink', (path) => {
    sai.readTarget(argArray[0]);
  })
  .on('unlinkDir', (path) => {
    sai.readTarget(argArray[0]);
  })
  .on('error', (error) => {
    console.error(error);
  });
} else {
  sai.readTarget(argArray[0]);
}