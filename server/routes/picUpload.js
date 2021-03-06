var express = require('express');
var router = express.Router();

var config = require('../config.json');
var mongoose = require('mongoose');

var grid = require("gridfs-stream");


mongoose.connect(config.connectionString);
var conn = mongoose.connection;

grid.mongo = mongoose.mongo;
var gfs = grid(conn.db);


router.post('/api/upload', function (req, res) {

    var part = req.files.file;
    var owner = req.body.owner;

    var writeStream = gfs.createWriteStream({
        filename: part.name,
        metadata: {"owner": owner, "tags": []},
        mode: 'w',
        content_type: part.mimetype
    });

    writeStream.on('close', function () {
        return res.status(200).send({
            message: 'Success'
        });
    });

    writeStream.write(part.data);

    writeStream.end();

});
router.get('/picturelist/', function (req, res) {
    gfs.files.find({}).toArray(function (err, files) {
        if (err) {
            res.json(err);
        }
        if (files.length > 0) {
            var array = [];
            for (var i = 0; i < files.length; i++) {
                array.push({data: files[i]._id, meta: files[i].metadata});
            }
            res.send(array);
        } else {
            res.json(err);
        }
    });
});
router.get('/pictures/:id', function (req, res) {
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

// Get the tags of a picture
router.get('/tags/:id', function (req, res) {
    var picture_id = mongoose.Types.ObjectId(req.params.id.toString());
    gfs.files.find({_id: picture_id}).toArray(function (err, files) {
        if (err) {
            res.json(err);
        }
        if (files.length > 0) {
            res.send(files[0].metadata.tags);
        } else {
            res.json('File Not Found');
        }
    });
});

//delete pictures
router.delete('/pictures/:id', function (req, res) {
    var picture_id = mongoose.Types.ObjectId(req.params.id.toString());
    gfs.remove({
        _id: picture_id
    }, function (err) {
        if (err) {
            res.send(err);
        } else {
            gfs.files.find({}).toArray(function (err, files) {
                if (err) {
                    res.json(err);
                }
                if (files.length > 0) {
                    var array = [];
                    for (var i = 0; i < files.length; i++) {
                        array.push('/pictures/' + files[i]._id);
                    }
                    res.send(array);
                }
            });


        }
    });

});
//update picture data 
router.put('/pictures/:id', function (req, res) {
    var picture_id = mongoose.Types.ObjectId(req.params.id.toString());

     gfs.files.update({_id: picture_id}, {$set: {"metadata.tags": req.body}}, function (err, file) {
        if (err) {
            res.send(err);
        } else {
            res.json(file);

        }
    });
});

//download image to hardrive
router.get('/download/pictures/:id', function (req, res) {

    var picture_id = mongoose.Types.ObjectId(req.params.id.toString());
    gfs.files.find({_id: picture_id}).toArray(function (err, files) {

        if (files.length === 0) {
            return res.status(400).send({
                message: 'File not found'
            });
        }

        res.writeHead(200, {'Content-Type': files[0].contentType});

        var readstream = gfs.createReadStream({
            filename: files[0].filename
        });

        readstream.on('data', function (data) {
            
            res.write(data);
        
        });

        readstream.on('end', function () {
            res.end();
        });

        readstream.on('error', function (err) {
            console.log('An error occurred!', err);
            throw err;
        });
    });
});

module.exports = router;