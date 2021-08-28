import sys
import pandas as pd
import numpy as np
import matplotlib
import matplotlib.pyplot as plt
plt.style.use('seaborn-whitegrid')
import sklearn

from pymongo import MongoClient
client = MongoClient('mongodb://localhost:27017/')
client.list_database_names()
db = client["LP-database"]
LP_predict_collection = db["lp_prediction"]
LP_predict_collection.remove({})

contracts  = 10000.0
count=1
def calc_profit(row):
    if row['won']:
        return abs(row['return'])*contracts
    else:
        return -abs(row['return'])*contracts

def predictBestLP(df, lpid):
    global count
    df['return'] = df['Ohlc'] - df['Ohlc'].shift(1)
    return_range = df['return'].max() - df['return'].min()
    df['return'] = df['return'] / return_range
    df['label'] = df['return'].shift(-1)
    df['label'] = df['label'].apply(lambda x: 1 if x>0.0 else 0)
    df['return'].fillna((df['return'].mean()), inplace = True) 
    n_features = 60 # number of features
    train_x = np.array([]).reshape([-1,n_features])
    train_y = np.array([]).reshape([-1,1])
    for index, row in df.iterrows():
        i = df.index.get_loc(index)
        if i<n_features:
            continue
    
        _x = np.array(df[i-n_features+1:i+1]['return']).T.reshape([1, -1])
        _y = df.iloc[i]['label']
        train_x = np.vstack((train_x, _x))
        train_y = np.vstack((train_y, _y))
    train_y = train_y.reshape([-1])
    print(train_x.shape)
    print(train_y.shape)
    print('%% of Class0 : %f' % (np.count_nonzero(train_y == 0)/float(len(train_y))))
    print('%% of Class1 : %f' % (np.count_nonzero(train_y == 1)/float(len(train_y))))
    from sklearn.neighbors import KNeighborsClassifier 
    knn = KNeighborsClassifier(n_neighbors=3) 
    knn.fit(train_x,train_y) 
    train_len = int(len(train_x)*0.80)
    accuracy = knn.score(train_x[train_len:], train_y[train_len:])
    print('Training Accuracy: %f' % accuracy)
    test_len = int(len(train_x)*0.20)
    accuracy = knn.score(train_x[:test_len], train_y[:test_len])
    print('Testing Accuracy: %f' % accuracy)
    pred = knn.predict(train_x[train_len:])
    df_trade = pd.DataFrame(train_x[train_len:,-1], columns=['return'])
    df_trade['label']  = train_y[train_len:]
    df_trade['pred']   = pred
    df_trade['won']    = df_trade['label'] == df_trade['pred']
    df_trade['return'] = df_trade['return'].shift(-1) * return_range
    df_trade.drop(df_trade.index[len(df_trade)-1], inplace=True)
    df_trade['pnl'] = df_trade.apply(lambda row: calc_profit(row), axis=1)
    df_trade['equity'] = df_trade['pnl'].cumsum()

    n_win_trades = float(df_trade[df_trade['pnl']>0.0]['pnl'].count())
    n_los_trades = float(df_trade[df_trade['pnl']<0.0]['pnl'].count())
    print("Net Profit            : $%.2f" % df_trade.tail(1)['equity'])
    netProfit=int(df_trade.tail(1)['equity'])
    print("Number Winning Trades : %d" % n_win_trades)
    print("Number Losing Trades  : %d" % n_los_trades)
    print("Percent Profitable    : %.2f%%" % (100*n_win_trades/(n_win_trades + n_los_trades)))
    print("Avg Win Trade         : $%.3f" % df_trade[df_trade['pnl']>0.0]['pnl'].mean())
    print("Avg Loss Trade         : $%.3f" % df_trade[df_trade['pnl']<0.0]['pnl'].mean())
    print("Largest Win Trade     : $%.3f" % df_trade[df_trade['pnl']>0.0]['pnl'].max())
    print("Largest Loss Trade     : $%.3f" % df_trade[df_trade['pnl']<0.0]['pnl'].min())
    print("Profit Factor         : %.2f" % abs(df_trade[df_trade['pnl']>0.0]['pnl'].sum()/df_trade[df_trade['pnl']<0.0]['pnl'].sum()))
    LP_predict_collection.insert_one({"currencyPair":df['currencyPair'].iloc[0],"LP_id":lpid,"PercentProfitable":(100*n_win_trades/(n_win_trades + n_los_trades)),"ProfitFactor":abs(df_trade[df_trade['pnl']>0.0]['pnl'].sum()/df_trade[df_trade['pnl']<0.0]['pnl'].sum()),"NetProfit":netProfit})
    count=count+1

def performPred(df):
    LP1=df.loc[df['LP_id'] == 1]  
    LP2=df.loc[df['LP_id'] == 2]
    LP3=df.loc[df['LP_id'] == 3]  
    LP4=df.loc[df['LP_id'] == 4]
    LP5=df.loc[df['LP_id'] == 5]  
    LP6=df.loc[df['LP_id'] == 6]
    LP7=df.loc[df['LP_id'] == 7]
    predictBestLP(LP1, 1)
    predictBestLP(LP2, 2)
    predictBestLP(LP3, 3)
    predictBestLP(LP4, 4)
    predictBestLP(LP5, 5)
    predictBestLP(LP6, 6)
    predictBestLP(LP7, 7)
    
    recommendation = db["lp_pred_count"]
    x=LP_predict_collection.find_one({'currencyPair':df['currencyPair'].iloc[0]},sort=[("ProfitFactor", -1)])['LP_id']
    counter=recommendation.find_one({"currencyPair":df['currencyPair'].iloc[0],"LPid":x})['count']
    myquery= { "LPid": x,'currencyPair':df['currencyPair'].iloc[0] }
    newvalues = { "$set": { "count": counter+1 } }
    recommendation.update_one(myquery, newvalues)

collection = db["cp1"]
pipeline = [
    {"$unwind":{'path': '$LP', 'preserveNullAndEmptyArrays': True}},
    {"$unwind":{'path': '$LP.details', 'preserveNullAndEmptyArrays': True}},
    {'$project':{
      'id':'$id','LP_id':"$LP.id",'currencyPair':'$currencyPair','timestamp':"$LP.details.timestamp",'open':"$LP.details.open",'close':"$LP.details.close",'high':"$LP.details.high",
        'low':"$LP.details.low"
    }}
]

df = pd.DataFrame() 

query_result = collection.aggregate(pipeline)
query_result = list(query_result)
df = pd.io.json.json_normalize(query_result)
df.drop('_id', axis=1, inplace=True)

df = df.dropna(axis = 0, how ='any') 

df['Ohlc'] =(df['low'] + df['high'] + df['open'] + df['close'])/4

#for all currency pair

EURGBP=df.loc[df['currencyPair'] == "EURGBP"]
USDJPY=df.loc[df['currencyPair'] == "USDJPY"]
USDCHF=df.loc[df['currencyPair'] == "USDCHF"]
EURUSD=df.loc[df['currencyPair'] == "EURUSD"]
EURAUD=df.loc[df['currencyPair'] == "EURAUD"]
GBPAUD=df.loc[df['currencyPair'] == "GBPAUD"]
GBPCAD=df.loc[df['currencyPair'] == "GBPCAD"]
NZDJPY=df.loc[df['currencyPair'] == "NZDJPY"]
NZDUSD=df.loc[df['currencyPair'] == "NZDUSD"]
EURJPY=df.loc[df['currencyPair'] == "EURJPY"]
performPred(EURGBP)
performPred(USDJPY)
performPred(USDCHF)
performPred(EURUSD)
performPred(EURAUD)
performPred(GBPAUD)
performPred(GBPCAD)
performPred(NZDJPY)
performPred(NZDUSD)
performPred(EURJPY)