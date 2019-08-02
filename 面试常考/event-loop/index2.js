async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  //async2做出如下更改：
  new Promise(function (resolve) {
    console.log('promise1');
    resolve();
  }).then(function () {
    console.log('promise2');        // 宏任务 script, settimeout
  });                               // 微任务 promise2, async1, promise3
}
console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0)
async1();

new Promise(function (resolve) {
  console.log('promise3');
  resolve();
}).then(function () {
  console.log('promise4');
});

console.log('script end');

/**
 * script start
 * async1 start
 * promise1
 * promise3
 * script end
 * promise2
 * async1 end
 * promise4
 * settimeout
 */