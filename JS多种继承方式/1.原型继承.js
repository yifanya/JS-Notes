// 声明父构造函数
function Parent() {}
// 为父构造函数添加方法
Parent.prototype.greet = function (sound) {
  console.log(sound);
}

// 声明子类
function Son() {}

/**
 * 开始继承
 * 1. 创建父构造函数实例
 * 2. 将子构造函数的显式原型链指向创建的实例
 * 3. 创建子实例
 */

Son.prototype = new Parent();
let son = new Son();

// 存在致命缺点，由于 Son.prototype 指向的是一个固定的对象。那么所有son实例挂载到原型上面的属性全都指向一个