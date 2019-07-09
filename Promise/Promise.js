let globelIndex = 0;
class MyPromise {
  constructor(handle) {
    this._uid = globelIndex++;
    if(typeof handle !== 'function') throw new Error('callback must be function')
    this._state = 'PENDING'
    this._value = null
    this.successQueues = []
    this.errorQueues = []
    handle(this._resolve.bind(this), this._reject.bind(this));
  }
  _resolve(data) {
    // console.log('_uid', this._uid);
    this._state = 'SUCCESS'
    this._value = data;
    let cb
    while (cb = this.successQueues.shift()) {
      cb(data)
    }
  }
  _reject(error) {
    this._state = 'ERROR'
    this._value = error
    let cb
    while (cb = this.errorQueues.shift()) {
      cb(error)
    }
  }
  then(successed, errored) {
    let { _state, _value, successQueues, errorQueues} = this;
    return new MyPromise((resolve, reject) => {
      let success = (_value) => {
        if(typeof successed !== 'function') resolve(successed)
        else {
          let successedResult = successed(_value);
          if(successedResult instanceof MyPromise) {
            successedResult.then(resolve, reject);
          }
          else {
            resolve(successedResult)
          }
        }
      }
      let error = (_value) => {
        if (typeof errored !== 'function') resolve(errored)
        else {
          let erroredResult = errored(_value);
          if (erroredResult instanceof MyPromise) {
            erroredResult.then(resolve, reject);
          } else {
            resolve(erroredResult)
          }
        }
      }

      switch (_state) {
        case "PENDING":
          successQueues.push(success);
          errorQueues.push(error);
          break;
        case "SUCCESS":
          success(_value)
          break;
        case "ERROR":
          error(_value)
          break;
      }
    })
  }
}


module.exports = MyPromise;