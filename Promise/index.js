/**
 * 1. promise 简单的实现
 * 2. promise then方法内，不管你是成功的回调还是失败的回调，只要返回的是正常值，那么都会在下一个then的成功回调
 * 3. promise then方法内，你只要抛出错误那么就会在下一个then的失败回调
 * 4. promise then方法内，如果返回值是一个promise对象，则采用他的状态
 */
module.exports =  class Promise {
  constructor (executor) {
    this.value = null;
    this.reason = null;
    this.state = 'PENDING';
    this._resolve = this._resolve.bind(this);
    this._reject = this._reject.bind(this);
    this.successQueue = [];
    this.errorQueue = [];
    try {
      executor.call(this, this._resolve, this._reject);
    } catch (e) {
      this._reject(e);
    }
  }
  _resolve (value) {
    if (this.state === 'PENDING') {
      this.value = value;
      this.state = 'fulfilled';
      let cb
      while (cb = this.successQueue.shift()) {
        cb()
      }
    }
  }
  _reject (reason) {
    if (this.state === 'PENDING') {
      this.reason = reason;
      this.state = 'rejected';
      let cb
      while (cb = this.errorQueue.shift()) {
        cb()
      }
    }
  }

  then (success, error) {
    // console.log('then')
    let { state, value, reason, successQueue, errorQueue } = this;
    return new Promise(function (resolve, reject) {
      let fulfilled = () => {
        try {
          if (typeof success !== 'function') resolve(value);
          else {
            let result = success(value);
            if (result instanceof Promise) {
              result.then(result)
            }
            else {
              resolve(result)
            }
          }
        } catch (error) {
          reject(error);
        }
      }
      let rejected = () => {
        try {
          if (typeof error !== 'function') resolve(value);
          else {
            let result = error(reason);
            if (result instanceof Promise) {
              result.then(resolve)
            }
            else {
              resolve(resolve)
            }
          }
        } catch (error) {
          reject(error);
        }
      }
      
      switch (state) {
        case 'fulfilled': fulfilled(); break;
        case 'rejected': rejected(); break;
        case 'PENDING': 
          successQueue.push(fulfilled);
          errorQueue.push(rejected);
          break;
      }
    })
  }
}

// new Promise((resolve, reject) => {
//   resolve(1234);
//   reject(5678);
//   throw new Error('error');
// }).then(data => {
//   console.log(data);
// }, err => {
//   console.log(err);
// }).then(data => {
//   console.log(data)
// })