// class AsyncParallelHook {
//   constructor() {
//     this.data = {}
//     this.stacks = [];
//   }
//   tapAsync(name, cb) {
//     let promise = new Promise((resolve,reject)=> {
//       cb(this.data, resolve)
//     })
//     this.stacks.push(promise);
//   }

//   callAsync(data, cb) {
//     this.data.name = data;
//     Promise.all([...this.stacks])
//       .then(res=> {
//         cb();
//       })
//   }
// }


class AsyncParallelHook {
  constructor() {
    this.stacks = [];
  }
  tapAsync(name, cb) {
    this.stacks.push(cb);
  }
  callAsync(data, cb) {
    let index = 0;
    let done = () => {
      index++;
      if(index === this.stacks.length)
        cb();
    }
    // console.log('data', data);
    this.stacks.forEach(stack => {
      stack(data, done)
    })
  }
}

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncParallelHook(['name'])
    }
  }

  tap() {
    this.hooks.arch.tapAsync('node', (data, cb) => {
      setTimeout(() => {
        console.log('node', data.name)
        cb()
      }, 4000);
    })
    this.hooks.arch.tapAsync('react', (data, cb) => {
      setTimeout(() => {
        console.log('react', data.name)
        cb()
      }, 2000);
    })
  }
  start() {
    this.hooks.arch.callAsync('jw', () => {
      //此回调需要上面两个tapAsync执行完
      console.log('end')
    })
  }
}
let lesson = new Lesson();
lesson.tap();
lesson.start();