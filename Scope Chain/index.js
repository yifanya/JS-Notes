function parent() {
  let a = 1
  let b = 2
  function son(params) {
    let sonA = 1;
    return sonA;
  }
  return son();
}
let son = parent();

console.log(son);