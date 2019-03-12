const path = require('path');
const fs = require('fs');
const babylon = require('babylon')
const t = require('@babel/types')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const ejs = require('ejs')

class Compiler{
  constructor(config) {
    this.config = config
    // 获取入口路径
    this.entryID
    // 模块依赖
    this.modules = {}
    this.entry = config.entry
    // 运行的工作路径
    this.root = process.cwd()  // 运行脚本所在的目录
  }
  _getSource(modulePath) {
    return fs.readFileSync(modulePath, 'utf8')
  }
  _parse(source, parentPath) { // parentPath 是父路径名
    let ast = babylon.parse(source)
    let dependencies = []
    traverse(ast, {
      CallExpression(p) {
        let node = p.node;
        if (node.callee.name === 'require') {
          node.callee.name = '__webpack_require__'
          let moduleName = node.arguments[0].value
          moduleName = moduleName + (path.extname(moduleName) ? "" : ".js")
          moduleName = './' + path.join(parentPath, moduleName)
          dependencies.push(moduleName)
          node.arguments = [t.stringLiteral(moduleName)]
        }
      }
    })
    let sourceCode = generator(ast).code;
    return { sourceCode, dependencies }
  }
  buildModule(modulePath, isEntry) {
    let source = this._getSource(modulePath)  // 获取文件对应的内容
    // 获取模块id  也就是模块的相对路径
    let moduleName = './' + path.relative(this.root, modulePath)
    if (isEntry) this.entryID = moduleName
    let { sourceCode, dependencies } = this._parse(source, path.dirname(moduleName))
    this.modules[moduleName] = sourceCode
    dependencies.forEach(dep => {
      this.buildModule(path.join(this.root, dep), false);
    })
  }
  emitFile() {
    let mainPath =  path.join(this.config.output.path, this.config.output.filename)
    let templateStr = this._getSource(path.join(__dirname, './template.ejs'))
    let code = ejs.render(templateStr, {
      entryID: this.entryID,
      modules: this.modules
    })
    // console.log('code', code)
    this.assets = {};
    this.assets[mainPath] = code
    fs.writeFileSync(mainPath, code, {
      encoding: 'utf-8',
      flag: 'w'
    });
  }
  run() {
    this.buildModule(path.resolve(this.root, this.entry)) // 传入当前文件的入口文件
    // 发射后的文件
    // console.log(this.modules, this.entryID)
    this.emitFile()
  }
}

module.exports = Compiler;