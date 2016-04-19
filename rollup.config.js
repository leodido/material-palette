'use strict'

import babel from 'rollup-plugin-babel';

export default {
  entry: 'index.m.js',
  format: 'umd',
  moduleName: 'materialpalette',
  plugins: [
    babel({
      presets: ['es2015-rollup'],
      exclude: 'node_modules/**'
    })
  ]
}