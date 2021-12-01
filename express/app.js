var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('./config2/db')
var cors = require('cors')

var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const PORT = process.env.PORT || 4000

var app = express();
app.use(cors())

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

require('dotenv').config()

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }))

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

module.exports = app;
