const application = require('./application');
const mixin = require('merge-descriptors');

function createApplication () {
  let app = function (req, res, next) {
    app.handle(req, res, next);
  };
  mixin(app, application, false);
  app.init();
  return app;
}

module.exports = createApplication;