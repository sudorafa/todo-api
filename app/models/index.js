const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.todo = require('./todo.model');
db.task = require('./task.model');
db.subTask = require('./sub-task.model');

module.exports = db;