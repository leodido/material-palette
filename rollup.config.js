'use strict'

/* global process */

import babel from 'rollup-plugin-babel';

function inDevelopment() {
  return process.env.BUILD_ENV && ['development', 'dev', 'develop'].indexOf(process.env.BUILD_ENV.toLowerCase()) >= 0
}

var babelOpts = {
  presets: ['es2015-rollup'],
  exclude: 'node_modules/**'
}

var rollupOpts = {
  entry: 'index.m.js',
  moduleName: 'materialpalette',
  format: 'umd',
  plugins: [ babel(babelOpts) ],
  dest: 'index.js'
}

if (inDevelopment()) {
  rollupOpts.sourceMap = 'inline'
}

export default rollupOpts