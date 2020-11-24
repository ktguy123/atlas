const express = require('express');
const passport = require('passport')
const router = express.Router();
const UserModel = require('./../../../models/User')
const auth = require('./../../auth');

router.post('/login', (req, res, next) => {
  
  if(!req.body.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }
  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }
    
    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});


// TODO: スーパーユーザーのみ可能にする
// ユーザー新規登録
router.post('/', auth.required, (req, res, next) => {
  
  const user = new UserModel();
  
  user.username = req.body.username;
  user.email = req.body.email;
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
    if (typeof req.body.email !== 'undefined') {
      user.email = reb.body.email
    }
    return user.save().then(function () {
      return res.json(user.toAuthJSON());
    });
  }).catch(next);
});

module.exports = router;