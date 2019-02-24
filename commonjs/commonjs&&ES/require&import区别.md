### 1.遵循的规范不同
require: 遵循的是commonjs规范。  
import: 遵循的是ES标准规范。
### 2.规范类型不同
require:
```
const fs = require('fs')
exports.fs = fs
module.exports = fs // 最后这种也不是纯commonjs规范的产物
```
import:
```
import fs from 'fs'
import {default as fs} from 'fs'
import * as fs from 'fs'
import {readFile} from 'fs'
import {readFile as read} from 'fs'
import fs, {readFile} from 'fs'

export default fs
export const fs
export function readFile
export {readFile, read}
export * from 'fs'
/*
* 注意这不是解构赋值，不是解构赋值。
* 虽然看似解构赋值，但是其实 {} 内部可以看成是一块单独的作用域。
*/
```
### 3.加载时间不同
require: require是运行时加载，也就是说他是在运行时，碰到require就将对应的文件获取过来执行一遍，并将对应的属性赋值。  
import: import命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行（import命令叫做“连接” binding 其实更合适）所以，其代码属于编译时加载，在JS编译的时候就会执行一遍，这也就导致了import不支持随叫随到，只能当老大的结果(import 必须写在开头)。当然现在有新的函数import()弥补了import的缺点。

### 4.赋值方法不同
require: 普通的值传递或者引用传递。  
import: 不管是基础类型还是引用类型，都是强绑定，1对1的那种。