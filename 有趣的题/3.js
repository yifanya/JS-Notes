// 一定程度上获取变量类型
function getType(params) {
  let str = Object.prototype.toString.call(params);
  return str.slice(7, -1);
}
// console.log(getType(new Function()))
// 深拷贝

function clonedeep(obj) {
  if(obj === null || typeof obj !== 'object') return
  let res = obj instanceof Array ? [] : {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = obj[key];
    }
  }
  return res;
}

clonedeep([1, 2])