let obj = {
  a: 1,
}
// func.call(obj, args)
Function.prototype.call1 = function(obj) {
  let args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push('arguments['+i+']');
  }
  obj.fn = this;
  // obj.fn();
  // console.log(arguments)
  eval('obj.fn('+args.join(',')+')');
  delete obj.fn;
}

function bar(arg1, arg2) {
  console.log(this.a);
  console.log(arg1)
  console.log(arg2)
}

bar.call1(obj, 'yifan', 18);


// Function.prototype.call2 = function (context) {
//   context.fn = this;
//   var args = [];
//   for (var i = 1, len = arguments.length; i < len; i++) {
//     args.push('arguments[' + i + ']');
//   }
//   console.log(arguments)
//   eval('context.fn(' + args + ')');
//   delete context.fn;
// }

// // 测试一下
// var foo = {
//   value: 1
// };

// function bar(name, age) {
//   console.log(name)
//   console.log(age)
//   console.log(this.value);
// }

// bar.call2(foo, 'kevin', 18);
// kevin
// 18
// 1