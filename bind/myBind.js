function mockBind(obj, ...args) {
  let self = this
  function fbound (...otherArgs) {
    self.apply(this instanceof self ? this:obj,[...args, ...otherArgs])
  }
  fbound.prototype = self.prototype
  return fbound
}

Function.prototype.mockBind = mockBind;

let obj = {
  name: 'yifan'
}

function foo(...args) {
  console.log('args', args)
  console.log(this.name)
}

let result = foo.bind(obj)
let o1 = new result()
let f1 = new foo()
console.log(Object.prototype._proto_)
console.log(result.prototype)
console.log(obj._proto_)
console.log(f1._proto_ === o1._proto_)
console.log(obj._proto_ === f1._proto_)
// 创建的函数