var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
 
var app = express();
// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname,'public')));
var bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({
    extended: true
}));
 app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/online');
 
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
 
 
 
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});