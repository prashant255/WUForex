const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
require('./db/mongoose')

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Aceess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const LP1router = require('./routers/LP-1')
const LP2router = require('./routers/LP-2')
const AllLProuter = require('./routers/AllLP')

const port = process.env.port || 8080

app.use(express.json())
app.use('/api/Oanda', LP1router)
app.use('/api/ICMarket', LP2router)
app.use('/api/common', AllLProuter)

app.get('*', (req, res) => {
    res.send('404 page not found!').status(404)    
})

app.listen(port, () => {
    console.log('Server is up and running on port: ' + port)
})