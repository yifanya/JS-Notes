import { count } from './counter'
setTimeout(function () {
  console.log('read count after 1000ms in es6 is', count)
}, 1000)
// ➜  test babel - node es6.js
// increase count to 1 in counter.js after 500ms
// read count after 1000ms in es6 is 1