async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');         // 微任务栈 async1, promise
setTimeout(function () {             // 宏任务栈 script, settimeout
  console.log('setTimeout');
}, 0)
async1();
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});
console.log('script end');

/**
 * script start
 * async1 start
 * async2
 * promise1
 * script end
 * scync1
 * promise2
 * settimeout
 */