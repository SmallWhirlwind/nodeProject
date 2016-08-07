var express = require('express');
var fs = require("fs");
var router = express.Router();


router.get('/items', function (req, res, next) {
    fs.readFile('./todo-items.json', 'utf8', function (err, data) {
        if (err) {
            return next(err);
        }
        if (data === '') {
            data = [];
            res.status(200).json(data);
            return;
        }
        else {
            data = JSON.parse(data);
            res.status(200).json(data);
            console.log(data);
        }
    });
});

module.exports = router;