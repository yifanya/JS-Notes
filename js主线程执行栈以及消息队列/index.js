let a = () => {
  setTimeout(() => {
    console.log("任务队列函数1");
  }, 0);
  for (let i = 0; i < 3; i++) {
    console.log("a的for循环");
  }
  console.log("a事件执行完");
};

let b = () => {
  setTimeout(() => {
    console.log("任务队列函数2");
  }, 0);
  for (let i = 0; i < 3; i++) {
    console.log("b的for循环");
  }
  console.log("b事件执行完");
};
let c = () => {
  setTimeout(() => {
    console.log("任务队列函数3");
  }, 0);
  for (let i = 0; i < 3; i++) {
    console.log("c的for循环");
  }
  console.log("c事件执行完");
};
a();
b();
c();
// 异步任务列表会等主线程所有任务执行完成之后，才执行、
// 异步任务队列又分为  宏队列和微队列。
// 类似 promise 的then是微队列。 settimeout / setinterval 属于宏队列。
// 在队列内部，微队列执行顺序先于宏队列。
