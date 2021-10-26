////////////////////////////
// Import Dependencies
////////////////////////////

const mongoose = require('./connection')
const Fruit = require('./fruit')

////////////////////////////
// Seed Code
////////////////////////////

const db = mongoose.connection

db.on('open', () =>{
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
            console.log(data)
            db.close()
        })
    })
})