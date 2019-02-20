let promise = new Promise((resolve, reject) => {
  resolve('111');
}).then((data) => {
  console.log('1:data = ', data);
  return '1 then result'
}).then(data => {
  console.log('2:data = ', data)
})
