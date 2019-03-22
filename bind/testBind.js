let obj = {
  name: 'yifan'
}

function foo () {
  console.log(this.name)
}

let res = foo.bind(obj)
let resObj = new res()

console.log(resObj.name)