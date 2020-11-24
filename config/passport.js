const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./../models/User')

passport.use(new LocalStrategy(
  function(username, password, done) {
    UserModel.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'ユーザーIDが正しくありません。' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'パスワードが正しくありません。' });
      }
      return done(null, user);
    });
  }
));