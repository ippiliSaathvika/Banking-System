var express = require('express'),
	app = express(),
	path = __dirname + '/views/',
	bodyParser = require('body-parser'),
	router = express.Router(),
	cookieSession = require('cookie-session'),
	mongoose = require('mongoose');
app.use(
	cookieSession({
		name: 'session',
		keys: ['ahms'],
		// Cookie Options
		maxAge: 24 * 60 * 60 * 1000 // 24 hours
	})
);
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.set('port', process.env.PORT || 8000);
app.use(express.static(__dirname + '/public'));
app.set('views', path);
app.set('view engine', 'ejs');
app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});


mongoose.connect('mongodb://saathvika:l@ughy123@ds039261.mlab.com:39261/online_banking');//database name online_banking
 
var Schema = new mongoose.Schema({
	_id    : String,
	name: String,
	age   : Number
});
 
var user = mongoose.model('emp', Schema);
 
app.post('/new', function(req, res){
	new user({
		_id    : req.body.email,
		name: req.body.name,
		age   : req.body.age				
	}).save(function(err, doc){
		if(err) res.json(err);
		else    res.send('Successfully inserted!');
	});
});