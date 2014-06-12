var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	// render goes out to the views folder and tries to render based on a jade file
  res.render('index', { title: 'Express' });
});


/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

	// Set our internal DB variable
	var db = req.db;

	// Get our form values. These rely on the "name" attributes
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	//Set our collection
	var collection = db.get('usercollection');

	//Submit to the DB
	collection.insert({
		"username" : userName,
		"email" : userEmail
	}, function (err, doc) {
		if (err) {
			// If it failed, return error
			res.send("Problem adding info to database!");
		}
		else {
			// If it worked, set the header so the address bar doesn't still say /adduser
			res.location("userlist");
			// And forward to the success page
			res.redirect("userlist");
		}
	});
});

module.exports = router;
