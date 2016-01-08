var express = require('express'),
  	routes = require('./routes'),
  	http = require('http'),
  	path = require('path'),
  	partials = require('express-partials');

var app = express();

app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(partials());

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/jcrop', routes.doJcrop);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Server running at http://localhost:"+app.get('port'));
});
