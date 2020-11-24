require('dotenv').config()
const express = require('express');
const app = express();
const session = require('express-session')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const config = require('./config/config')

const PORT = process.env.PORT || 3000;

app.use(cors())

// expressの設定
// -- body-parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// -- session
app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
// -- passport初期化＋セッション設定
app.use(passport.initialize());
// app.use(passport.session());
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

// TODO: デモ用アカウント生成　（削除する）
const UserModel = require('./models/User');
app.get('/setup', function(req, res) {
  var demo = new UserModel();

  demo.username = "demouser";
  demo.setPassword("password");

  demo.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true});
  });

});



app.listen(PORT);