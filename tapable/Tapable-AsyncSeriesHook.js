class AsyncSeriesHook {
  constructor() {
    this.tasks = [];
  }
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  callAsync(data, cb) {
    let index = 0;
    let next = () => {
      if(index === this.tasks.length) return cb();
      this.tasks[index++](data, next)
    }
    next();
  }
}

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesHook(['name'])
    }
  }

  tap() {
    this.hooks.arch.tapAsync('node', (name, cb) => {
      setTimeout(() => {
        console.log('node', name)
        cb()
      }, 4000);
    })
    this.hooks.arch.tapAsync('react', (name, cb) => {
      setTimeout(() => {
        console.log('react', name)
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