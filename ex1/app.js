var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose')
var mongoDB = 'mongodb://127.0.0.1/scienceJobs'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
var db = mongoose.connection
db.on('error', function(){
  console.error.bind(console, 'Erro na ligação ao MongoDB...')
}) 
db.on('open', () => {
  console.log('MongoDB: ligação estabelecida...')
})


var contractsRouter = require('./routes/contractsRoute');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/contracts', contractsRouter);


module.exports = app;
