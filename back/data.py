# for stock data
from alpha_vantage.timeseries import TimeSeries # for retrieving timeseries data
from alpha_vantage.techindicators import TechIndicators # for retrieving indicators data
import pandas as pd

api_key = ''
with open('api_key.txt', mode='r') as f:
    api_key = f.read()
    
LOCAL_TZ = 'Asia/Ho_Chi_Minh'
# TODO: apply recommended number of period
PERIOD_NUM = 50 # default number of period for calculating


class Stock:
    """Class for retrieving stock data"""
    def __init__(self, symbol: str):
        # obtaining live data from API for now, maybe replaced with database query later
        try:
            self.ts = TimeSeries(key=api_key, output_format='pandas')
            self.data, self.metadata = self.ts.get_daily(symbol=symbol, outputsize='full')
            self.data.sort_index(inplace=True)
            self.data.columns = ['open', 'high', 'low', 'close', 'volume']
        except Exception:
            self.data = pd.read_csv('stock_data.csv')
        

    @property
    def datainfo(self):
        return self.metadata
    
    
    def get_stock_data(self, startdate, enddate):
        return self.data.loc[startdate:enddate]
    
    
    def __del__(self):
        self.data.to_csv('stock_data.csv')
    
    
class Indicators:
    """class for retrieving indicators data"""
    def __init__(self, symbol: str) -> None:
        # obtaining data from API for now, maybe replaced with database query later
        self.ti = TechIndicators(key=api_key, output_format='pandas')
        self.symbol = symbol
                
        
    def moving_avg(self, startdate, enddate, time_period=PERIOD_NUM, series_type='close'):
        self.sma, temp = self.ti.get_sma(self.symbol, 'daily', time_period, series_type)
        self.sma.index = pd.to_datetime(self.sma.index)
        self.sma.sort_index(inplace=True)
        return self.sma.loc[startdate:enddate]
    
    
    def multi_moving_avg(self, startdate, enddate, time_periods: list, series_type='close'):
        self.multi_sma = [(period, self.ti.get_sma(self.symbol, 'daily', period, series_type)[0]) for period in time_periods]
        for period, sma in self.multi_sma:
            sma.index = pd.to_datetime(sma.index)
            sma.sort_index(inplace=True)
        return [(period, sma.loc[startdate:enddate]) for period, sma in self.multi_sma]
    
    
    def expo_moving_avg(self, startdate, enddate, time_period=PERIOD_NUM, series_type='close'):
        self.ema, temp = self.ti.get_ema(self.symbol, 'daily', time_period, series_type)
        self.ema.index = pd.to_datetime(self.ema.index)
        self.ema.sort_index(inplace=True)
        
        return self.sma.loc[startdate:enddate]    
    
    
    # def moving_avg_conv_div(self, startdate, enddate, 
    #                         fast_period: int = 12, slow_period: int = 26, signal_period: int = 9,
    #                         series_type='close'):
    #     if not hasattr(self, 'macd'):
    #         self.macd, temp = self.ti.get_macd(self.symbol, 'daily', series_type, fast_period, slow_period, signal_period)
    #         self.macd.index = pd.to_datetime(self.macd.index)
    #         self.macd.sort_index(inplace=True)
            
    #     return self.macd.loc[startdate:enddate]
    
    
    def relative_strength(self, startdate, enddate, time_period=PERIOD_NUM, series_type='close'):
        self.rsi, temp = self.ti.get_rsi(self.symbol, 'daily', time_period, series_type)
        self.rsi.index = pd.to_datetime(self.rsi.index)
        self.rsi.sort_index(inplace=True)
            
        return self.rsi.loc[startdate:enddate]
    
    
    def bollinger_bands(self, startdate, enddate, time_period=PERIOD_NUM, series_type='close', nbdev=(2,2), ma_type='simple'):
        ma_dict = {'simple': 1, 'expo': 2}
        self.bbands, temp = self.ti.get_bbands(self.symbol, 'daily', time_period, series_type, nbdev[0], nbdev[1], ma_dict[ma_type])
        self.bbands.index = pd.to_datetime(self.bbands.index)
        self.bbands.sort_index(inplace=True)
        
            
        return self.rsi.loc[startdate:enddate] 