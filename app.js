var express = require('express');
var fs = require("fs");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

fs.stat('todo-items.json', function (err, stat, next) {
    if ((stat && stat.isFile())) {
        console.log("文件存在");
    } else {
        fs.open("todo-items.json", "a", function (err) {
            if (err) {
                return next(err);
            }
        });
    }
});


app.use('/', require('./public/get-allItems'));
app.use('/', require('./public/add-items'));
app.use('/', require('./public/delete-items'));
app.use('/', require('./public/put-items'));


app.listen(8081, () => {
    console.log('todo-list Server is running..');
});






