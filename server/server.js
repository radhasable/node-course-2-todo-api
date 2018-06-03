//refer mongoosejs.com/docs
// var mongoose = require('mongoose');
var express = require('express');
var bodyparser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {todo} = require('./models/todo');
var {user} = require('./models/users');
//mongoose mantains connection over time
//no need to micromanage
//supports callbacks by default
//promises came from bluebird
//using built-in promise library
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');
var app = express();
app.use(bodyparser.json());   //setting up middleware to send json to the request

app.post('/todos',(req,res) => {
  var Todo = new todo({
    text: req.body.text
  });
  // console.log(req.body);
  Todo.save().then((doc) => {
    res.send(doc);
  },(err) =>{
    res.status(400).send(err);
  });
});

// GET /todos/

app.listen(3000, ()=>{
  console.log('Started on port 3000');
});


module.exports = {app};
