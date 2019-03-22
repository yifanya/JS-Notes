// 老生常谈，数组去重
let arr = [1, 1, '1', '1', 1, 2, 2, 2, 3, 5, 4, 1, 2, 4, 5, '1'];

// 1. 原始方法 双for循环
// function unique(arr) {
//   let res = [];
//   for (var i = 0; i < arr.length; i++) {
//     for (var j = 0; j < res.length; j++) {
//       if(arr[i] === res[j]) break;
//     }
//     if(j === res.length) {
//       res.push(arr[i])
//     }
//   }
//   return res
// }

// 2. 排序后作比较  不是很准
// function unique(arr) {
//   let index = 0;
//   let res = [];
//   let sortArr = arr.concat().sort();
//   console.log('sortArr', sortArr);
//   let seen;
//   while (index < sortArr.length) {
//     seen = sortArr[index]
//     res.push(seen);
//     while (seen === sortArr[index+1]) {
//       index++
//     }
//     index++
//   }
//   return res;
// }

// 3. filter方法
// function unique(arr) {
//   return arr.filter(function(item, index, arr) {
//     return arr.indexOf(item) === index;
//     // indexOf返回找到的第一个元素得位置，然后与当前index做对比，如果不相等说明在此之前已经有一个一样的了。
//   })
// }

// 4.Object的 key 查重
function unique(arr) {
  let obj = {};
  return arr.filter((item, index, arr) => {
    return obj.hasOwnProperty(item + item) ? false : obj[item + item] = true;
  })
}
console.log(unique(arr))