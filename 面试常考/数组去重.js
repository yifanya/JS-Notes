// 老生常谈，数组去重排序
let arr = [1, 1, '1', '1', 1, 2, 2, 2, 3, 5, 4, 1, 2, 4, 5, '1'];

// 1. 原始方法 双for循环
function unique(arr) {
  let res = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < res.length; j++) {
      if(arr[i] === res[j]) break;
    }
    if(j === res.length) {
      res.push(arr[i])
    }
  }
  return res
}

// 2. 排序后作比较  不是很准
function unique(arr) {
  let index = 0;
  let res = [];
  let sortArr = arr.concat().sort();
  console.log('sortArr', sortArr);
  let seen;
  while (index < sortArr.length) {
    seen = sortArr[index]
    res.push(seen);
    while (seen === sortArr[index+1]) {
      index++
    }
    index++
  }
  return res;
}

// 3. filter方法
function unique(arr) {
  return arr.filter(function(item, index, arr) {
    return arr.indexOf(item) === index;
    // indexOf返回找到的第一个元素得位置，然后与当前index做对比，如果不相等说明在此之前已经有一个一样的了。
  })
}

// 4.Object的 key 查重
function unique(arr) {
  let obj = {};
  return arr.filter((item, index, arr) => {
    return obj.hasOwnProperty(item + item) ? false : obj[item + item] = true;
  })
}
console.log(unique(arr))


// 5.堆排序 去重 + 排序
function mySort() {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    let num = this[i];
    for(var j = i+1; j < this.length; j++) {
      if(num === this[j]) break;
    }
    if(j === this.length) result[result.length] = num;
  }
  function swap(arr, L, R) { // 交换位置
    let temp = arr[L]
    arr[L] = arr[R]
    arr[R] = temp;
  }
  function heapInsert(arr, length) {  // 构建大根堆
    for (let i = 0; i < length-1; i++) {
      let index = i;
      while (arr[index] > arr[parseInt((index - 1) / 2)]) {
        swap(arr, index, parseInt((index - 1) / 2))
        index = parseInt((index - 1) / 2)
      }
    }
  }
  function heapify(arr, index, length) {  // 调整大根堆
    let left = index * 2 + 1
    while (left < length) {
      let largest = arr[left] > arr[left + 1] ? left : left + 1;
      largest = arr[index] > arr[largest] ? index : largest;
      if(largest === index) break;
      swap(arr, largest, index)
      index = largest;
      left = largest * 2 + 1;
    }
  }
  function heapSort(arr) {
    let heapSize = arr.length - 1;
    heapInsert(arr, arr.length);
    do {
      swap(arr, heapSize, 0);
      heapify(arr, 0, heapSize)
    } while (heapSize--);
  }
  heapSort(result)
  return result
}