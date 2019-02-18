//1.bind初级用法，改变调用函数this的指向，指向传入的obj，并且附带传入bind之后的参数，全部丢给调用函数
//2.bind高级用法，当你使用new关键字时候，你需要抹除bind中第一个obj，将this指向当前创建的对象。
let bindObj = { value: 'bindObj value' };

function testBind(arg1,arg2,arg3) {
  this.habit === 'shopping';
  console.log(this.value);
  console.log(arg1);
  console.log(arg2);
  console.log(arg3);
}

function mockBind(obj,...args) {
  let self = this;
  function fbound (...otherArgs){
    //判断到底是通过new调用还是通过函数调用
    //mdn的解释：
    //一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。
    //提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。
    self.apply( this instanceof self ? this : obj,[...args,...otherArgs])
  }
  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承函数的原型中的值
  fbound.prototype = self.prototype;
  return fbound;
}

Function.prototype.mockBind = mockBind;

let result = testBind.mockBind(bindObj,'obj1','obj2');
let res = new result('obj3');


var value = 2;

var foo = {
  value: 1
};

function bar(name, age) {
  this.habit = 'shopping';
  console.log(this.value);
  console.log(name);
  console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin

console.log(obj.__proto__ === bar.prototype);
console.log(obj instanceof bar);