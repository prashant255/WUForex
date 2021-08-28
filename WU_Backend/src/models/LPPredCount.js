const mongoose = require('mongoose')

const LPPredCount = mongoose.model('lp_pred_count', {
    currencyPair: {
        type: String,
        required: true
    },
    LPid: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
}, 'lp_pred_count')

module.exports = LPPredCount