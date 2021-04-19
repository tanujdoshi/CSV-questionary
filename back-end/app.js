var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var cors = require('cors');
const fs = require('fs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const multer = require("multer");
var app = express();
var csv = require("csvtojson");
var csvfilename;
let csvToJson = require('convert-csv-to-json');
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
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file')


//upload csv to uploads
app.post('/postCsv', async function (req, res) {

  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }



    const csvFilePath = './uploads/' + req.body.filename;
    const jsonObj = await csv().fromFile(csvFilePath)

    evaluteQuestion(jsonObj);
    return res.status(200).send(req.file)

  })

});

function evaluteQuestion(QuestionJSON) {
  const result = [];
  QuestionJSON.forEach(element => {
    result.push({
      ID: element.ID,
      Type: element.Type,
      Heading: element.Heading,
      question: element['Question text'],
      component: element.Component,
      options: element.Options.split('\n'),
      rules: element.Rule != '' ? 1 : 0,
      jump: element.Rules != '' ? element['Then jump to'].split('\n') : null,
      Images: element.Images != '' ? element.Images : null,
      Isrequired: element['Required?']

    });
  });
  console.log("Result", result);
}
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
