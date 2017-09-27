const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/imagesearch');
var db = mongoose.connection;


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

var search = require('./routes/search.js');
app.use('/api', search);

//DB:
db.once('error', function(err){
	if (err){
		throw err;
	}
});
db.on('open', function(err){
	if(err){
		console.log(err);
	}
	console.log('Connected to DB');
})
var Search = require('./models/search.js');

//APP start
app.get('/', function (req,res){
	res.render('mainpage');

});

app.listen(process.env.PORT || 3000, function(){
	console.log('Listening on port 3000');
})