// 简单的运行
class SyncHook {
  constructor (arr) {
    this.arr = arr;
    this.stacks = [];
  }
  tap (name, cb) {
    this.stacks.push(cb);
  }
  call (...args) {
    this.stacks.forEach(stask => stacks(...args))
  }
}

// 上一个返回不为undefined则停止
class SyncBailHook {
  constructor(arr) {
    this.arr = arr;
    this.stacks = [];
  }
  tap(name, cb) {
    this.stacks.push(cb);
  }
  call(...args) {
    let index = 0;
    let res = undefined;
    do {
      res = this.stacks[index++](args);
    } while (res===undefined && index<this.stacks.length);
  }
}

// 上一个的返回值是下一个的参数,瀑布流
class SyncWaterfallHook {
  constructor(arr) {
    this.arr = arr;
    this.stacks = [];
  }
  tap(name, cb) {
    this.stacks.push(cb);
  }
  call(...args) {
    this.stacks.reduce((prev, cur) => {
      return cur(prev);
    }, arg)
  }
}

// 循环执行某个函数，遇到某个不反悔undefined的函数执行多次
class SyncLoopHook {
  constructor(arr) {
    this.arr = arr;
    this.stacks = [];
  }

}