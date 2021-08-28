const common = require('./common')
const axios = require('axios')

getFinhubData = async (predictionData, cp) => {
    let rates = {}, highLowRates = {}
    let lpDetails = await common.getLPDetails(predictionData.LP_id)
    let currentDate = Math.trunc(new Date().getTime() / 1000)
    let apikey = await FinnHubAPIKey[Math.floor(Math.random() * FinnHubAPIKey.length)] 
    let fromCurrentDate
    if((new Date().getUTCDay() === 0 && new Date().getUTCHours() <= 22 ) || (new Date().getUTCDay() === 5 && new Date().getUTCHours() >= 21) || (new Date().getUTCDay() === 6))
        fromCurrentDate = currentDate-10000
    else
        fromCurrentDate = currentDate - 60
    url = "https://finnhub.io/api/v1/forex/candle?symbol="+ LP[predictionData.LP_id-1][cp] +"&resolution=1&from="+ fromCurrentDate +"&to="+ currentDate +"&token=" + apikey
    try{
        response = await axios.get(url)
        rates = common.addDataFormat3(response.data)
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

getFinhubDataAnalytics = async (lpDetails, cp) => {
    let currentDate = Math.trunc(new Date().getTime() / 1000)
    let apikey = await FinnHubAPIKey[Math.floor(Math.random() * FinnHubAPIKey.length)]
    let fromCurrentDate
    if((new Date().getDay() === 7 && new Date().getUTCHours() <= 22 ) || (new Date().getDay() === 5 && new Date().getUTCHours() >= 21) || (new Date().getDay() === 6))
        fromCurrentDate = currentDate-10000
    else
        fromCurrentDate = currentDate - 60
    url = "https://finnhub.io/api/v1/forex/candle?symbol="+ LP[lpDetails.id-1][cp] +"&resolution=1&from="+ fromCurrentDate +"&to="+ currentDate +"&token=" + apikey
    try {
        response = await axios.get(url)
        rates = common.addDataFormat3(response.data)
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
    getFinhubData,
    getFinhubDataAnalytics,
}