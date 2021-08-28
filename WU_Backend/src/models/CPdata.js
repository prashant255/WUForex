const mongoose = require('mongoose')

const CP1 = mongoose.model('CP1', {
  currencyPair : String,
  LP : [
        {
          id : Number,
          details : [ {
              open : Number,
              high : Number,
              low : Number,
              close : Number,
              timestamp : Number, 
            }
          ]
        }
      ]
})


module.exports = CP1
