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
// Q1: flat
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
// Q3: 数组排序和去重
// sort 函数
// 快排
function partition(arr, L, R) {
  let before = L-1, after = R;
  let current = L;
  let point = arr[after-1];
  let same = 0;
  function change(arr, a, b) {
    let temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp
  }
  while (current!==after) {
    if(arr[current] < point) {
      before++;
      change(arr, current, before)
      current++;
    }
    else if(arr[current] === point) {
      current++;
      same++;
    }
    else {
      after--;
      change(arr, current, after)
    }
  }
  return `${current-same} ${current}`
}
function quickSort(arr, L, R) {
  if(L< R) {
    let [Lend, Rstart] = partition(arr, L, R).split(' ')
    quickSort(arr, L, Lend)
    quickSort(arr, Rstart, R)
  }
}