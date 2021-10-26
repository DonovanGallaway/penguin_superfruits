///////////////////////////////
// Import Dependencies
///////////////////////////////

const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

///////////////////////////////
// Create Router
///////////////////////////////

const router = express.Router()

///////////////////////////////
// Routes
///////////////////////////////

// Signup Routes (Get => form, post => submit form)
router.get('/signup', (req,res) =>{
    res.render('user/signup.liquid')
})

router.post('/signup', async (req,res) => {
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )
    User.create(req.body)
    .then((user) =>{
        console.log(user)
        res.redirect('/user/login')
    })
    .catch((error) => res.json(error))
})

// Login Routes
router.get('/login', (req,res) =>{
    res.render('user/login.liquid')
})

router.post('/login', async (req,res) =>{
    // destructure username and password from req.body
    const {username,password} = req.body

    // search for user
    User.findOne({username})
    .then(async (user) =>{
        if(user){
            // compare passwords
            const result = await bcrypt.compare(password, user.password)
            if (result) {
                req.session.username = username
                req.session.loggedIn = true
                res.redirect('/fruits')
            }
            else {
                res.json({error: "password doesn't match"})
            }
        } else{
            // send error that user doesn't exist
            res.json({error: "User doesn't exist"})
        }
    }).catch((error) =>res.json(error))
})

// logout route
router.get('/logout', (req,res) =>{
    req.session.destroy((err) =>{
        res.redirect('/')
    })
})


module.exports = router;