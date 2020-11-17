const express = require('express');
const router = express.Router();
const UserModel = require('../../../models/User.js');
const auth = require('./../auth.js');

// TODO: basic認証によるログイン。OAuth 2.0の実装も考える
router.post('/login', (req, res) => {
  UserModel.findOne({
    username: req.body.username
  },
  (err, user) => {
    if (err) {
      throw err;
    }
    
    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
      return;
    }
    
    // Basic認証
    if (!user.validPassword(req.body.password)) {
      
      res.json({
        success: false,
        message: 'Authentication failed. Wrong password.'
      });
      return;
    }
    
    const token = user.generateJWT();
    
    res.json({
      success: true,
      message: 'Authentication successfully finished.',
      id: user._id,
      username: user.username,
      token: token
    });
  });
});

// TODO: スーパーユーザーのみ可能にする
// ユーザー新規登録
router.post('/', auth, (req, res, next) => {

  const user = new UserModel();

  user.username = req.body.username;
  user.setPassword(req.body.password);

  user.save().then(function () {
    return res.json(user.toAuthJSON());
  }).catch(next);
});

// ユーザーの情報の更新
router.put('/:id', auth, (req, res, next) => {
  UserModel.findById(req.params.id)
    .then(function (user) {
      if (!user) { return res.sendStatus(401); }

      // only update fields that were actually passed...
      if (typeof req.body.username !== 'undefined') {
        user.username = req.body.username;
      }
      if (typeof req.body.password !== 'undefined') {
        user.setPassword(req.body.password);
      }
      return user.save().then(function () {
        return res.json(user.toAuthJSON());
      });
    }).catch(next);
});

module.exports = router;