const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {todo} = require('./../server/models/todo');
const {user} = require('./../server/models/users');

var id = '5b14290601514d2c7d8676ef111';
//check if objectID is valid or not

// if(!ObjectID.isValid(id)){
//   console.log('Id not valid');
// }


//no need to convert string into ObjectID
// todo.find({                 //find returns an array
//   _id: id
// }).then((todos) => {
//   console.log('Todos: ',todos);
// });
//
// todo.findOne({_id: id}).then((todos) => {        //findOne returns a document
//   console.log('Todos', todos);
// });

// todo.findById(id).then((todos) => {
//   if(!todos){
//     return console.log('Id not found');
//   }
//   console.log('Todo by Id',todos);
// }).catch((e) => console.log(e));

user.findById("5b1296d51637fb2eaf257ae6").then((user) => {
  if (!user) {
    return console.log("User not found");
  }
  console.log(JSON.stringify(user,undefined,2));
}, (e) => {console.log(e);});
