var path = require('path');
var app = require(global.__commonModule).app;

app.get('/resource/*', function(req, res, next) {
  // Need to be change
  var resourcePath = path.join(__dirname, '/../../resource/', req.params[0]);
  res.sendfile(resourcePath);
});
