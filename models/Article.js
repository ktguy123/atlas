const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const ArticleSchema = new Schema({
  title: String,
  description: String,
  body: String,
  date: String
});

ArticleSchema.methods.setDate = function(){
  this.date = moment().format("YYYY-MM-DD HH:mm:ss");
}

module.exports = mongoose.model('ArticleModel', ArticleSchema);