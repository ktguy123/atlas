const express = require('express')
const router = express.Router()
const TodoModel = require('./../../../models/Todo')
const auth = require('./../../auth')

// todo post
router.post('/', auth.required, (req, res, next) => {
  
  const todo = new TodoModel();

  todo.userId = req.body.userId
  todo.title = req.body.title
  todo.tag = req.body.tag
  todo.todo = req.body.todo
  todo.score = req.body.score
  
  todo.save().then(function () {
    return res.json(todo.toTodo());
  }).catch(next);
});

module.exports = router;