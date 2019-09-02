const add = a => b => c => d => a+b+c+d;

function uncurry (fn) {
  return function () {
    console.log([...arguments])
    return [...arguments].reduce((prev, next) => {
      return prev(next);
    }, fn)
  }
}

const result = uncurry(add)(1)(2)(3)(4)
console.log('result', result)