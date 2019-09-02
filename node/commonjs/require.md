### 1.require方法
调用require function
```
  function require(path) {
    return mod.require(path);
  }
```
这个mod是一个Module对象实例，也就是一个模块的实例。  
#### 1. Module.prototype.require
```
// mod.require
Module.prototype.require = function(path) {
  return Module._load(path, this, /* isMain */ false);
};
// this指向当前的mod实例
```
这个方法走向了一个Module的私有静态方法。
##### 1. Module._load
```
Module._load = function (request, parent, isMain) {
  // ...
  // request 就是 path
  var filename = Module._resolveFilename(request, parent, isMain);
}
```
**Module._resolveFilename:**这里面做了这些事情
1. NativeModule.nonInternalExists(request) 判断是否原生模块，是则直接返回
2. Module._resolveLookupPaths(request, parent, true) 获取当前文件对应路径
3. Module._findPath(request, paths, isMain) 获取加载文件的路径并且返回
4. 返回的结果就是require的文件绝对路径，也就是上面filename对应的值。
```
var filename = Module._resolveFilename(request, parent, isMain);
var cachedModule = Module._cache[filename];
// 检查一下是否缓存过此模块
var module = new Module(filename, parent);
// 创建当前模块实例，并且链接到父模块内
// module构造函数没什么东西
function Module(id, parent) {
  this.id = id;
  this.exports = {};
  this.parent = parent;
  updateChildren(parent, this, false);
  this.filename = null;
  this.loaded = false;
  this.children = [];
}
// updateChildren()将自己挂载到parent模块上
// 然后调用load方法加载模块内容
```
#### 2.load加载过程
##### 1. 根据文件名，获取文件后缀(.js|.json|.node)
##### 2. 根据文件后缀，按照对应的方式解析
使用Module._extensions[ext]对应的方法。  
此数组包含三种解析方式，也就是(.js|.json|.node)
你可以把它看成一下这个样子
```
Module._extensions = {
  '.js'() {},
  '.json'() {},
  '.node'() {}
}
```
##### 3. 获取对应文件名的模块内容
```
Module._extensions['.js'] = function(module, filename) {
  var content = fs.readFileSync(filename, 'utf8');
  module._compile(stripBOM(content), filename);
};
// 很简单有没有，就丫个readFileSync。。。
// 关键是这个module._compile到底做了什么
```
关于这个stripBOM，这是一个去BOM操作，具体看这里。
[https://segmentfault.com/a/1190000012086435](link)
##### 4. module._compile做的哪些事
1. var wrapper = Module.wrap(content); 这是一个拼接过程，就是将内容接个头，接个尾。最后结果是这样的
```
(function (exports, require, module, __filename, __dirname) { /* 导入模块的代码 */ })
```
2. var compiledWrapper = vm.runInThisContext(wrapper, {filename: filename}) 这里大致就是创建一个沙盒，在其中运行js代码，在这里这个方法是将js代码运行到当前的global上下文对象中，但是运行结果不会污染本地作用域的变量。算了具体看[http://nodejs.cn/api/vm.html](node.cn)我还是别乱说，别误导人哈哈哈。
3. result = compiledWrapper.call(this.exports, /* 函数参数对应的变量 */)

##### 5.结束
```
return module.exports;
// 返回当前模块的exports值
```
至此，整个模块就创建好了
```
// 模块内容
{
  children:Array(0) [],
  exports:"z.js",
  filename:"/Users/lvyifan/Desktop/JS-Notes/z.js",
  id:"/Users/lvyifan/Desktop/JS-Notes/z.js",
  loaded:true,
  parent:Module {id: ".", exports: Object, parent: null, …},
  paths:Array(5) []
}
```