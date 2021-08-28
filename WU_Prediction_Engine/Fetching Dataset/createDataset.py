import requests
import csv
srno = 1
header = ["Sr No", "LP Name", "Timestamp", "Open", "Close", "High", "Low", "Volume"]

Oanda = {
    "name": "Oanda",
    "token": "bumdqon48v6qvm5cars0",
    "time": "60",
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

Octafx = {
    "name": "Octafx",
    "token": "bumdqon48v6qvm5cars0",
    "time": "60",
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

Fxpig = {
    "name": "Fxpig",
    "token": "bumdqon48v6qvm5cars0",
    "time": "60",
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

Fxpro    = {
    "name": "Fxpro",
    "token": "bumdqon48v6qvm5cars0",
    "time": "60",
    "EURUSD": "FXPRO:1",
    "EURGBP": "FXPRO:9",
    "USDJPY": "FXPRO:4",
    "USDCHF": "FXPRO:6",
    "EURAUD": "FXPRO:14",
    "GBPAUD": "FXPRO:16",
    "GBPCAD": "FXPRO:1040",
    "NZDJPY": "FXPRO:1046",
    "NZDUSD": "FXPRO:12",
    "EURJPY": "FXPRO:3",
}

Pepperstone = {
    "name": "Pepperstone",
    "token": "bumdqon48v6qvm5cars0",
    "time": "60",
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

ICMarkets = {
    "name": "IC Markets",
    "token": "bumdqon48v6qvm5cars0",
    "time": "60",
    "EURUSD": "IC MARKETS:1",
    "EURGBP": "IC MARKETS:9",
    "USDJPY": "IC MARKETS:4",
    "USDCHF": "IC MARKETS:6",
    "EURAUD": "IC MARKETS:14",
    "GBPAUD": "IC MARKETS:16",
    "GBPCAD": "IC MARKETS:19",
    "NZDJPY": "IC MARKETS:21",
    "NZDUSD": "IC MARKETS:12",
    "EURJPY": "IC MARKETS:3",
}

Icmtrader = {
    "name": "Icm Trader",
    "token": "bumdqon48v6qvm5cars0",
    "time": "60",
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

currencyPair = [
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

LP = [
    Oanda,
    Octafx,
    Fxpig,
    Fxpro,
    Pepperstone,
    ICMarkets,
    Icmtrader
]

# USDEUR = {
#     Oanda: "OANDA:EUR_USD"
# }

#For Commerzbank AG (Financial Modelling Prep)
# for cp in currencyPair:
#     response = requests.get("https://financialmodelingprep.com/api/v3/historical-chart/"+ historicalTime["Commerzbank AG"] +"/"+ cp +"?apikey="+APIS["Commerzbank AG"])
#     c = csv.writer(open(cp+".csv", "w"), lineterminator="\n")
#     c.writerow(header)
#     for r in response.json():
#         c.writerow([srno, r["date"], "Commerzbank AG", r["open"], r["close"], r["high"], r["low"], r["volume"]])
#         srno+=1

#For Oanda(hinnhub.com)
for cp in currencyPair:
    srno = 1
    c = csv.writer(open(cp+".csv", "w"), lineterminator="\n")
    c.writerow(header)
    for lp in LP:
        response = requests.get("https://finnhub.io/api/v1/forex/candle?symbol=" + lp[cp] + "&resolution=" + lp["time"] + "&from=1585699200&to=1605266970&token="+lp["token"])
        rj = response.json()
        countRj = len(rj['c'])
        srnoList = []
        for sr in range (srno, srno+countRj):
            srnoList.append(sr)
        srno = srno+countRj
        l=[srnoList]
        l.append([lp["name"]]*len(rj['c']))
        l.append(rj['t'])
        l.append(rj['o'])
        l.append(rj['c'])
        l.append(rj['h'])
        l.append(rj['l'])
        l.append(rj['v']) 
        t_matrix = zip(*l) 
        for row in t_matrix: 
            c.writerow(row) 
        # c.writerow(["Oanda"] * len(rj['c']))
    # c.writerow(rj['c'])
        # c.writerow([srno, r["date"], "Commerzbank AG", r["open"], r["close"], r["high"], r["low"], r["volume"]])
        # srno+=1