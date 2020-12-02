const mongoose = require('mongoose');

const SequenceSchema = new mongoose.Schema({
  todoSeq: Number
})

SequenceSchema.methods.getTodoSeq = function(){
  return {
    seq: this.todoSeq
  };
};

module.exports = mongoose.model('SequenceModel', SequenceSchema);
