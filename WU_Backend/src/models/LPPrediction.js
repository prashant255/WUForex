const mongoose = require('mongoose')

const LPPrediction = mongoose.model('lp_prediction', {
    currencyPair: {
        type: String,
        required: true
    },
    LP_id: {
        type: Number,
        required: true
    },
    LPName: {
        type: String
    },
    PercentProfitable: {
        type: Number,
        required: true
    },
    ProfitFactor: {
        type: Number,
        required: true
    },
    NetProfit: {
        type: Number
    }

}, 'lp_prediction')

module.exports = LPPrediction