
var express = require('express');
var app = express();
var path = require('path');
var server = require('../public/assets/app.server');

app.use(express.static(path.join(__dirname, '..', 'public')));


app.get("*", function(req,res,next) {
  server(req, res);
});

app.listen(3000, function(){
  console.log("express app listening on port 3000");
})