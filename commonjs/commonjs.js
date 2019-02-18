const path = require('path');
const fs = require('fs');

function req(filepath) {
  let funcBody = fs.readFileSync(path.join(__dirname, filepath), 'utf8');
  let module = {
    exports: {

    }
  }
  let exports = module.exports;
  let func = new Function('require', 'module', 'exports', '__dirname', '__filename', `
    ${funcBody}
    return module.exports;
  `);
  return func(req, module, exports, __dirname, __filename);
}

let a = req('./a.js');
let b = req('./b.js');

console.log('a', a);
console.log('b', b);