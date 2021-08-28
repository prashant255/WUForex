const express = require('express')
const router = new express.Router
const allLPService = require('../service/AllLp')
const analyticsService = require('../service/AnalyticsData')
const CP1 = require('../models/CPdata')
const LPPredCount = require('../models/LPPredCount')

router.get('/checkCurrency/:currencyPair', async (req, res) => {
    if(currencyPair.includes(req.params.currencyPair))
        res.status(200).send("Available")
    else
        res.status(400).send("Currency pair not available")
})

router.get('/analytics/:currencyPair', async (req, res) => {
    try{
        datToSend = await analyticsService.getAnalytics(req.params.currencyPair)
        res.status(200).send(datToSend)
    }catch(e) {
        if(e == "Currency pair not available")
            res.status(400).send({"error": e})
        else{
            console.log(e)
            res.status(500).send({"error": e})
        }
    }
})

router.get('/predCount/:currencyPair', async (req, res) => {
    try {
        let predCount = await LPPredCount.find({currencyPair: req.params.currencyPair}, {
            'LPName': 1,
            'count': 1,
        })
        str = JSON.stringify(predCount);
        str = str.replace(/\"LPName\":/g, "\"label\":");
        str = str.replace(/\"count\":/g, "\"y\":");
        predCount = JSON.parse(str);
        console.log(predCount)
        res.status(200).send(predCount)
    } catch(e) {
        console.log(e)
        res.status(500).send({"error": e})
    }
})

router.get('/historicalData/:LPid/:currencyPair', async (req, res) => {
    try{
        CP = await CP1.findOne({currencyPair : req.params.currencyPair})
        res.status(200).send(CP.LP[req.params.LPid - 1].details)
    }
    catch(e) {
        res.status(500).send({"error" : e})
    }
})

router.get('/getAllDetails/:currencyPair', async (req, res) => {
    try{
        dataToSend = await allLPService.getDetails(req.params.currencyPair)
        res.status(200).send(dataToSend)
    } catch (e) {
        if(e == "Currency pair not available")
            res.status(400).send({"error": e})
        else{
            console.log(e)
            res.status(500).send({"error": e})
        }
    }   
})

module.exports = router