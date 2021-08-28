const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/LP-database', {
    useCreateIndex : true,
    useNewUrlParser : true
})

console.log('Connected to MongoDb database')