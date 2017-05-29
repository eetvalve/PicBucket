require('rootpath')();
var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressJwt = require('express-jwt');
var utf8 = require('utf8');
var multer = require('multer');
var fs = require('fs-extra');
var grid = require("gridfs-stream");
var mongoose = require('mongoose');
var formidable = require("formidable");
var async = require("async");
var busboyBodyParser = require('busboy-body-parser');
var uutiset = require('./routes/uutisetM');
//var picUpload = require('./routes/picUpload');
var config = require('./config.json');

var app = express();

mongoose.connect(config.connectionString);
var conn = mongoose.connection;

// view engine setup TAMA VAIHTUU SERVERIN VIEWSIIN LOGINIIN
app.set('views', path.join(__dirname, '../', 'app'));
app.set('view engine', 'ejs');


//takes image-chunks from db and parse em.
app.use(busboyBodyParser());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../', 'app')));



var storage = multer.diskStorage({//multers disk storage settings
    destination: function (req, file, cb) {

        var pathh = './tmpImages/';
        fs.mkdirsSync(pathh);
        cb(null, pathh);
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});
var upload = multer({//multer settings
    storage: storage
}).single('file');
/** API path that will upload the files */

grid.mongo = mongoose.mongo;
var gfs = grid(conn.db);


app.post('/api/upload', function (req, res) {

    var part = req.files.file;

    var writeStream = gfs.createWriteStream({
        filename: part.name,
        metadata: {"objectId": part.name},
        mode: 'w',
        content_type: part.mimetype
    });

    writeStream.on('close', function () {
        return res.status(200).send({
            message: 'Success'
        });
    });

    writeStream.write(part.name);

    writeStream.end();

});
app.get('/picturelist/', function(req, res) {
    gfs.files.find({}).toArray(function (err, files) {
        if (err) {
            res.json(err);
        }
        if (files.length > 0) {
            var array = [];
            for (var i = 0; i < files.length; i++) {
                array.push('pictures/' + files[i]._id);
            }
            res.send(array);
        } else {
            res.json('No files found');
        }
    });
});
app.get('/pictures/:id', function(req, res) {
    var picture_id = mongoose.Types.ObjectId(req.params.id.toString());
    gfs.files.find({_id: picture_id}).toArray(function (err, files) {
        if (err) {
            res.json(err);
        }
        if (files.length > 0) {
            res.writeHead(200, {'Content-Type': files[0].contentType});
            var read_stream = gfs.createReadStream({_id: picture_id});
            read_stream.pipe(res);
        } else {
            res.json('File Not Found');
        }
    });
});

/*
 app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));
 
 // use JWT auth to secure the api
 app.use('./controllers/api', expressJwt({ secret: config.secret }).unless({ path: ['./controllers/api/users/authenticate', './controllers/api/users/register'] }));
 
 // routes
 app.use('/login', require('./controllers/login.controller'));
 app.use('/register', require('./controllers/register.controller'));
 app.use('/app', require('./controllers/app.controller'));
 app.use('/api/users', require('./controllers/api/users.controller'));
 
 // make '/app' default route
 app.get('/', function (req, res) {
 return res.redirect('/app');
 });
 */

app.use('/', uutiset);
//app.use('/', picUpload);

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
