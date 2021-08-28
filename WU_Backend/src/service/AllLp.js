require('../constant')
require('../APIKey')
iForex = require('./iForex')
finnhub = require('./finnhubAPI')
traderMade = require('./traderMade')
LPPrediction = require('../models/LPPrediction')

getDetails = async (cp) => {
    
    //Check if currency pair in the list

    if(!currencyPair.includes(cp)){
        throw ("Currency pair not available")
    }

    try{
        predictionData = await LPPrediction.find({currencyPair: cp})
        var sortData = predictionData.sort(function(a, b) {
            return b.ProfitFactor - a.ProfitFactor
        })
        let dataToSend = []
        for(var i =0; i<sortData.length; i++){
            if(sortData[i].LP_id === 6)
                dataToSend.push(await iForex.getIForex(predictionData[i], cp))
            else
             if(sortData[i].LP_id === 7)
                dataToSend.push(await traderMade.getTraderMade(predictionData[i], cp))
            else
                dataToSend.push(await finnhub.getFinhubData(predictionData[i], cp))
        }
        return dataToSend
    }catch(e) {
        throw(e)
    }
}

module.exports =  {
    getDetails
}