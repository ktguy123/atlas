require('dotenv').config()
const express = require('express');
const app = express();
const session = require('express-session')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const config = require('./config/config');
const { Server } = require('mongodb');

app.use(cors())

// expressの設定
// -- body-parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// -- session(今は使ってない)
app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }))

// -- passport初期化＋セッション設定
app.use(passport.initialize())
// app.use(passport.session())
//   -- passportの認証ルール
require('./config/passport')

// DB接続
mongoose.Promise = global.Promise;
mongoose.connect(
  config.database,
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false
  }
).then(res => {
  console.log("db ok");
}).catch(error => {
  console.log("db ng");
});

// ルーティング
app.use(require('./routes'));

// エラーハンドリング
app.use(function (req, res, next) {
  const err = new Error('Not Found') // error.message
  err.status = 404
  next(err)
})

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    'errors': {
      message: err.message,
      error: {}
  }})
})

const server = app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port ' + server.address().port)
})