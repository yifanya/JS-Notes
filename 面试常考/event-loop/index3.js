async function async1() {
  console.log('async1 start');
  await async2();
  //更改如下：
  setTimeout(function () {
    console.log('setTimeout1')
  }, 0)
}
async function async2() {
  //更改如下：
  setTimeout(function () {            // 宏队列  script settimeout3 settimeout2
    console.log('setTimeout2')        // 微队列  async1 async2 promise2
  }, 0)
}
console.log('script start');

setTimeout(function () {
  console.log('setTimeout3');
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
 * promise1
 * script end
 * promise2
 * settimeout3
 * settimeout2
 */