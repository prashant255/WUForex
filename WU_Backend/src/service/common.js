const LPDetails = require('../models/LPDetails')
const HighLow = require('../models/highLow')

getHighLowRates = async (cp, lpid) => {
    highLow = await HighLow.findOne({currencyPair: cp, LPid: lpid})
    return highLow
}

getLPDetails = async (id) => {
    details = await LPDetails.findOne({id : id})
    return details
}

addDataFormat1 = ({ask, bid, open}) => {
    const rates = 
    {
        ask: ask,
        bid: bid,
        open: open,
    }
    return rates
}

addDataFormat2 = ({ask, bid, mid}) => {
    const rates = 
    {
        ask: ask,
        bid: bid,
        open: mid,
    }
    return rates
}

addDataFormat3 = ({h, l, o}) => {
    let len = h.length
    const rates = 
    {
        ask: h[len-1],
        bid: l[len-1],
        open: o[len-1],
    }
    return rates
}

module.exports = {
    getLPDetails,
    addDataFormat1,
    addDataFormat2,
    addDataFormat3,
    getHighLowRates
}