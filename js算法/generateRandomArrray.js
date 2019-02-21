function generateRandomArray(size, value) {
  let arr = new Array(Math.round((size+1) * Math.random()));
  for(let i=0; i< arr.length; i++) {
    arr[i] = Math.round((value + 1) * Math.random()) - Math.round((value) * Math.random())
  }
  return arr;
}

function rightMethods(arr) {
  arr.sort(function (a, b) {
    return a - b;
  })
}

function checkedMethods(arr1, arr2) {
  let str1 = arr1.join(' ');
  let str2 = arr2.join(' ');
  // console.log('str1', str1)
  // console.log('str2', str2);
  if(str1 === str2) return true;
  else return false;
}

exports.generateRandomArray = generateRandomArray;
exports.rightMethods = rightMethods;
exports.checkedMethods = checkedMethods;