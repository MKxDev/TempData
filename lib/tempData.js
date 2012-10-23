exports = module.exports = function(req, res, next) {
	if (!req.session) {
		throw new Error('session is required.');
	}
	
	var sessionTempData = req.session.__sessionTempData || (req.session.__sessionTempData = {});

	// Create wrapper object to add and delete session data
	var tempData = {
		set: function(name, value) {
			sessionTempData[name] = value;
		},
		get: function(name) {
			if (sessionTempData[name] === undefined) return null;

			var val = null;

			try {
				val = sessionTempData[name];
				delete sessionTempData[name];
			}
			catch (err) {
				console.low('Error while parsing "' , name , '": ', err.message);
			}
			
			return val;
		}
	};

	req.tempData = tempData;

	next();
};