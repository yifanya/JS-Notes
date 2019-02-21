let arr = [3, 4, 2, 6, 1, 88, 3, 8, 1, 5, 8, 134];

function swap(po1, po2, arr) {
  let temp = arr[po1];
  arr[po1] = arr[po2];
  arr[po2] = temp;
}

// 当index位置的值修改后，重新恢复排序状态
function heapify(arr, index, heapSize) {
  let left = index * 2 + 1;
  while (left < heapSize) {
    let largest = left + 1 < heapSize && arr[left+1] > arr[left]
      ? left + 1
      : left;
    largest = arr[largest] > arr[index] ? largest : index;
    if(largest === index) break;
    swap(index, largest, arr);
    index = largest;
    left = largest * 2 + 1;
  }
}

// 调整一棵二叉树的使之成为大根堆
function heapInsert(arr, length) {
  for(let i =0; i < length; i++) {
    let index = i;
    while (arr[index] > arr[parseInt((index - 1) / 2)]) {
      swap(index, parseInt((index - 1) / 2), arr)
      index = parseInt((index - 1) / 2)
    }
  }
}


function sort(arr) {
  let heapSize = arr.length - 1;
  heapInsert(arr, arr.length);
  do {
    swap(0, heapSize, arr);
    heapify(arr, 0, heapSize)
  } while (heapSize--);
}

module.exports = sort;

// 堆排序，主要分两个部分： 一个函数将数组完全调整大根堆， 一个函数将修改过某个值的大根堆重新调整为大根堆。
// 调整大根堆的思想是： 我们可以把一个大的大根堆拆分，拆分成小的大根堆，因为 1 个元素也可以看成大根堆，两个也是 。。。
// 那么我们每次都将数组的最后一个添加到堆里，然后对这个元素进行大根堆调换。这样当整个数组调换完一个完整的大根堆也就形成了。
// 调换的方法是，把当前添加进来的数与父节点数作比较，比父节点数大就调换它与父节点数，然后循环这个过程，直到某个父节点比它大为止；

// 修改某个数后重新调整大根堆思想： 修改某个数，那你只需要判断这个数的双子节点是否大于它，如果大于，那么就将双子节点中较大的那个与之交换
// 然后重复向上查找。