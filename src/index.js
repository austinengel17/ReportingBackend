//Author: Austin Engel

//Load first party libraries
const http = require('http');
const endpoints = require('./endpoints');

//DELETE BEFORE DEPLOYMENT
var receive = require("./subProcesses/recieve");


//Load 3rd party Libraries
const express = require('express');

//Creates express app
var app = express();

app.use(express.static('./frontendSrc'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/frontendSrc/index.html');

});

//Firing practice recieve.js MQ file DELETE BEFORE DEPLOYMENT
receive(app);

endpoints(app);

//Starting server, listening to port 3000
app.listen(3000, ()=>{console.log('Listening to port 3000')});
