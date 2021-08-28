const HL = require('../models/highLow')
require('../constant')


clearWeeklyData = async() => {
    for(let lpindex = 1; lpindex <= 7; lpindex++)
    {
            for(let currency = 0; currency < 10; currency++)
            {
                const filter = {currencyPair : currencyPairArray[currency], LPid : lpindex}
                await HL.findOneAndUpdate(filter, {weeklyHigh : 0, weeklyLow : 0})
            }     
    }
}