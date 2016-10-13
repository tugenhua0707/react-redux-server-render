
var express = require('express');
var app = express();
var path = require('path');
var server = require("../public/assets/app.server");

app.use(express.static(path.join(__dirname, '..', 'public')));

// 请求服务器的数据 假如返回如下json数据
app.get("/api/me", function(req,res,next) {
  res.json({name:'kongzhi', date: new Date() });
});

app.get("/api/items", function(req,res,next) {
  res.json([
    {id: 1, text: 'first'},
    {id: 2, text: 'second'},
    {id: 3, text: 'third'}
  ]);
});

app.get("/api/users", function(req,res,next) {
  res.json([
    {id: 1, name: 'kongzhi'},
    {id: 2, name: 'kongzhi2'},
    {id: 3, name: 'kongzhi3'}
  ]);
});

app.get("*", function(req,res,next) {
  server(req,res);
});

app.listen(3030, function(){
  console.log("app listening on port 3030");
});