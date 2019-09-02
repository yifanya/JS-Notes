const p = Promise.resolve();
let promise
(() => {
  const imP = new Promise(resolve => {
    promise = new Promise(res => res(p));
    promise.then(() => {
      console.log('after:wait');
      resolve();
    })
  })
  return imP
})()
console.log(p);
p.then(() => {
  console.log(promise)
  console.log('tick:a')
}).then(() => {
  console.log('tick:b')
}).then(() => {
  console.log('tick:c')
})