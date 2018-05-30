// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');  //creates new objectID on the fly

// var obj = new ObjectID();
// console.log(obj);
// // object destructuring
// var user = {name: 'Radison',age: 25};
// // taking object property and then converting to variable
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) => {
  if(err){
      return console.log('Unable to Connect to Mongo');
  }
  console.log('Connected to Mongo!');

  // const db = client.db('TodoApp');
  //
  // db.collection('Todos').insertOne({
  //   text: 'Just typing some random shit',
  //   completed: false
  // }, (err,result) => {
  //   if(err){
  //     return console.log('Unable to insert data!',err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  const db = client.db('TodoApp');
  db.collection('Users').insertOne({
    name: 'Shivani',
    age:70,
    location: 'Pune'
  },(err,result)=>{
      if(err){
        return console.log('Unable to insert User!',err);
      }
      console.log(result.ops);  //prints all the rows/documents in the table
  });
  client.close();
});
