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
  destination: function (req, file, cb) {
  cb(null, './uploads')
},
filename: function (req, file, cb) {
  cb(null, file.originalname )
}
})

const upload = multer({ storage: storage }).single('file')

app.post('/postCsv',function(req, res) {
     
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
    return res.status(200).send(req.file)

  })

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
