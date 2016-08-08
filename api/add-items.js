var express = require('express');
var fs = require("fs");
var router = express.Router();

router.post('/items', function (req, res, next) {
        fs.readFile('./todo-items.json', 'utf8', function (err, data) {
            if(err){
                return;
            }
            let newData =[];

            if (data != '') {
                newData = JSON.parse(data);
            }
            newData.push({text:req.body.text,isDone:req.body.isDone});
            fs.writeFile('./todo-items.json', JSON.stringify(newData), function (err) {
                // return;
            });

            res.status(200).json(newData);
        });

});

module.exports = router;