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

app.use('/', require('./api/get-allItems'));
app.use('/', require('./api/add-items'));
app.use('/', require('./api/delete-items'));
app.use('/', require('./api/put-items'));
app.use('/', require('./api/delete-all-compeleted-items'));


app.listen(8081, () => {
    console.log('todo-list Server is running..');
});






