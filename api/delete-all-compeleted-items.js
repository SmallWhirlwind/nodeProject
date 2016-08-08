var express = require('express');
var fs = require("fs");
var router = express.Router();

router.delete('/completedItems', function (req, res, next) {
    fs.readFile('./todo-items.json', 'utf8', function (err, data) {
        if (err) {
            return;
        }
        let newData = [];

        if (data != '') {
            newData = JSON.parse(data);
            newData=newData.filter(item=>item.isDone === false);
         }
        fs.writeFile('./todo-items.json', JSON.stringify(newData), function (err) {
        });
        res.status(200).json(newData);
    });
});
module.exports = router;