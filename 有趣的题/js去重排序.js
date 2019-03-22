Array.prototype.mySort = mySort;
var arr = [22,2, 1, 3, 4, 1, 3, 2, 4, 5, 2, 3, 4];
let res = arr.mySort(); // 返回 [1,2,3,4,5]

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

console.log('res', res)