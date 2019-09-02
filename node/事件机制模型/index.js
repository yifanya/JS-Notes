const fs = require('fs');

fs.readFile('./index.md', () => {
  setImmediate(() => {
    console.log('setImmediate')
  })
  setTimeout(() => {
    console.log('setTimeout')
  })
  Promise.resolve(100).then(() => console.log('index.md1'));
  process.nextTick(() => console.log('next tick1'))
})

Promise.resolve(100).then(() => console.log('index.md2'));
process.nextTick(() => console.log('next tick2'))