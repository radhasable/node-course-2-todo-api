// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');  //creates new objectID on the fly


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) => {
  if(err){
      return console.log('Unable to Connect to Mongo');
  }
  console.log('Connected to Mongo!');
  const db = client.db('TodoApp');

    //deleteMany

// db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
//   console.log(result);
// });
    //DeleteOne

    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //   console.log(result);
    // });


    //Find and delete
    db.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
        console.log(result);
    });

  // client.close();
});
