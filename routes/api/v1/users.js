const express = require('express');
const router = express.Router();
const UserModel = require('./../../../models/User')
const auth = require('./../../auth');

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
    
    res.json({
      success: true,
      message: 'Authentication successfully finished.',
      id: user._id,
      username: user.username,
      token: user.generateJWT()
    });
  });
});

// TODO: スーパーユーザーのみ可能にする
// ユーザー新規登録
router.post('/', auth.required, (req, res, next) => {

  const user = new UserModel();

  user.username = req.body.username;
  user.setPassword(req.body.password);

  user.save().then(function () {
    return res.json(user.toAuthJSON());
  }).catch(next);
});

// ユーザーの情報の更新
router.put('/:id', auth.required, (req, res, next) => {
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