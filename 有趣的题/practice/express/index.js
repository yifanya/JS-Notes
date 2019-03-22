const express = require('./Application');

const app = express();

app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'text/html;charset=utf-8')
  next();
})

app.get('/name', function (req, res) {
  res.end('懿蕃')
})

app.post('/age', function (req, res) {
  res.end('我23了')
})

app.all('*', function (req, res) {
  res.end('我是其他的')
})

app.listen(3000, function () {
  console.log('server open')
})