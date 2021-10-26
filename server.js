// Import dependencies
require("dotenv").config()
const express = require('express')
const path = require('path')
const liquid = require('liquid-express-views')
const app = liquid(express(),{root:[path.resolve(__dirname,'views/')]})
const morgan = require('morgan')
const methodOverride = require('method-override')

const FruitsRouter = require('./controllers/fruit')
const UserRouter = require('./controllers/user')
const session = require('express-session')
const MongoStore = require('connect-mongo')



///////////////////////////////////
// Middleware
///////////////////////////////////

app.use(morgan('tiny'))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
// middleware to create sessions
app.use(session({
    secret: process.env.SECRET, 
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    resave: false
}))


///////////////////////////////////
// Routes
///////////////////////////////////

app.use('/fruits', FruitsRouter)
app.use('/user', UserRouter)

app.get('/', (req,res) => {
    res.render('index')
})

// Listen for traffic
PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('listening on port:', PORT)
})