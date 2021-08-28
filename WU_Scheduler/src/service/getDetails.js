const saveRecords = require('./saveRecords')
const axios = require('axios')
const HL = require('../models/highLow')
require('../constant')

getDetails = async(Currency, LP_id) => {
    if(LP_id === 6)
    {
        try{
            // console.log("doafter1 start")
            const url = 'https://financialmodelingprep.com/api/v3/historical-chart/1hour/' + Currency + '?apikey=ddf32757d09489eec56ec5459c71fc27'
            let response = await axios.get(url)
            //console.log(response.data[0])
            CP.LP[LP_id - 1].details.push({
            "high" : response.data[0].high, 
            "low" : response.data[0].low, 
            "open" :response.data[0].open, 
            "close" :response.data[0].close, 
            "timestamp": new Date(response.data[0].date).getTime()
            })
            const filter = {currencyPair : Currency, LPid : LP_id}
            let hldata = await HL.findOne({currencyPair : Currency, LPid : LP_id})
            if(hldata.dailyHigh === 0 || hldata.dailyLow === 0)
                await HL.findOneAndUpdate(filter, {dailyHigh : response.data[0].high, dailyLow : response.data[0].low})
            else{
                if(hldata.dailyHigh < response.data[0].high)
                    await HL.findOneAndUpdate(filter, {dailyHigh : response.data[0].high})
                if(hldata.dailyLow > response.data[0].low)
                    await HL.findOneAndUpdate(filter, {dailyLow : response.data[0].low})
            }
            
            if(hldata.weeklyHigh === 0 || hldata.weeklyLow === 0)
                await HL.findOneAndUpdate(filter, {weeklyHigh : response.data[0].high, weeklyLow : response.data[0].low})
            else{
                if(hldata.weeklyHigh < response.data[0].high)
                    await HL.findOneAndUpdate(filter, {weeklyHigh : response.data[0].high})
                if(hldata.weeklyLow > response.data[0].low)
                    await HL.findOneAndUpdate(filter, {weeklyLow : response.data[0].low})
            }
        }
        catch(e){
            console.log(e)
        }
    }

    if(LP_id === 7)
    {
        try{
            // new Date().getDay() === 7 && new Date().getUTCHours() <= 22 ) || (new Date().getDay() === 5 && new Date().getUTCHours() >= 21) || (new Date().getDay() === 6)

            let date = new Date().getUTCDate()
            let month = new Date().getUTCMonth()
            let year = new Date().getUTCFullYear()
            let hours = new Date().getUTCHours()
            // console.log(year)
            // console.log(month)
            // console.log(date)
            //console.log(hours)
            //console.log("doafter1 start")
            const url = "https://marketdata.tradermade.com/api/v1/hour_historical?currency=" + Currency + "&api_key=lG133MB8Hi06LQHoZKLW&date_time=" + year + "-" + month + "-" + date + "-" + hours + ":00"
            //console.log(url)
            let response = await axios.get(url)
            //console.log(new Date(response.data.request_time).getTime())
            //let arraylen = response.data.quotes.length
            //console.log(response.data.quotes[arraylen - 1])
            CP.LP[LP_id - 1].details.push({
                "high" : response.data.high, 
                "low" : response.data.low, 
                "open" :response.data.open, 
                "close" :response.data.close, 
                "timestamp": new Date(response.data.request_time).getTime()
            })
            const filter = {currencyPair : Currency, LPid : LP_id}
            let hldata = await HL.findOne({currencyPair : Currency, LPid : LP_id})
            if(hldata.dailyHigh === 0 || hldata.dailyLow === 0)
                await HL.findOneAndUpdate(filter, {dailyHigh : response.data.high, dailyLow : response.data.low})
            else{
                if(hldata.dailyHigh < response.data.high)
                    await HL.findOneAndUpdate(filter, {dailyHigh : response.data.high})
                if(hldata.dailyLow > response.data.low)
                    await HL.findOneAndUpdate(filter, {dailyLow : response.data.low})
            }
            
            if(hldata.weeklyHigh === 0 || hldata.weeklyLow === 0)
                await HL.findOneAndUpdate(filter, {weeklyHigh : response.data.high, weeklyLow : response.data.low})
            else{
                if(hldata.weeklyHigh < response.data.high)
                    await HL.findOneAndUpdate(filter, {weeklyHigh : response.data.high})
                if(hldata.weeklyLow > response.data.low)
                    await HL.findOneAndUpdate(filter, {weeklyLow : response.data.low})
            }
        }
        catch(e){
            // console.log("Unable to connect. Error!")
            console.log(e)
        }
    }

     if(LP_id < 6)
     {
         try{
            // console.log("doafter1 start")
            let currentDate = Math.trunc((new Date().getTime()) / 1000)
            let currentDateFrom = (currentDate - 3600)
            const url = "https://finnhub.io/api/v1/forex/candle?symbol="+ LP[LP_id-1][Currency] +"&resolution=60&from="+ currentDateFrom +"&to="+ currentDate +"&token=burtu3n48v6t07kpq5vg" 
            let response = await axios.get(url)
            let arraylen = response.data.t.length
            //console.log(response.data.quotes[arraylen - 1])
            // console.log(Currency)
            // console.log(LP_id)
            CP.LP[LP_id - 1].details.push({
              "high" : response.data.h[arraylen - 1], 
              "low" : response.data.l[arraylen - 1], 
              "open" :response.data.o[arraylen - 1], 
              "close" :response.data.c[arraylen - 1], 
              "timestamp": response.data.t[arraylen - 1]
           })
            const filter = {currencyPair : Currency, LPid : LP_id}
            let hldata = await HL.findOne({currencyPair : Currency, LPid : LP_id})
            if(hldata.dailyHigh === 0 || hldata.dailyLow === 0)
                await HL.findOneAndUpdate(filter, {dailyHigh : response.data.h[arraylen - 1], dailyLow : response.data.l[arraylen - 1]})
            else{
                if(hldata.dailyHigh < response.data.h[arraylen - 1])
                    await HL.findOneAndUpdate(filter, {dailyHigh : response.data.h[arraylen - 1]})
                if(hldata.dailyLow > response.data.l[arraylen - 1])
                    await HL.findOneAndUpdate(filter, {dailyLow : response.data.l[arraylen - 1]})
            }
            
            if(hldata.weeklyHigh === 0 || hldata.weeklyLow === 0)
                await HL.findOneAndUpdate(filter, {weeklyHigh : response.data.h[arraylen - 1], weeklyLow : response.data.l[arraylen - 1]})
            else{
                if(hldata.weeklyHigh < response.data.h[arraylen - 1])
                    await HL.findOneAndUpdate(filter, {weeklyHigh : response.data.h[arraylen - 1]})
                if(hldata.weeklyLow > response.data.l[arraylen - 1])
                    await HL.findOneAndUpdate(filter, {weeklyLow : response.data.l[arraylen - 1]})
            }
         }
         catch(e){
             console.log(e)
         } 
       
     }
    
    // console.log("doafter start")
    await saveRecords()
    // console.log("doafter end")      
}


module.exports = getDetails