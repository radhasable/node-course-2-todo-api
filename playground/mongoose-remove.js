const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {todo} = require('./../server/models/todo');
const {user} = require('./../server/models/users');

// todo.remove({}).then((res) => {
//   console.log(res);
// });

todo.findOneAndRemove({_id: '5b18c74a944993fad8fb6795'}).then({res} => {
  console.log(res);
});
// todo.findByIdAndRemove('5b18c663944993fad8fb6760').then((Todo) => {
//   console.log(Todo);
// });
