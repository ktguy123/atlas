const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('./../config/config').secret;

const TodoSchema = new mongoose.Schema({
  parent: String,
  title : String,
  check : String,
  complete_time: String,
  point : Number
}, { timestamps: true });

TodoSchema.methods.toTodo = function(){
  return {
    id: this._id,
    parent: this.parent,
    title: this.title,
    check: this.check,
    complete_time: this.complete_time,
    point: this.point
  };
};

module.exports = mongoose.model('TodoModel', TodoSchema);
