function mergeSort(arr) {
  sortProcess(arr, 0, arr.length - 1);
}

function sortProcess(arr, L, R) {
  if(L === R) return;
  let mid = parseInt((L + R) / 2);
  sortProcess(arr, L, mid);
  sortProcess(arr, mid + 1, R);
  merge(arr, L, mid, R);
}

function merge(arr, L, mid, R) {
  let help = [];
  let lPoint = L;
  let rPoint = mid + 1;
  while ( !(lPoint > mid) && !(rPoint > R) ) {
    if (arr[lPoint] <= arr[rPoint]) {
      help.push(arr[lPoint]);
      lPoint++;
    }
    else if (arr[lPoint] > arr[rPoint]) {
      help.push(arr[rPoint]);
      rPoint++;
    }
  }
  if (lPoint > mid) {
    while ( !(rPoint > R) ) {
      help.push(arr[rPoint]);
      rPoint++;
    }
  }
  else if(rPoint > R) {
    while ( !(lPoint > mid) ) {
      help.push(arr[lPoint]);
      lPoint++;
    }
  }

  for(let i = 0; i< help.length; i++) {
    arr[L + i] = help[i];
  }
}

module.exports = mergeSort;

// 归并排序，关键就是二分法，不断将数组进行二分法，分到只有一个数为止，进行合并。
// 合并过程是，创建一个新数组，设置一个  left  指向左侧数组的头部， 设置一个  right  指向右侧数组头部。
// 比较 left 与 right 的指向的值的大小， 谁大放到数组中，同时指针向后挪，当谁先挪到最后，另一部分就将其剩余部分直接添加到数组中。