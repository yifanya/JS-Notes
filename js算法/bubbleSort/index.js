function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {  //冒泡排序一定是比arr的长度少一次的
    for (let j = 0; j < arr.length - i - 1; j++) {
      let temp = null;
      if (arr[j] > arr[j + 1]) {
        temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
}

module.exports = bubbleSort;