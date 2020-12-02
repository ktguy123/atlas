const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('./../config/config').secret;

const TodoSchema = new mongoose.Schema({
  userId: Object,
  title: String,
  tag: [],
  todo: {},
  score: Number
}, { timestamps: true });

TodoSchema.methods.toTodo = function(){
  return {
    todoId: this._id,
    userId: this.userId,
    title: this.title,
    tag: this.tag,
    todo: this.todo,
    score: this.score
  };
};

module.exports = mongoose.model('TodoModel', TodoSchema);
