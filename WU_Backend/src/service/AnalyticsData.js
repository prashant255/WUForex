require('../constant')
require('../APIKey')
iForex = require('./iForex')
finnhub = require('./finnhubAPI')
traderMade = require('./traderMade')
LPDetails = require('../models/LPDetails')

getAnalytics = async (cp) => {

    if(!currencyPair.includes(cp)){
        throw ("Currency pair not available")
    }

    try{
        let lpDetails = await LPDetails.find({})
        let dataToSend = []
        for(var i =0; i<lpDetails.length; i++){
            if(lpDetails[i].id === 6)
                dataToSend.push(await iForex.getIForexAnalytics(lpDetails[i], cp))
            else if(lpDetails[i].id === 7)
                dataToSend.push(await traderMade.getTraderMadeAnalytics(lpDetails[i], cp))
            else
                dataToSend.push(await finnhub.getFinhubDataAnalytics(lpDetails[i], cp))
        }
        return dataToSend
    }catch(e) {
        throw(e)
    }
}

module.exports =  {
    getAnalytics
}