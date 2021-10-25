// Import dependencies
require("dotenv").config()
const express = require('express')
const path = require('path')
const liquid = require('liquid-express-views')
const app = liquid(express(),{root:[path.resolve(__dirname,'views/')]})
const morgan = require('morgan')
const methodOverride = require('method-override')

const FruitsRouter = require('./controllers/fruit')



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

app.use('/fruits', FruitsRouter)

app.get('/', (req,res) => {
    res.redirect('/fruits')
})

// Listen for traffic
PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('listening on port:', PORT)
})