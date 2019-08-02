const fs = require('fs');

function render (template, obj) {
  let _str = "";
  _str+= 'let str; with(object) { \r\n str=';
  template = template.replace(/<%=([\s\S]+?)%>/g, (...args) => {
    return '${'+ args[1] + '}'
  })
  _str += '`'+template.replace(/<%([\s\S]+?)%>/g, (...args) => {
    return '`\r\n'+ args[1] + '\r\n str+=`'
  })
  _str += '` } \r\n return str '

  const f = new Function('object', _str);
  template =  f(obj);
  return template
}

exports.render = render;