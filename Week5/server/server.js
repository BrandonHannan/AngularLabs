var express = require('express');
const cors = require('cors');
var app = express();
const port = 3000;
app.use(cors());
var http = require('http').Server(app);

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + '/'));

app.post('/api/auth', require('./api/auth/login'));

http.listen(3000);
