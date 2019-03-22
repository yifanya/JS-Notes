let promise = new Promise((resolve, reject) => {
  resolve('111');
}).then((data) => {
  console.log('1:data = ', data);
  return '1 then result'
}).then(data => {
  console.log('2:data = ', data)
})

class MyPromise {
  constructor(handler) {
    this.status = "PENDING"
    this.value = null
    this.successQueue = []
    this.errorQueue = []
    handler(this._resolve.bind(this), yhis._reject.bind(this))
  }
  _resolve(value) {
    this.status = "SUCCESS"
    this.value = value;
    let cb = null;
    while (cb = this.successQueue.pop()) {
      cb(value)
    }
  }
  _reject(error) {
    this.status = "ERROR"
    this.value = error
    let cb = null;
    while (cb = this.errorQueue.pop()) {
      cb(error)
    }
  }
  then(resolveFunc, rejectFunc) {
    return new MyPromise((resolve, reject) => {
      let success = (value) => {
        if(typeof resolveFunc !== 'function') {
          resolve(resolveFunc)
        }
        else {
          let runResult = resolveFunc(value);
          if(runResult instanceof MyPromise) {
            runResult.then(resolve, reject)
          }
        }
      }
      let error = (value) => {

      }

      switch (this.status) {
        case "PENDING":
          this.successQueue.push(success());
          this.errorQueue.push(error())
          break;
        case "SUCCESS":

          break;
        case "ERROR":

          break;
      }
    }
    })
}


let promise = new MyPromise((resolve, reject) => {
  resolve('111');
}).then((data) => {
  console.log('1:data = ', data);
  return new MyPromise(resolve => {
    setTimeout(() => {
      resolve('1 then result')
    }, 1000);
  })
}).then(data => {
  console.log('2:data = ', data)
  return new MyPromise(resolve => {
    setTimeout(() => {
      resolve('2 then result')
    }, 1000);
  })
}).then(data => {
  console.log('3:data = ', data)
})
