//refer mongoosejs.com/docs
const _ = require('lodash');
var express = require('express');
var bodyparser = require('body-parser');
var {ObjectID} = require('mongodb');
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
const port = process.env.PORT || 3000;


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
//returning all todo items
//first list all todos
app.get('/todos',(req,res) =>{
  todo.find().then((todos) =>{
    res.send({todos});
  },(e) => {
    res.status(400).send(e);
  });
});

//pass id to url GET /todos/12847t7t7e99ww453556
app.get('/todos/:id',(req,res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});


app.delete('/todos/:id',(req,res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  todo.findByIdAndRemove(id).then((todo) =>{
    if(!todo){
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id',(req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text','completed']);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  }else {
    body.completed = false;
    body.completedAt = null;
  }
  todo.findByIdAndUpdate(id, {$set: body},{new: true}).then((todo) => {
    if (!todo) {
        return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });

});

app.listen(port, ()=>{
  console.log(`Started at port ${port}`);
});


module.exports = {app};
