const express = require('express');
const jwt = require('jsonwebtoken');
const secret = require('./../../config/config.js').secret;

const router = express.Router();

// 認証処理
router.use((req, res, next) => {

  // get token from body:token or query:token of Http Header:x-access-token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // validate token
  if (!token) {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }

  jwt.verify(token, secret, function(err, decoded) {
    if (err) {
      return res.json({
        success: false,
        message: 'Invalid token'
      });
    }

    // if token valid -> save token to request for use in other routes
    req.decoded = decoded;
    next();
  });
});

module.exports = router;