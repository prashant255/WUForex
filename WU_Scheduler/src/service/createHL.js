const HL1 = require('../models/highLow')
const cron = require('node-cron')
require('../db/mongoose')
require('../constant')

index = async() => {
    for(let lpindex = 1; lpindex <= 7; lpindex++)
    {
        for(let currency = 0; currency < 10; currency++)
        {
            HL = new HL1
            HL.LPid = lpindex
            HL.currencyPair = currencyPairArray[currency]
            HL.weeklyHigh = 0
            HL.weeklyLow = 0
            HL.dailyHigh = 0
            HL.dailyLow = 0
            await HL.save()
        }     
    }
}

index()

module.exports = HL


