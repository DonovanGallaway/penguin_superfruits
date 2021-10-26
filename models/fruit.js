const mongoose = require('./connection')



///////////////////////////////////
// Create fruits model
///////////////////////////////////

const {Schema, model} = mongoose // destructuring Schema and model from mongoose


// make fruits Schema
const fruitSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean,
    username: String
})

// Make the fruit Model
const Fruit = model('Fruit', fruitSchema)




module.exports = Fruit