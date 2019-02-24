function debounce(func, wait, immediate) {
  let timer = null;
  return function (event) {
    clearTimeout(timer);
    if(immediate) {
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if(callNow) func.apply(this, [event]);
    }
    else {
      timer = setTimeout(() => {
        func.apply(this, [event]);
      }, wait);
    }
  }
}

let index = 0;
let container = document.getElementById('container');
container.onmousemove = debounce(function (e) {
  console.log('this', this);
  container.innerHTML = index++;
  console.log('event', e);
}, 1000, true)
// arguments[0] 回调函数，你要执行的函数
// arguments[1] 节流参数
// arguments[2] 是否立即执行