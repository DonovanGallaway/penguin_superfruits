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
// Route Middleware
///////////////////////////////////

router.use((req,res,next) =>{
    if (req.session.loggedIn){
        next()
    } else{
        res.redirect('/user/login')
    }
})


///////////////////////////////////
// Routes
///////////////////////////////////

////////////////
// Fruit Routes
////////////////

// New Route
router.get('/new', (req,res) => {
    res.render('fruits/new')
})

// Create Route
router.post('/', (req,res) => {
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false
    req.body.username = req.session.username
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
    Fruit.find({username: req.session.username})
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