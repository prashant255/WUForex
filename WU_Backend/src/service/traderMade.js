const common = require('./common')
const axios = require('axios')

getTraderMade = async (predictionData, cp) => {
    let rates = {}, highLowRates = {}
    let lpDetails = await common.getLPDetails(predictionData.LP_id)
    let apikey = await TraderMadeAPIKey[Math.floor(Math.random() * TraderMadeAPIKey.length)]
    url = 'https://marketdata.tradermade.com/api/v1/live?currency=' + cp +'&api_key=' + apikey
    try{
        response = await axios.get(url)
        rates = common.addDataFormat2(response.data.quotes[0])
        highLowRates = await common.getHighLowRates(cp, predictionData.LP_id)
        dataIndividual = {
            rates,
            lpDetails,
            highLowRates
        }
        return dataIndividual
    }catch(e){
        throw(e)
    }
}

getTraderMadeAnalytics = async (lpDetails, cp) => {
    let apikey = await TraderMadeAPIKey[Math.floor(Math.random() * TraderMadeAPIKey.length)]
    url = 'https://marketdata.tradermade.com/api/v1/live?currency=' + cp +'&api_key=' + apikey
    try {
        response = await axios.get(url)
        rates = common.addDataFormat2(response.data.quotes[0])
        data = {
            ask: rates.ask,
            bid: rates.bid,
            lpid: lpDetails.id,
            lpname: lpDetails.LPName
        }
        return data
    } catch (e) {
        throw (e)
    }
}

module.exports = {
    getTraderMade,
    getTraderMadeAnalytics
}