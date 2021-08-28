const finhubLPs = require('./finhubLPs')
const dbCheck = require('./dbCheck')
require('../constant')

index = async() => {
    
    for(let currency = 0; currency < 10; currency++)
    {
        let LP_id = 6;
        // console.log("start")
        await dbCheck(currencyPairArray[currency], LP_id)
        // console.log("end")
    }

    for(let currency = 0; currency < 10; currency++)
    {
        let LP_id = 7;
        // console.log("startLP2")
        await dbCheck(currencyPairArray[currency], LP_id)
        // console.log("endLP2")
    }

    for(let currency = 0; currency < 10; currency++)
    {
        // console.log("startLPFinhub currency loop")
        await finhubLPs(currencyPairArray[currency])
        // console.log("endLPfinhub currency loop")
    }
}

module.exports = index