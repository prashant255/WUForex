//const CP1 = require('../models/CPdata')
//const constant = require('../constant')
const axios = require('axios')
const cron = require('node-cron')
//const index = require('./index')

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/LP-database', {
    useCreateIndex : true,
    useNewUrlParser : true
})

console.log('mongoose model created')


currencyPairArray = [
    "EURUSD",
    "EURGBP",
    "USDJPY",
    "USDCHF",
    "EURAUD",
    "GBPAUD", 
    "GBPCAD",
    "NZDJPY",
    "NZDUSD",
    "EURJPY"
  ]
  
  
  LP = []
  
  LP[0] = {
      "name": "Oanda",
      "id": 1,
      "EURUSD": "OANDA:EUR_USD",
      "EURGBP": "OANDA:EUR_GBP",
      "USDJPY": "OANDA:USD_JPY",
      "USDCHF": "OANDA:USD_CHF",
      "EURAUD": "OANDA:EUR_AUD",
      "GBPAUD": "OANDA:GBP_AUD",
      "GBPCAD": "OANDA:GBP_CAD",
      "NZDJPY": "OANDA:NZD_JPY",
      "NZDUSD": "OANDA:NZD_USD",
      "EURJPY": "OANDA:EUR_JPY"
  }
  
  LP[1] = {
      "name": "Octafx",
      "id": 2,
      "EURUSD": "OCTAFX:1",
      "EURGBP": "OCTAFX:9",
      "USDJPY": "OCTAFX:4",
      "USDCHF": "OCTAFX:6",
      "EURAUD": "OCTAFX:14",
      "GBPAUD": "OCTAFX:16",
      "GBPCAD": "OCTAFX:19",
      "NZDJPY": "OCTAFX:21",
      "NZDUSD": "OCTAFX:12",
      "EURJPY": "OCTAFX:3"
  }
  
  LP[2] = {
      "name": "Pepperstone",
      "id": 3,
      "EURUSD": "PEPPERSTONE:1",
      "EURGBP": "PEPPERSTONE:9",
      "USDJPY": "PEPPERSTONE:4",
      "USDCHF": "PEPPERSTONE:6",
      "EURAUD": "PEPPERSTONE:14",
      "GBPAUD": "PEPPERSTONE:16",
      "GBPCAD": "PEPPERSTONE:19",
      "NZDJPY": "PEPPERSTONE:21",
      "NZDUSD": "PEPPERSTONE:12",
      "EURJPY": "PEPPERSTONE:3",
  }
  
  LP[3] = {
      "name": "Fxpig",
      "id": 4,
      "EURUSD": "FXPIG:1",
      "EURGBP": "FXPIG:9",
      "USDJPY": "FXPIG:4",
      "USDCHF": "FXPIG:6",
      "EURAUD": "FXPIG:14",
      "GBPAUD": "FXPIG:16",
      "GBPCAD": "FXPIG:19",
      "NZDJPY": "FXPIG:21",
      "NZDUSD": "FXPIG:12",
      "EURJPY": "FXPIG:3",
  }
  
  LP[4] = {
      "name": "Icm Trader",
      "id": 5,
      "EURUSD": "ICMTRADER:1",
      "EURGBP": "ICMTRADER:9",
      "USDJPY": "ICMTRADER:4",
      "USDCHF": "ICMTRADER:6",
      "EURAUD": "ICMTRADER:14",
      "GBPAUD": "ICMTRADER:16",
      "GBPCAD": "ICMTRADER:19",
      "NZDJPY": "ICMTRADER:21",
      "NZDUSD": "ICMTRADER:12",
      "EURJPY": "ICMTRADER:3",
  }

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


//cron.schedule("*/3 * * * * *", () => {
    saveRecords = async () => {
        await CP.save()
        console.log(CP)
      }  
    
    getDetails = async(Currency, LP_id) => {
        if(LP_id === 6)
        {
    
            console.log("doafter1 start")
            const url = 'https://financialmodelingprep.com/api/v3/historical-chart/1hour/' + Currency + '?apikey=ddf32757d09489eec56ec5459c71fc27'
            let response = await axios.get(url)
            //console.log(response.data[0])
            let arrayLength = response.data.length

            for(let i = arrayLength - 1; i >= 0; i--)
            {
                console.log(response.data[i])
                CP.LP[LP_id - 1].details.push({
                    "high" : response.data[i].high, 
                    "low" : response.data[i].low, 
                    "open" :response.data[i].open, 
                    "close" :response.data[i].close, 
                    "timestamp": new Date(response.data[i].date).getTime()
                })
            }
            
        }
    
        if(LP_id === 7)
        {
          console.log("doafter1 start")
          const url = 'https://marketdata.tradermade.com/api/v1/timeseries?currency=' + Currency + '&api_key=lG133MB8Hi06LQHoZKLW&start_date=2020-9-27-20:00&end_date=2020-11-26-20:00&format=records&interval=hourly'
          let response = await axios.get(url)
          let arraylen = response.data.quotes.length
          //console.log(response.data.quotes[arraylen - 1])

          for(let i = 0; i < arraylen; i++)
          {
                CP.LP[LP_id - 1].details.push({
                    "high" : response.data.quotes[i].high, 
                    "low" : response.data.quotes[i].low, 
                    "open" :response.data.quotes[i].open, 
                    "close" :response.data.quotes[i].close, 
                    "timestamp": new Date(response.data.quotes[i].date).getTime()
        
                })
          }
          
        }
    
         if(LP_id < 6)
         {
              console.log("doafter1 start")
              let currentDate = + new Date(1606420726)
              let currentDateFrom = 1600848000
              const url = "https://finnhub.io/api/v1/forex/candle?symbol="+ LP[LP_id-1][Currency] +"&resolution=60&from="+ currentDateFrom +"&to="+ currentDate +"&token=buuae9v48v6pr1lt4kp0" 
              let response = await axios.get(url)
              let arraylen = response.data.t.length
              //console.log(response.data.quotes[arraylen - 1])

              for(let i = 0; i < arraylen; i++)
              {
                    CP.LP[LP_id - 1].details.push({ 
                        "high" : response.data.h[i], 
                        "low" : response.data.l[i], 
                        "open" :response.data.o[i], 
                        "close" :response.data.c[i], 
                        "timestamp": response.data.t[i]
                    })
              }
              
           
         }
        
        console.log("doafter start")
        await saveRecords()
        console.log("doafter end")      
    
    
    }


    dbCheck = async(Currency, LP_id) => {

        console.log("mainfun start")
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
        console.log("mainfun end")
      }


      finhubLPs = async(Currency) => {
        console.log("Finhub start")
      
        for(let lpindex = 0; lpindex < 5; lpindex++)
        {
          let LP_id = (lpindex + 1);
          await dbCheck(Currency, LP_id)
        }
      }


    index = async() => {
    
        for(let currency = 0; currency < 10; currency++)
        {
            let LP_id = 6;
            console.log("start")
            await dbCheck(currencyPairArray[currency], LP_id)
            console.log("end")
        }
    
        for(let currency = 0; currency < 10; currency++)
        {
            let LP_id = 7;
            console.log("startLP2")
            await dbCheck(currencyPairArray[currency], LP_id)
            console.log("endLP2")
        }
    
        for(let currency = 0; currency < 10; currency++)
        {
            console.log("startLPFinhub currency loop")
            await finhubLPs(currencyPairArray[currency])
            console.log("endLPfinhub currency loop")
        }
    }


index()
  
   
//})



