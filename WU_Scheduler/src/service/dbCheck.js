const getDetails = require('./getDetails')
const CP1 = require('../models/CPdata')
const mongoose = require('mongoose')

dbCheck = async(Currency, LP_id) => {

    // console.log("mainfun start")
    // console.log("2")
    
    CP = await CP1.findOne({currencyPair : Currency})
    console.log(CP)    
      if(!CP)
      {
          CP = new CP1       
          CP.currencyPair = Currency
            
          const details = []
      
          CP.LP.push({id : 1, details : details}, {id : 2, details : details}, {id : 3, details : details}, {id : 4, details : details}, {id : 5, details : details}
            , {id : 6, details : details}, {id : 7, details : details})
          
      }
    await getDetails(Currency, LP_id)
    // console.log("mainfun end")
  }

module.exports = dbCheck