class MyPromise{
  constructor(fn){
    this.status = null;
    this.data = null;
    this.queue = [];
    fn(this._resolve.bind(this),this._reject.bind(this));
  }
  _resolve(val){
    this.status = true;
    this.data = val;
    this.queue.forEach(item=>item.succ(this.data))
  }
  _reject(val){
    this.status = false;
    this.data = val;
    this.queue.forEach(item => item.erro(this.data))
  }
  then(succ,erro){
    if(this.status === true){
      succ(this.data);
    }
    else if(this.status === false){
      erro(this.data);
    }
    else{
      this.queue.push({
        succ,
        erro
      })
    }
  }
}
let promise = new MyPromise((resolve, reject)=>{
  setTimeout(() => {
    resolve(3000);
  }, 3000);
})

promise.then((data)=>{
  console.log('data',data);
})