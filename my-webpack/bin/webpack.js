#! /usr/bin/env node
const path = require('path')
const Compiler = require('../lib/Compiler.js')

// 拿到运行目录下的webpack.config.js配置文件
let config = require(path.resolve('webpack.config.js'))
// 默认我的配置文件是运行目录的根目录下面的webpack.config.js
let compiler = new Compiler(config);

compiler.run();