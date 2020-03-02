var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5033);

app.get('/',function(req,res){
  var qParams = [];
  for(var p in req.query){
    qParams.push({'name':p, 'value':req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
  res.render('mainGet',context);
});

app.post('/',function(req,res){
  var bodyParams = [];
  var urlParams = [];
  for(var p in req.body){
    bodyParams.push({'name':p, 'value':req.body[p]})
  }
  for(var p in req.query){
    urlParams.push({'name':p, 'value':req.query[p]})
  }
  var context = {};
  context.dataBody = bodyParams;
  context.dataURL = urlParams; 
  res.render('mainPost', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
