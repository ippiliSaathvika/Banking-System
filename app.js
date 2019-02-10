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
});

app.get('/Login', (req, res) => {
    res.render('login');
});
app.get('/CreateAccount', (req, res) => {
	res.render('create account');
});

app.post('/onSignUp', (req, res) => {
	let userData = 
		{
			accnum: req.body.accnum,
			username: req.body.username,
			security: req.body.security,
			pass: req.body.pass
		};
	mongodb.MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
		if (err) throw err;
		let db = client.db('online_banking');
		let users = db.collection('signup');
		users.insertOne(userData, function (err, result) {
			if (err) throw err;
			res.redirect('/');//going to the / directory i,e home page
		});
	});
});
app.post('/oncreateacc', (req, res) => {
	let userData = 
		{
			title: req.body.title,
			names: req.body.names,
			date: req.body.date,
			gender: req.body.gender,
			tel: req.body.tel,
			aadhaar: req.body.aadhaar,
			address: req.body.address,
			city: req.body.city,
			state: req.body.state,
			pin: req.body.pin
		};
	mongodb.MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
		if (err) throw err;
		let db = client.db('online_banking');
		let users = db.collection('acc_creation');
		users.insertOne(userData, function (err, result) {
			if (err) throw err;
			
			res.redirect('/');//going to the / directory i,e home page
			res.send("Congratulations!!!Your Account is Created!!\n Your Account Number is :"+result._id+"\n          DONOT LOSE IT");
		});
	});
});