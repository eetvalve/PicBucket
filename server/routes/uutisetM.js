var express = require('express');
var router = express.Router();

var config = require('../config.json');
var mongoose = require('mongoose');
db = mongoose.createConnection(config.connectionString);
var Uutiset = require('../models/uutisetM');



router.post('/api/v1/uutinen', function (req, res) {

    var results = [];

    var uutiset = new Uutiset();		
    uutiset.title = req.body.title;
    uutiset.text = req.body.text;


    uutiset.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            Uutiset.find({}, function (err, uutiset) {
                if (err) {
                    res.send('uutisetn tuominen kusi');
                } else {
                    res.json(uutiset);
                }
            }).sort({_id:-1}).limit(4);
            Uutiset.on('row', function (row) {
                results.push(row);
            });

            // After all data is returned, close connection and return results
            Uutiset.on('end', function () {
                done();
                return res.json(results);
            });
        }
    });
});
// Get our form values. These rely on the "name" attributes




router.get('/api/v1/uutinen', function (req, res) {



    Uutiset.find({}, function (err, uutiset) {
        if (err) {
            res.send('uutisetn tuominen kusi');
        } else {
            res.json(uutiset);
        }
    }).sort({_id:-1}).limit(4);
});

router.delete('/api/v1/uutinen/:todo_id', function (req, res) {

    var results = [];

    Uutiset.remove({
        _id: req.params.todo_id
    }, function (err) {
        if (err) {
            res.send(err);
        } else {

            Uutiset.find({}, function (err, uutiset) {
                if (err) {
                    res.send('uutisetn tuominen kusi');
                } else {
                    res.json(uutiset);
                }
            }).sort({_id:-1}).limit(4);
            Uutiset.on('row', function (row) {
                results.push(row);
            });

            // After all data is returned, close connection and return results
            Uutiset.on('end', function () {
                done();
                return res.json(results);
            });
        }
    });
});


// update the bear with this id
router.put('/api/v1/uutinen/:todo_id', function (req, res) {
    Uutiset.findById(req.params.todo_id, req.body, function (err, uutiset) {

        var results = [];

        if (err) {
            res.send(err);
        } else {

            uutiset.title= req.body.title;
            uutiset.text= req.body.text;


            uutiset.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    Uutiset.find({}, function (err, uutiset) {
                        if (err) {
                            res.send('uutisetn tuominen kusi');
                        } else {
                            res.json(uutiset);
                        }
                    }).sort({_id:-1}).limit(4);
                    Uutiset.on('row', function (row) {
                        results.push(row);
                    });

                    // After all data is returned, close connection and return results
                    Uutiset.on('end', function () {
                        done();
                        return res.json(results);
                    });
                }

            });
        }
    });
});


module.exports = router;