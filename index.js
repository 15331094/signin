var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.set('port', (process.env.PORT || 8000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
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

    fs.readFile("data.txt", function(err, buffer) {
      if (err) throw err;

      var str = buffer.toString("utf-8");
      if(str.indexOf(response.name) != -1 && 
        str[str.indexOf(response.name) - 1] == '"' && 
        str[str.indexOf(response.name) + response.name.length] == '"') {

        res.end("名字已存在!");
        console.log("名字已存在!");
      }
      else {
        fs.writeFile('data.txt', JSON.stringify(response) + "\r\n", { flag: 'a'}, (err) => {
          if (err) throw err;
          console.log("保存成功!");
        });        
        res.end("注册成功!");
        console.log("注册成功!");
      }
    }); 
  }
  //详情
  else if(response.name != "" && response.ID == "" && 
    response.phone == "" && response.email == "" && response.password == undefined) {

    fs.readFile("data.txt", function(err, buffer) {
      if (err) throw err;
      console.log("详情");

      var str = buffer.toString("utf-8");
      var start = 0, flag = false;
      for(var i = 0; i < str.length; i++) {
        if(str[i] == "\n") {
          if(str.substring(start, i).indexOf(response.name) != -1 && 
            str.substring(start, i)[str.substring(start, i).indexOf(response.name) - 1] == '"' && 
            str.substring(start, i)[str.substring(start, i).indexOf(response.name) + response.name.length] == '"') {
            
            res.end(str.substring(start, i - 1));
            console.log("查找详情成功!");
            flag = true;
            break;
          }
          start = i + 1;
        }
      }
      if(flag == false) {
        res.end("We did not have this register");
        console.log("查找详情失败!");
      }
    });    
  }
  //登陆
  else if(response.name != "" && response.ID == "" && 
    response.phone == "" && response.email == "" && response.password != "") {
    console.log("登陆");

    fs.readFile("data.txt", function(err, buffer) {
      if (err) throw err;
      
      var str = buffer.toString("utf-8");
      if(str.indexOf(response.name) == -1 || 
        (str.indexOf(response.name) != -1 && 
        (str[str.indexOf(response.name) - 1] != '"' || str[str.indexOf(response.name) + response.name.length] != '"'))) {
        
        res.end("账号不存在!");
      }
      else {
        var start = 0;
        for(var i = 0; i < str.length; i++) {
          if(str[i] == "\n") {
            if(str.substring(start, i).match(response.name) == response.name && 
              str.substring(start, i).match(response.password) == response.password) {

              res.end(str.substring(start, i - 1));
              console.log("登陆成功!");
              break;
            }
            else if(str.substring(start, i).match(response.name) == response.name && 
              str.substring(start, i).match(response.password) != response.password) {

              res.end("密码错误!");
              console.log("密码错误");
              break;
            }
            start = i + 1;
          }
        }        
      }
    });  
  }
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


