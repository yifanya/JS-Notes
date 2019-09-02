function curry (fn, args = []) {
  let len = fn.length;
  return function () {
    args.push(...arguments);
    if (args.length === len) {
      return fn.apply(null, args)
    }
    return curry(fn, args);
  }
}