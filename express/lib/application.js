const http = require('http');
const url = require('url');
const Router = require('./router');

const app = {};

app.listen = function () {
  let server = http.createServer(this);
  return server.listen.apply(server, arguments);
}

app.init = function () {
  this._router = new Router();
}

app.handle = function (req, res, callback) {
  this._router.handle(req, res, callback);
}

module.exports = app;