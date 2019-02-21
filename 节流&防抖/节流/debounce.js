function debounce(func, wait) {
  let timer = null;
  return function (event) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, [event]);
    }, wait);
  }
}

let index = 0;
let container = document.getElementById('container');
container.onmousemove = debounce(function (e) {
  console.log('this', this);
  container.innerHTML = index++;
  console.log('event', e);
}, 1000)