TempDataJS
==========
Simple ASP.NET MVC-like TempData provider for Node.js applications.


## Example
Using tempData could not be easier. Add values using 'req.tempData.set(name, value)' and retrieve them using 'req.tempData.get(name)'.
``` js
	var tempData = require('tempData');
	var app = express();

	app.configure(function() {
		...
		// This has to appear BEFORE the router
		app.use(express.cookieParser());
		app.use(express.session({ secret: 'your_super_secret_session_key' })); // please change this!
		app.use(tempData);
		...
	});

	...

	// Routes
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
	
	...
```

## Installation

Pending npm submission. Stay tuned.


## Usage
