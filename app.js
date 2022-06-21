const express = require('express');
const app = express();
const path = require("path");
app.set("view engine","jade")
app.use(express.static(path.join(__dirname, "/assets")));

app.get('/', function (req, res) {
    var stdList = [111,2222,3333];
    res.render('index',{studentList:stdList });
});

var server = app.listen(3100, function () {
    console.log('http://localhost:3100/');
});