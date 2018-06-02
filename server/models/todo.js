var mongoose = require('mongoose');

//creating a model
var todo = mongoose.model('Todo',{
  text: {
      type: String,
      required:true,
      minlength: 1,
      trim: true   //removes leading/trailing whitespace
  },
  completed:{
    type: Boolean,
    default: false

  },
  completedAt:{
    type: Number,
    default: null
  }
});


module.exports = {todo};
