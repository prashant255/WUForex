const mongoose = require('mongoose')

const LPDetails = mongoose.model('lp_details', {
    id: {
        type: Number,
        required: true,
    },
    LPName: {
        type: String,
        required: true,
        trim: true
    },
    LPUrl: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = LPDetails