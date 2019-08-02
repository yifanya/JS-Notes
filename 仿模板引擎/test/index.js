const ejs = require('../lib/index');
const fs = require('fs');
const http = require('http')

const template = fs.readFileSync('./index.html', 'utf8');

const html = ejs.render(template, {
  title: '我是标题',
  arr: [ '苹果', '葡萄', '橘子' ]
})

http.createServer(function (req, res) {
  res.end(html);
}).listen(3000)