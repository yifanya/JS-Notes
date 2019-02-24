// function throttle(func, wait) {
//   let timer = null;
//   return function (event) {
//     // clearTimeout(timer);
//     if (!timer) {
//       func.apply(this, [event]);
//       timer = setTimeout(() => {
//         timer = null;
//       }, wait);
//     }
//   }
// }

let index = 0;
let container = document.getElementById('container');
let func = throttle(function (e) {
  console.log('this', this);
  container.innerHTML = index++;
  console.log('event', e);
}, 2000);

btn.onclick = func.cancel;

container.onmousemove = func;

function throttle(func, wait) {
  let timer = null;
  function throttled(e) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func.call(this, e);
      }, wait);
    }
  }

  throttled.cancel = function(e) {
    console.log('cancel')
    clearTimeout(timer);
    timer = null;
    func.call(this, e);
  }
  return throttled
}