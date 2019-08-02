/**
 * 1. promise 简单的实现
 * 2. promise then方法内，不管你是成功的回调还是失败的回调，只要返回的是正常值，那么都会在下一个then的成功回调
 * 3. promise then方法内，你只要抛出错误那么就会在下一个then的失败回调
 * 4. promise then方法内，如果返回值是一个promise对象，则采用他的状态
 */
class Promise {
  constructor (executor) {
    this.value;
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
        !function (cb) {
          setTimeout(() => cb(value) , 0)
        }(cb)
      }
    }
  }
  _reject (reason) {
    if (this.state === 'PENDING') {
      this.value = reason;
      this.state = 'rejected';
      let cb
      while (cb = this.errorQueue.shift()) {
        !function (cb) {
          setTimeout(() => cb(reason) , 0)
        }(cb)
      }
    }
  }

  then (success, error) {
    let { state, value, successQueue, errorQueue } = this;
    return new Promise(function (resolve, reject) {
      let fulfilled = (val) => {
        try {
          if (typeof success !== 'function') resolve(val);
          else {
            let result = success(val);
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
      let rejected = (err) => {
        try {
          if (typeof error !== 'function') resolve(err);
          else {
            let result = error(err);
            if (result instanceof Promise) {
              result.then(resolve)
            }
            else {
              resolve(result)
            }
          }
        } catch (error) {
          reject(error);
        }
      }
      // console.log(state);
      switch (state) {
        case 'fulfilled': 
          setTimeout(() => fulfilled(value), 0); break;
        case 'rejected': 
          setTimeout(() => rejected(value), 0); break;
        case 'PENDING': 
          successQueue.push(fulfilled);
          errorQueue.push(rejected);
          break;
      }
    })
  }
}
