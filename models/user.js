const mongoose = require('./connection')



///////////////////////////////////
// Create User model
///////////////////////////////////

const {Schema, model} = mongoose // destructuring Schema and model from mongoose


// make users Schema
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

// Make the user Model
const User = model('User', userSchema)




module.exports = User