var express = require('express');
var app = require('express')();
var http = require('http')
var http = require('http').Server(app);
var session = require('express-session');
var bodyParser = require('body-parser');
var cookie = require('cookie-parser');

var routers = require('./routers');

app.set('view engine', 'ejs');  
app.use('/static', express.static('static'));

app.set('port', process.env.PORT || 8080);// 設定環境port
app.use(bodyParser.json());  //解析post內容
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookie());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'recommand 128 bytes random string', //建議使用128個字符的隨機字符串
    cookie: { maxAge: 60 * 1000 }
}));
routers.setRequestUrl(app); //設定路徑

http.listen(app.get('port'), '0.0.0.0', function () {
    
    console.log("The server started in " + '127.0.0.1:' + app.get('port'));
    console.log('---------------------------------------');
});


