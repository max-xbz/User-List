//user schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    sex: String,
    age: Number,
    password: String,
    createdAt: Date
});

module.exports = mongoose.model('users', userSchema);