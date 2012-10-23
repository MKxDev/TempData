TempDataJS
==========
Simple ASP.NET MVC-like TempData provider for Node.js applications. Values added to tempData live until they are retrived or the end of a session, whichever comes first.


## Example
Using tempData could not be easier. Once all setup is done, start adding values using `req.tempData.set(name, value)` and retrieving them using `req.tempData.get(name)`.
``` js
	var tempData = require('tempdata');
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
		// Retrieve tempData value here. It won't exist unless the request
	  	// was redirected
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
`npm install tempdata`


## Usage
In order to function properly, tempdata relies on cookie parsing and session support that comes with Expressjs. Make sure the `express.cookieParser()` and `express.session({...})` are included in your configure section:
``` js
	// This has to appear BEFORE the router
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'your_super_secret_session_key' })); // please change this!
	app.use(tempData);
```

Once everything is set, you're read to add and retrieve data.

### Setting Values
`req.tempData.set(name, value)` - sets the value to be retrieved later.


### Getting Values
`req.tempData.get(name)` - returns the value that was previously set. If the value was not set, it returns `null`. Once the value is retrieved, it is removed from temp data.