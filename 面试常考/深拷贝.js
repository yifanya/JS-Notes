/**
 * 仅限于数组和普通对象的
 */
var deepCopy = function (obj) {
  if (typeof obj !== 'object') return;
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}

/**
 * 适用于包含自定义类型在内的
 */
function deepClone (value, weakMap = new WeakMap) {
  if (value == null) return value;
  if (typeof value !== 'object') return value;
  if (value instanceof RegExp) return new RegExp(value);
  if (value instanceof Date) return new Date(value);

  if (weakMap.has(value)) return weakMap.get(value);
  let o = new value.constructor();
  weakMap.set(value, o);
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      o[key] = deepClone(value[key], weakMap);
    }
  }
  return o;
}

let o = {a:1,b:{c:100}};
o.x = o;

let o1 = deepClone(o);
console.log(o1)