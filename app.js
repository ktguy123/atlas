const express   = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/api/v1/');
const jwt = require('jsonwebtoken');
const config = require('./config/config.js');

const PORT = process.env.PORT || 3000;

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

// application variables
app.set('superSecret', config.secret);

// body-parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// ルーティング
app.use('/api/v1/', router);

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