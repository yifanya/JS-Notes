let arr = [
  [
    ['1-7', '2-6'],
    '4-6',
    [
      ['2-0', '1-4'],
      ['3-9'],
      '4-5',
    ],
  ]
]
// Q1: flat 拆解
function flat(arr) {
  let result = []
  function _flat(item) {
    if(Array.isArray(item)) {
      item.forEach(i => {
        _flat(i)
      });
    }
    else {
      result.push(item)
    }
  }
  _flat(arr)
  return result
}

function flat2(arr) {
  return arr.join(',').split(',')
}

// Q2: 数组计算 '1-7' => 1 * 7 = 7
function calc(str) {
  let arr = str.split('-')
  return +arr[0] - +arr[1]
}

function flat (n = 1) {
  if (n === 0) return this;
  return this.reduce((prev, next) => {
    if (Array.isArray(next)) {
      return [...prev, ...next.flat(--n)]
    }
    else {
      return [...prev, next]
    }
  }, []);
}

Array.prototype.flat = flat;
let arr = [1, [2, [3, [4]]]];

const result = arr.flat(1);
console.log('result', result);