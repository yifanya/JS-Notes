const http = require('http');
const url = require('url');


let routes = [
  {
    path: '*',
    method: '*',
    handler: function(req, res) {
      res.end(`can ${req.method} ${req.url}`)
    }
  }
]

function Application() {
  registMethods(http.METHODS, Application.prototype);
}

// Application.prototype.get = function (path, middleware, handler) {
//   if(middleware && typeof middleware === 'function') {
//     if(!handler) {
//       let temp = handler;
//       handler = middleware;
//       middleware = temp;
//     }
//   }
//   routes.push({
//     path,
//     method: 'get',
//     handler,
//     middleware
//   })
// }

function registMethods(methods, target) {
  methods.forEach(method => {
    target[method.toLocaleLowerCase()] = function (path, middleware, handler) {
      if (middleware && typeof middleware === 'function') {
        if (!handler) {
          let temp = handler;
          handler = middleware;
          middleware = temp;
        }
      }
      routes.push({
        path,
        method: method.toLocaleLowerCase(),
        handler,
        middleware
      })
    }
  });

  target.all = function (path, middleware, handler) {
    if (middleware && typeof middleware === 'function') {
      if (!handler) {
        let temp = handler;
        handler = middleware;
        middleware = temp;
      }
    }
    routes.push({
      path,
      method: 'all',
      handler,
      middleware
    })
  }
}

Application.prototype.use = function (path, handler) {
  if(!handler || typeof path === 'function') {
    handler = path;
    path = '/';
  }
  routes.push({
    method: 'middle',
    path,
    handler
  })
}

Application.prototype.listen = function (...args) {
  const server = http.createServer((req, res) => {
    let index = 0;
    let m = req.method.toLocaleLowerCase();
    let { pathname } = url.parse(req.url, true);

    function next(err) {
      if (index === routes.length) {
        console.log(`cannot ${req.method} ${req.url}`);
        return res.end(`cannot ${req.method} ${req.url}`)
      }
      let { path, handler, method } = routes[index++];
      if( method === 'middle') {
        if (path === '/' || path === pathname || pathname.startsWith(path + '/')) {
          handler(req, res, next)
        } else {
          next();
        }
      }
      else {
        if ((path === pathname || path === '*') && (m === method || method === 'all')) {
          handler(req, res);
        }
        else {
          // console.log(`cannot ${req.method} ${req.url}`)
          // res.end(`cannot ${req.method} ${req.url}`)
          next();
        }
      }
    }
    next();
  })

  server.listen(...args)
}

module.exports = Application;