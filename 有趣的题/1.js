// 输入m,n获取m长度且都为n的数组，不使用循环

function middleware(m, n) {
  let index = 0;
  let arr = [];
  function next(n) {
    arr.push(n);
    if(m === ++index) return
    else next(n)
  }
  next(n)
  return arr;
}

let arr = middleware(10, 5);
console.log('arr', arr);