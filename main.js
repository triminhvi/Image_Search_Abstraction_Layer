var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var search = require('./routes/search.js');
app.use('/search', search);

app.get('/', function (req,res){
	res.render('mainpage');

});

app.get('/history', function (req,res){
	res.send('This is history page');
});

app.listen(process.env.PORT || 3000, function(){
	console.log('Listening on port 3000');
})