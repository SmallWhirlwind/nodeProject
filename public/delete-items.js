var express = require('express');
var fs = require("fs");
var router = express.Router();

router.delete('/items', function (req, res, next) {

    fs.readFile('./todo-items.json', 'utf8', function (err, data) {
        if(err){
            return;
        }
        let newData =[];

        if (data != '') {
            newData = JSON.parse(data);
            // for(let i = 0; i < newData.length ; i++) {
            //     if(newData.lists[i].index === parseInt(req.body.index)){
                    newData.splice((req.body.index), 1);
                    // break;
                //}
           // }
        }
        fs.writeFile('./todo-items.json', JSON.stringify(newData), function (err) {
            return;
        });
        res.status(200).json(newData);
    });




});
module.exports = router;