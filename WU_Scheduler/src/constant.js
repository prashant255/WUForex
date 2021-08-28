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

  module.exports = [LP, currencyPairArray]
  