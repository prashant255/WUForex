common = require('./common')
const axios = require('axios')

getIForex = async (predictionData, cp) => {
    let rates = {}, highLowRates = {}
    let lpDetails = await common.getLPDetails(predictionData.LP_id)
    let apikey = await FinancialModellingAPIKey[Math.floor(Math.random() * FinancialModellingAPIKey.length)] 
    url = 'https://financialmodelingprep.com/api/v3/fx/' + cp +'?apikey=' + apikey
    try{
        response = await axios.get(url)
        rates = common.addDataFormat1(response.data[0])
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

getIForexAnalytics = async (lpDetails, cp) => {
    let apikey = await FinancialModellingAPIKey[Math.floor(Math.random() * FinancialModellingAPIKey.length)] 
    url = 'https://financialmodelingprep.com/api/v3/fx/' + cp +'?apikey=' + apikey
    try {
        response = await axios.get(url)
        rates = common.addDataFormat1(response.data[0])
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

module.exports ={
    getIForex,
    getIForexAnalytics
}