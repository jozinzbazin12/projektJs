var express = require('express');
var app = express(); // create our app w/ express
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var fs = require("fs");

var data = JSON.parse(fs.readFileSync("data2.json"));  

var port = +process.argv[2];
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(bodyParser.json());

app.use(bodyParser.json({
	type : 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(morgan('dev'));

app.listen(port, function() {
	console.log('Serwer na porcie ' + port);
});

app.engine('html', require('ejs').renderFile); 
//app.use(app.router);
app.set('view engine', 'ejs');

app.use(express.static(__dirname));

var klasy = data.data;

/*app.get('/', function (req, res) {
	res.sendFile("index.html", { root: __dirname });
});*/

app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/index.html', function (req, res) {
    res.render('index.html');
});

app.get('/klasy', function(request, response) {
	console.log('GET Lista klas');
//	var wynik = {};
//	wynik.data=[];
//	for (var i = 0; i < klasy.length; i++) {
//		wynik.data.push({
//			id : klasy[i].id,
//			klasa : klasy[i].klasa,
//			literka : klasy[i].literka,
//			profil : klasy[i].profil,
//			uczniowie : klasy[i].uczniowie
//		});
//	}
//	wynik.autoIncrementKlasy=3;
//	wynik.autoIncrementLudzie=7;
	response.json(data);
});