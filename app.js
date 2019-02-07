const express = require('express'),
	bodyParser = require('body-parser'),
	cookieSession = require('cookie-session'),
	path = __dirname + '/views/',
	mongodb = require('mongodb'),
	uri = 'mongodb://saathvika:saathvika13@ds039261.mlab.com:39261/online_banking',
	app = express();
app.use(
	cookieSession({
		name: 'session',
		keys: ['banking'],
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
app.listen(app.get('port'), function () {
	console.log('Node app is running on port', app.get('port'));
});

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/SignUp', (req, res) => {
	res.render('signup');
})

app.post('/onSignUp', (req, res) => {
	console.log(req.body.email);
	let userData = 
		{
			email: req.body.email,
			name: req.body.name,
			age: req.body.age
		};
	mongodb.MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
		if (err) throw err;
		let db = client.db('online_banking');
		let users = db.collection('users');
		users.insertOne(userData, function (err, result) {
			if (err) throw err;
			res.redirect('/');
		});
	});
})

// mongoose.connect('mongodb://saathvika:l@ughy123@ds039261.mlab.com:39261/online_banking');//database name online_banking

// var Schema = new mongoose.Schema({
// 	_id: String,
// 	name: String,
// 	age: Number
// });

// var user = mongoose.model('emp', Schema);

// app.post('/new', function (req, res) {
// 	new user({
// 		_id: req.body.email,
// 		name: req.body.name,
// 		age: req.body.age
// 	}).save(function (err, doc) {
// 		if (err) res.json(err);
// 		else res.send('Successfully inserted!');
// 	});
// });