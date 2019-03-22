const url = require('url');
const http = require('http');

class Application {
  constructor() {
    this.routes = []
    http.METHODS.forEach(method => {
      Application.prototype[method.toLocaleLowerCase()] = (url, handler) => {
        this.routes.push({
          path: url,
          handler,
          method: method.toLocaleLowerCase()
        })
      }
    })
  }
  use(url, handler) {
    if(typeof url === 'function') {
      handler = url;
      url = '/'
    }
    this.routes.push({
      path: url,
      method: 'middleware',
      handler
    })
  }
  all(url, handler) {
    this.routes.push({
      path: url,
      method: 'all',
      handler
    })
  }
  listen(...args) {
    const server = http.createServer((req, res) => {
      let index = 0;
      let m = req.method.toLocaleLowerCase();
      let { pathname } = url.parse(req.url, true);
      const { routes } = this;
      function next() {
        if (index === routes.length) return res.end(`cannot ${req.method} ${req.url}`);
        let { path, handler, method } = routes[index++];
        if(method === 'middleware') {
          if (path === "/" || path === pathname || pathname.startsWith(path + '/')) {
            handler(req, res, next)
          }
          else next()
        }
        else {
          if ((path === pathname || path === '*') && (m === method || method === 'all')) {
            handler(req, res);
          }
          else {
            next();
          }
        }
      }
      next();
    });
    server.listen(...args);
  }
}


module.exports = function () {
  return new Application()
}