// class Promise {
//   constructor (executor) {
//     this.value = null;
//     this.state = 'PENDING';
//     this._resolve = this._resolve.bind(this);
//     this._reject = this._reject.bind(this);
//     this.successQueue = [];
//     this.errorQueue = [];
//     try {
//       executor.call(this, this._resolve, this._reject);
//     } catch (e) {
//       this._reject(e);
//     }
//   }
//   _resolve (value) {
//     if (this.state === 'PENDING') {
//       this.value = value;
//       this.state = 'fulfilled';
//       let cb
//       while (cb = this.successQueue.shift()) {
//         cb(this.value)
//       }
//     }
//   }
//   _reject (value) {
//     if (this.state === 'PENDING') {
//       this.value = value;
//       this.state = 'rejected';
//       let cb
//       while (cb = this.errorQueue.shift()) {
//         cb(this.value)
//       }
//     }
//   }

//   then (success, error) {
//     // console.log('then')
//     let { state, successQueue, errorQueue } = this;
//     return new Promise(function (resolve, reject) {
//       let fulfilled = (_value) => {
//         try {
//           if (typeof success !== 'function') resolve(_value);
//           else {
//             let result = success(_value);
//             if (result instanceof Promise) {
//               result.then(resolve)
//             }
//             else {
//               resolve(result)
//             }
//           }
//         } catch (error) {
//           reject(error);
//         }
//       }
//       let rejected = (_value) => {
//         try {
//           if (typeof error !== 'function') resolve(_value);
//           else {
//             let result = error(_value);
//             if (result instanceof Promise) {
//               result.then(resolve)
//             }
//             else {
//               resolve(result)
//             }
//           }
//         } catch (error) {
//           reject(error);
//         }
//       }
      
//       switch (state) {
//         case 'fulfilled': fulfilled(); break;
//         case 'rejected': rejected(); break;
//         case 'PENDING': 
//           successQueue.push(fulfilled);
//           errorQueue.push(rejected);
//           break;
//       }
//     })
//   }
// }
// const Promise = require('./Promise');

new Promise((reslove, reject) => {
  setTimeout(() => {
    console.log('first')
    reject(1235);
  },1000)
}).then((data) => {
  return 'aaa'
},(err) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(err+'111');
    }, 3000)
  })
}).then(data => {
  console.log(data, '---')
}).then(data => {
  console.log(data, '++++')
})