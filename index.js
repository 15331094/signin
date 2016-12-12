var express = require('express');
var app = express();
var uri = 'mongodb://abc:123@ds129038.mlab.com:29038/gzm1997';
var fs = require('fs');
var cookie = require('cookie-parser');
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('port', (process.env.PORT || 8000));

app.use(express.static(__dirname + '/public'));
app.use(cookie());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  console.log(request.query.username);
   console.log(request.cookies.log);
  if(request.query.username != undefined && request.cookies.log == "true") {
    response.render('pages/index');
  }
  else {
    console.log("请求无效！")
    response.send("这里不是主页面，请在浏览器上方地址栏输入https://signin1997.herokuapp.com/regist或者https://signin1997.herokuapp.com/signin");
  }
});

app.get('/regist', function (request, response) {
  //把cookie的log变量变为赋值为字符串"false"，表明不能打开详情的页面
    response.cookie("log", "false");
    response.render('pages/index');
})

app.get('/signin', function (request, response) {
  response.cookie("log", "false");
  response.render('pages2/index');
});

app.post('/process_post', urlencodedParser, function (req, res) {

  response = {
    name: req.body.name,
    ID: req.body.ID,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password
  };

  //注册
  if(response.name != "" && response.ID != "" && 
    response.phone != "" && response.email != "" && response.password != "") {

    console.log("注册");
    //注册前先打开数据库看看有没有被注册

    var mongodb = require('mongodb');
    mongodb.MongoClient.connect(uri, function(err, db) {
      if(err) throw err;
      else console.log("成功连接");

      db.collection('users',{safe:true},function(err,collection){
        if(err){
          console.log(err);
        }  
        else {
          console.log("已存在，现在存数据进去  ");
          collection.findOne({name: response.name}, function(err,doc){
            console.log('findOne');
            if(doc == null) {
              console.log("没有这个用户");
              collection.insert(response, {safe: true}, function(err, result){
                res.cookie("log", "true");
                console.log("保存成功");
                res.end("注册成功!");
              });
            }
            else {
              console.log("此名字已经被使用");
              res.end("名字已存在!");
            }
          });
        } 
      }); 
    });

  }

  //详情
  else if(response.name != "" && response.ID == "" && 
    response.phone == "" && response.email == "" && response.password == undefined) {


    var mongodb = require('mongodb');
    mongodb.MongoClient.connect(uri, function(err, db) {
      if(err) throw err;
      else console.log("成功连接");

      db.collection('users',{safe:true},function(err,collection){
        if(err){
          console.log(err);
        }  
        else {
          console.log("已存在，现在存数据进去  ");
          collection.findOne({name: response.name}, function(err,doc){
            console.log('findOne');
            if(doc == null) {
              res.end("We did not have this register");
              console.log("没有这个用户，查找详情失败!");
            }
            else {
              console.log(doc);
              console.log(JSON.stringify(doc));
              res.end(JSON.stringify(doc));
              console.log("查找详情成功!");
            }
          });
        } 
      }); 
    });
  }

  //登陆
  else if(response.name != "" && response.ID == "" && 
    response.phone == "" && response.email == "" && response.password != "") {
    console.log("登陆");



    var mongodb = require('mongodb');
    mongodb.MongoClient.connect(uri, function(err, db) {
      if(err) throw err;
      else console.log("成功连接");
        
      db.collection('users',{safe:true},function(err,collection){
        if(err){
          console.log(err);
        }  
        else {
          console.log("已存在，现在存数据进去  ");
          collection.findOne({name: response.name}, function(err,doc){
            console.log('findOne');
            if(doc == null) {
              res.end("账号不存在!");
              console.log("账号不存在，登录失败");
            }
            else {
              if(response.password == doc.password) {
                //console.log(doc.password);
                res.cookie("log", "true");
                res.end(JSON.stringify(doc));
                console.log("登陆成功!");
              }
              else if(response.password != doc.password) {
                res.end("密码错误!");
                console.log("密码错误");   
              }
 
            }
          });
        } 
      }); 
    })
  }
})


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


