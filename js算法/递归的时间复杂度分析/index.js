// 递归查找最大值
function getMax(arr, L, R) {
  if(L===R) return arr[L];
  let mid = parseInt((L + R) / 2);
  let lMax = getMax(arr, L, mid);
  let rMax = getMax(arr, mid+1, R);
  return lMax > rMax ? lMax : rMax;
}

let arr = [4,5,1,2,3];

let Max = getMax(arr, 0, arr.length-1);

console.log('Max', Max);