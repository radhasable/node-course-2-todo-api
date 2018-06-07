
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/TodoApp');
// mongodb://heroku_9jfrsz88:6mlpe903ubbljkka1746bcbli@ds251210.mlab.com:51210/heroku_9jfrsz88
module.exports = {mongoose};
