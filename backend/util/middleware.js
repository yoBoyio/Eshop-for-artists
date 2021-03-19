const proxy = require('http-proxy-middleware');

exports.loginMiddleware = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "/login"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  };

  exports.signupMiddleware =function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "/signup"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  };