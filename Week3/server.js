var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');

var accounts = [ {email: "test@email.com", pwd: "test"}, 
                 {email: "test1@email.com", pwd: "test1"}, 
                 {email: "test2@email.com", pwd: "test2"}];

app.use(bodyParser.json());

app.use(express.static(__dirname + '/'));

app.post('/api/login', function(req, res) {
    if (!req.body){
        return res.sendStatus(400);
    }
    var json = req.body;
    var email = json.email;
    var pwd = json.pwd;
    var valid = { valid: false };
    for (var i = 0; i<accounts.length; i++){
        if (email == accounts[i].email && pwd == accounts[i].pwd){
            valid.valid = true;
        }
    }
    console.log(valid);
    res.send(valid);
});

app.get('/account', function(req, res) {
    res.sendFile(__dirname + '/account.html');
});

http.listen(3000);