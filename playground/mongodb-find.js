// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');  //creates new objectID on the fly


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) => {
  if(err){
      return console.log('Unable to Connect to Mongo');
  }
  console.log('Connected to Mongo!');


  const db = client.db('TodoApp');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5b0d5519533eb47c8a044c60')
  // }).toArray().then((docs) => {
  //     console.log('Todos');
  //     console.log(JSON.stringify(docs, undefined,2));
  // },(err) => {
  //   console.log('Unable to fetch the doc!',err);
  // });

  db.collection('Todos').find().count().then((count) => {
      console.log(`Todos count: ${count}`);
  },(err) => {
    console.log('Unable to fetch the doc!',err);
  });


  db.collection('Users').find({name: 'Shivani'}).toArray().then((docs) => {
      console.log('Users');
      console.log(JSON.stringify(docs, undefined,2));

  },(err) => {
    console.log('Unable to fetch records',err);
  });

  // client.close();
});
