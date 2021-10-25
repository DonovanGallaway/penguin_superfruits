// Import dependencies
require("dotenv").config()
const express = require('express')
const path = require('path')
const liquid = require('liquid-express-views')
const app = liquid(express(),{root:[path.resolve(__dirname,'views/')]})
const morgan = require('morgan')
const methodOverride = require('method-override')
const mongoose = require("mongoose")

// Establish connection
// setup mongoose connect
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewURLParser: true,
    useUnifiedTopology:true
}

// connect to mongoose
mongoose.connect(DATABASE_URL, CONFIG)


//connection messages
mongoose.connection
.on('open', () => console.log('connected to mongoose'))
.on('close', () => console.log('disconnected from mongoose'))


///////////////////////////////////
// Create fruits model
///////////////////////////////////

const {Schema, model} = mongoose // destructuring Schema and model from mongoose


// make fruits Schema
const fruitSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})

// Make the fruit Model
const Fruit = model('Fruit', fruitSchema)



///////////////////////////////////
// Middleware
///////////////////////////////////

app.use(morgan('tiny'))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))



///////////////////////////////////
// Routes
///////////////////////////////////

////////////////
// Fruit Routes
////////////////

// Seed route
app.get('/fruits/seed', (req,res) => {
    // array of starter fruits
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
      ];
    // delete current fruits
    Fruit.deleteMany({}).then((data) => {
        Fruit.create(startFruits).then((data) =>{
            res.json(data)
        })
    })
})


// New Route
app.get('/fruits/new', (req,res) => {
    res.render('fruits/new')
})

// Create Route
app.post('/fruits', (req,res) => {
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false

    Fruit.create(req.body).then((fruit)=>{
        res.redirect('/fruits')
        .catch((error) =>{
            res.json({error})
        })
    })
})

// Edit Route
app.get('/fruits/:id/edit', (req,res) =>{
    const id = req.params.id
    Fruit.findById(id).then((fruit) => {
        res.render('fruits/edit', {fruit})
    })
    .catch((error) => res.json((error)))
})

// Update Route
app.put('/fruits/:id', (req, res) =>{
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false
    const id = req.params.id
    Fruit.findByIdAndUpdate(id, req.body, {new:true}).then(() =>{
        res.redirect('/fruits')
    })
})

// Delete Route
app.delete('/fruits/:id', (req,res) =>{
    const id = req.params.id
    Fruit.findByIdAndDelete(id).then(() =>{
        res.redirect('/fruits')
    })
})


// Index Route
app.get('/fruits', (req,res) => {
    // find all fruits
    Fruit.find({})
    .then((fruits) => {
        res.render('fruits/index.liquid', {fruits})
    })
    .catch((error) => res.json((error)))
})

app.get('/', (req,res) => {
    res.redirect('/fruits')
})

// Show Route
app.get('/fruits/:id', (req,res) =>{
    const id = req.params.id
    Fruit.findById(id).then((fruit) =>{
        res.render('fruits/show.liquid', {fruit})
    })
    .catch((error) => res.json((error)))
})

// Listen for traffic
PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('listening on port:', PORT)
})