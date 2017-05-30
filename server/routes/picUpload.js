var express = require('express');
var router = express.Router();

var config = require('../config.json');
var mongoose = require('mongoose');
db = mongoose.createConnection(config.connectionString);
var Uutiset = require('../models/uutisetM');
var grid = require("gridfs-stream");


mongoose.connect(config.connectionString);
var conn = mongoose.connection;

grid.mongo = mongoose.mongo;
var gfs = grid(conn.db);


router.post('/api/upload', function (req, res) {

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
router.get('/picturelist/', function(req, res) {
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
router.get('/pictures/:id', function(req, res) {
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
module.exports = router;