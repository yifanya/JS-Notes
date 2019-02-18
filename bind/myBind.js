// 一个绑定函数也能使用new操作符创建对象：
// 这种行为就像把原函数当成构造器。
// 提供的 this 值被忽略， 同时调用时的参数被提供给模拟函数。

// 将调用的函数作为构造函数，然后抹除传入的对象作为this，其余的数据作为参数

function mockBind(objBind, ...fatherArgs) {
  let _this = this;
  function fbound (...sonArgs) {
    _this.apply(this instanceof _this ? this : objBind, [...fatherArgs, ...sonArgs])
  }
  fbound.prototype = _this.prototype;
  return fbound;
  // _this.prototype就是_this实例的__proto__
}

Function.prototype.mockBind = mockBind;

function test(arg1, arg2, arg3) {
  this.habit = "habit lalala";
  console.log(this.value);
  console.log(arg1)
  console.log(arg2)
  console.log(arg3)
}

let obj = {
  value: '111'
}

let testConstructor = test.mockBind(obj, 'arg1');
let testobj = new testConstructor('arg2', 'arg3');
