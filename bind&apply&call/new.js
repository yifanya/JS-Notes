function Animal (age) {
  this.name = 'dog';
  this.age = age;
}
Animal.prototype.say = function () {
  console.log('wang wang wang');
}

function New (fn) {
  let o = {};
  o.__proto__ = fn.prototype;
  return (...args) => {
    fn.call(o, ...args);
    return o;
  }
}

let dog = New(Animal)(10);
console.log(dog);