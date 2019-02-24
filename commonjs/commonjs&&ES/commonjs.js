const { count } = require('./counter')
setTimeout(function () {
  console.log('read count after 1000ms in commonjs is', count)
}, 1000)
// ➜  test node commonjs.js
// increase count to 1 in counter.js after 500ms
// read count after 1000ms in commonjs is 0