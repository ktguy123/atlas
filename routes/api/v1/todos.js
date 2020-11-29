const express = require('express')
const router = express.Router()
const TodoModel = require('./../../../models/Todo')
const auth = require('./../../auth')

// todo post
router.post('/', auth.required, (req, res, next) => {
  
  const todo = new TodoModel();
  
  todo.parent = req.body.parent;
  todo.title = req.body.title;
  todo.check = req.body.check;
  todo.complete_time = req.body.complete_time;
  todo.point = req.body.point;
  
  todo.save().then(function () {
    return res.json(todo.toTodo());
  }).catch(next);
});

module.exports = router;