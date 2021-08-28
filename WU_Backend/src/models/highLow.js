const mongoose = require('mongoose')

const HL1 = mongoose.model('HL1', {
    LPid : Number,
    currencyPair : String,
    weeklyHigh : Number,
    weeklyLow : Number,
    dailyHigh : Number,
    dailyLow : Number,
})


module.exports = HL1
