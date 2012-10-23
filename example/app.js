
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , tempData = require('../lib/tempData.js');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your_super_secret_session_key' })); // please change this!
  app.use(tempData);

  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  // Retrieve tempData value here. It won't exist on any 'GET' request, 
  // only on 'POST'
	var tempVal = JSON.stringify(req.tempData.get('test_val'));

	res.render('index', { title: 'Express', temp: tempVal });
});

app.post('/', function(req, res) {
  // Set tempData value here
	req.tempData.set('test_val', { x: 'Hello World!' });
	
	res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
