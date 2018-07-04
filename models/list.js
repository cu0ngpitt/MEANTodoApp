const mongoose = require('mongoose');
const config = require('../config/database');


const TodoSchema = mongoose.Schema({
    item: String,
    completed: Boolean
})

const DataSchema = mongoose.Schema({

  username: String,
  todos: [TodoSchema]
});

const Item = module.exports = mongoose.model('Item', DataSchema);


module.exports.getListByUsername = function(username, callback) {
  const query = {username: username}
  Item.findOne(query, callback);
}

module.exports.getLists = function(username, callback) {
  const query = { username, username };
  Item.findOne(query, callback);
}

module.exports.addNewItem = function(newItem, callback) {
  newItem.save(callback);
}

module.exports.addItem = function(username, item, callback) {
  const query = { username: username }
  Item.findOneAndUpdate(query, { $push: item }, callback);
}

module.exports.markItemCompleted = function(id, userId, callback) {
  const query = { "_id": userId, "todos._id": id };
  Item.findOneAndUpdate(query, { $set: { "todos.$.completed": true }}, callback);
}

module.exports.markNotCompleted = function(id, userId, callback) {
  const query = { "_id": userId, "todos._id": id };
  Item.findOneAndUpdate(query, { $set: { "todos.$.completed": false }}, callback);
}

module.exports.deleteOne = function(id, userId, callback) {
  const query = { "_id": userId };
  Item.findOneAndUpdate(query, { $pull: { todos: {  _id: id }}}, { multi: true }, callback);
}

module.exports.deleteCompleted = function(userId, callback) {
  const query = { "_id": userId };
  Item.findOneAndUpdate(query, { $pull: { todos: { completed: true }}}, { multi: true }, callback);
}
