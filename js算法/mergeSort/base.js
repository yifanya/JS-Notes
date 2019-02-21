let arr1 = [1, 2, 4, 6, 7, 10];
let arr2 = [3, 4, 6, 9];
// 查找arr2中arr1没有的数

function search(arr1, arr2) {
  let arr = [];
  let point1 = 0;
  let point2 = 0;
  while (point1<arr1.length && point2<arr2.length) {
    if (arr2[point2] > arr1[point1])
      point1++;
    else if (arr2[point2] === arr1[point1])
      point2++;
    else if(arr2[point2] < arr1[point1]) {
      arr.push(arr2[point2]);
      point2++;
    }
  }
  arr = arr.concat(arr2.slice(point2))
  return arr
}

console.log('result', search(arr1, arr2));