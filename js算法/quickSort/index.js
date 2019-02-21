let arr = [3,4,2,6,1,88,3,8,1,5,8,134];

function partition(arr, L, R) {
  let less = L - 1;
  let more = R;
  let current = L;
  let same = 0;
  let num = arr[R-1];
  function change(po1, po2, arr) {
    let temp = null;
    temp = arr[po1];
    arr[po1] = arr[po2];
    arr[po2] = temp;
  }
  while (current !== more) {
    if (arr[current] < num)
      change(++less, current++, arr);
    else if (arr[current] > num)
      change(--more, current, arr);
    else if(arr[current] === num) {
      current++;
      same++;
    };
  }
  return {
    Lend: current - same,
    Rstart: current
  }
}
function sort(arr, L, R) {
  if(L < R) {
    let obj = partition(arr, L, R);
    sort(arr, L, obj.Lend);
    sort(arr, obj.Rstart, R);
  }
}

module.exports = function (arr) {
  sort(arr, 0, arr.length);
}

// 快排就是，根据一个标准数(num)将一个数组分为三部分(小于，等于，大于);
// 当然，排的过程分为4个部分， 1.比num小的。 2.等于num的。 3.未探索到的。 4.大于num的
// 设置三个指针，分别指向要进行分割的数组的  left = 0，right = arr.length-1， 以及 current = 0处(这里是滑动指针，用来向右挪的)。
// 使用一个循环，使current的指向不断向右滑动，
// 当碰到  小于num  current指向的数与left指向的进行调换。同时left++， current++
// 当碰到  等于num  current++， 其余不变
// 当碰到  大于num  current指向的数与right指向的进行调换，同时right--， current不变。