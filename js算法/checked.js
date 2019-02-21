const obj = require('./generateRandomArrray');
const bubbleSort = require('./bubbleSort');
const quickSort = require('./quickSort');
const insertSort = require('./insertSort');
const selectSort = require('./selectSort');
const mergeSort = require('./mergeSort');
const heapSort = require('./heapSort');

const { generateRandomArray, rightMethods, checkedMethods } = obj;

let arr1 = generateRandomArray(10000, 10000);
let arr2 = [].concat(arr1);
let arr3 = [].concat(arr1);
let testTime = 100;

let firstStart = new Date().getTime();
for(let i=0;i<testTime;i++) {
  mergeSort(arr1);
  // rightMethods(arr2);
  // let result = checkedMethods(arr1, arr2);
  // if(!result) {
  //   console.log('error');
  //   break;
  // }
}
let firstEnd = new Date().getTime();
console.log(firstEnd - firstStart);

let secondStart = new Date().getTime();
for (let i = 0; i < testTime; i++) {
  heapSort(arr3);
}
let secondEnd = new Date().getTime();
console.log(secondEnd - secondStart);

console.log('checked end');