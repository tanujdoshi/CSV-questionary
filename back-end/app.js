var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var cors = require('cors');
const fs = require('fs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const multer = require("multer");
var app = express();

// view engine setup
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())


//multer
const storage = multer.diskStorage({
  // give it a destination
  destination(req, file, cb) {
    cb(null, './upload');
  },
  // in case you want to manipulate the file name you can do it here
  filename(req, file = {}, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage })



app.post('/postCsv', upload.single('csv'), function (req, res, next) {
  console.log("Filesss", req.file);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


app.listen('8000', function () {
  console.log("server is liestening ")
});

module.exports = app;
