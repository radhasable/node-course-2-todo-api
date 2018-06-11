const expect = require('expect');
const request  = require('supertest');

const {app} = require('./../server');
const {todo} = require('./../models/todo');
const {ObjectID} = require('mongodb');
// Testing lifecycle method

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
},{
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 3333
}];



beforeEach((done) =>{
  todo.remove({}).then(() => {
    return todo.insertMany(todos);
  }).then(() => done());   //DB becomes empty before each assertion
});

describe ('POST /todos',() => {

    it('should create a new todo',(done) => {
      var text = 'Test todo text';

      request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err) {
        return  done(err)
        }

        todo.find({text}).then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done()
        }).catch((err) => done(err));
      });
    });

    it('should not create Todo with invalid data',(done)=>{
      request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err){ return done(err)}
        todo.find().then((todos) =>{
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
    });
});


describe('GET /todos',() =>{
  it('should get all todos',(done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});


describe('GET /todos/:id',() =>{
  it('should return todo with id', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) =>{
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);

  });

  it('should return 404 if todo not found', (done) =>{
    var hexID = new ObjectID().toHexString();
    request(app)
    .get(`/todos/${hexID}`)
    .expect(404)
    .end(done);

  });

  it('should return 404 if invalid ObjectID',(done) => {
    request(app)
    .get('/todos/123asf')
    .expect(404)
    .end(done);
  });


});

describe('PATCH /todos/:id',() => {
  it('should update the todo',(done) => {
    // .patch(`/todos/${todos[0]._id.toHexString()}`)
    // var hexID = todos[0]._id.toHexString();
    var text = 'Homies this is the udpated text yall';
    request(app)
    .patch(`/todos/${todos[0]._id.toHexString()}`)
    .send({
      completed: true,
      text
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(true);
      expect(res.body.todo.completedAt).toBeA('number');
    })
    .end(done)
  });

  it('should clear completedAt when not completed',(done) => {
    var hexID = todos[1]._id.toHexString();
    var text = 'Homies this is another text yall, again';
    request(app)
    .patch(`/todos/${hexID}`)
    .send({
      completed: false,
      text
    })
    .expect(200)
    .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
    })
    .end(done);
  });
});
