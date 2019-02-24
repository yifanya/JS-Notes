let { SyncHook } = require('tapable');

class Lesson {
  constructor () {
    this.hooks = {
      arch: new SyncHook(['name'])
    }
  }
  
}