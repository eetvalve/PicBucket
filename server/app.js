require('rootpath')();
var express = require('express');
var path = require('path');
var config = require('./config.json');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressJwt = require('express-jwt');
var utf8 = require('utf8');
var multer = require('multer');
var fs = require('fs-extra');
var mongoose = require('mongoose');
var formidable = require("formidable");
var async = require("async");
var busboyBodyParser = require('busboy-body-parser');


var uutiset = require('./routes/uutisetM');
var picUpload = require('./routes/picUpload');
var picSearch = require('./routes/picSearch');


var app = express();


// view engine setup TAMA VAIHTUU SERVERIN VIEWSIIN LOGINIIN

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//takes image-chunks from db and parse em.
app.use(busboyBodyParser());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));
app.use(cookieParser());





app.use( express.static( "public" ) );

 // use JWT auth to secure the api
 app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));
 
 // routes
 app.use('/login', require('./controllers/login.controller'));
 app.use('/register', require('./controllers/register.controller'));
 app.use('/app', require('./controllers/app.controller'));
 app.use('/api/users', require('./controllers/api/users.controller'));
 
 // make '/app' default route
 app.get('/', function (req, res) {
 return res.redirect('/app');
 });
 
 
app.use(express.static(path.join(__dirname, '../', 'app')));

app.use('/', uutiset);
app.use('/', picUpload);
app.use('/', picSearch);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
