var express = require('express');
var fs = require("fs");
var router = express.Router();

router.post('/item', function (req, res, next) {
    fs.readFile('./todo-items.json', 'utf8', function (err, data) {
        if (err) {
            return next(err);
        }
        if (data === '') {
            data = [];
        }
        else {
            data = JSON.parse(data);
        }
        // addItem(data, req, res, next);
        fs.writeFile('./todo-items.json', JSON.stringify(req.body), function (err) {
            if (err) {
                return next(err);
            }
        });
        res.status(201).json(item);
     });
});

// function addItem(itemsData, req, res, next) {
//     var item = {
//         "title": req.body.title,
//         "isDone": req.body.isDone
//     };
//     itemsData.push(item);
//     fs.writeFile('./todo-items.json', JSON.stringify(itemsData), function (err) {
//         if (err) {
//             return next(err);
//         }
//     });
//     res.status(201).json(item);
// }

module.exports = router;