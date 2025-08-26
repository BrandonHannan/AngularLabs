var express = require('express');
const cors = require('cors');
var app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
var http = require('http').Server(app);
const io = require('socket.io')(http,{
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    }
});

const sockets = require('./socket.js');

sockets.connect(io, port);

app.use(express.static(__dirname + '/'));

http.listen(port);