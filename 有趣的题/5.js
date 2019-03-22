curry.res = 0;
function curry(num) {
  let res = curry.res;
  if(num) res += num;
  curry.res = res;
}
curry.toString = function() {
  return this.res
}

console.log(curry(5))
console.log(curry)