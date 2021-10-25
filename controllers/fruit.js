const express = require('express')
const Fruit = require('../models/fruit.js')



//////////////////////
// Create router
//////////////////////


const router = express.Router()


//////////////////////
// Routes
//////////////////////


///////////////////////////////////
// Routes
///////////////////////////////////

////////////////
// Fruit Routes
////////////////

// Seed route
router.get('/seed', (req,res) => {
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
router.get('/new', (req,res) => {
    res.render('fruits/new')
})

// Create Route
router.post('/', (req,res) => {
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false

    Fruit.create(req.body).then((fruit)=>{
        res.redirect('/fruits')
        .catch((error) =>{
            res.json({error})
        })
    })
})

// Edit Route
router.get('/:id/edit', (req,res) =>{
    const id = req.params.id
    Fruit.findById(id).then((fruit) => {
        res.render('fruits/edit', {fruit})
    })
    .catch((error) => res.json((error)))
})

// Update Route
router.put('/:id', (req, res) =>{
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false
    const id = req.params.id
    Fruit.findByIdAndUpdate(id, req.body, {new:true}).then(() =>{
        res.redirect('/fruits')
    })
})

// Delete Route
router.delete('/:id', (req,res) =>{
    const id = req.params.id
    Fruit.findByIdAndDelete(id).then(() =>{
        res.redirect('/fruits')
    })
})


// Index Route
router.get('/', (req,res) => {
    // find all fruits
    Fruit.find({})
    .then((fruits) => {
        res.render('fruits/index.liquid', {fruits})
    })
    .catch((error) => res.json((error)))
})

// Show Route
router.get('/:id', (req,res) =>{
    const id = req.params.id
    Fruit.findById(id).then((fruit) =>{
        res.render('fruits/show.liquid', {fruit})
    })
    .catch((error) => res.json((error)))
})



//////////////////////
// Export router
//////////////////////

module.exports = router