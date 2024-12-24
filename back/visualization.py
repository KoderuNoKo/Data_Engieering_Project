# for plotting graph
import matplotlib.pyplot as plt
import mplfinance as mpf

class Patterns:
    def __init__(self) -> None:
        pass
        
    def is_hammer(self, row):
        body = abs(row['close'] - row['open'])
        lower_shadow = row['open'] - row['low'] if row['close'] > row['open'] else row['close'] - row['low']
        upper_shadow = row['high'] - row['close'] if row['close'] > row['open'] else row['high'] - row['open']
        return lower_shadow > 2 * body and upper_shadow < body

    def is_engulfing(self, prev_row, curr_row):
        return (curr_row['close'] > curr_row['open'] and 
                prev_row['close'] < prev_row['open'] and 
                curr_row['close'] > prev_row['open'] and 
                curr_row['open'] < prev_row['close'])      
        
        
class Graph:
    def __init__(self) -> None:
        self.COLOR_SMA = 'blue'
        
        
    def plot_candlestick(self, stock_data):
        mpf.plot(
            stock_data,
            type='candle',
            volume=True,
            style='charles',
            title='Stock Price with indicators',
            ylabel='Price',
            ylabel_lower='Volume'
        )
                
        plt.legend()
        plt.show()
        
    
    def plot_candlestick_with_sma(self, stock_data, sma_data, num_period):
        add_plot = [
            mpf.make_addplot(sma_data, color=self.COLOR_SMA, label=f'{num_period}-period SMA')
        ]
        
        mpf.plot(
            data=stock_data,
            type='candle',
            style='charles',
            addplot=add_plot,
            volume=True,
            title='Stock Price with Simple Moving Average',
            ylabel='Price',
            ylabel_lower='Volume'
        )
        
    
    def plot_candlestick_with_multiple_sma(self, stock_data, multi_sma_data):
        add_plot = [
            mpf.make_addplot(sma, color=self.COLOR_SMA, width=0.5) for period, sma in multi_sma_data
        ]
        
        mpf.plot(
            data=stock_data,
            type='candle',
            style='charles',
            addplot=add_plot,
            volume=True,
            title='Stock price with multiple Simple Moving Average',
            ylabel='Price',
            ylabel_lower='Volume'
        )
    
    
    def plot_candlestick_with_pattern(self, stock_data):
        patt = Patterns()
        stock_data['Pattern'] = None
        stock_data['Hammer'] = None
        stock_data['Engulfing'] = None

        for i in range(1, len(stock_data)):
            if patt.is_hammer(stock_data.iloc[i]):
                stock_data.at[stock_data.index[i], 'Pattern'] = 'Hammer'
                stock_data.at[stock_data.index[i], 'Hammer'] = stock_data.iloc[i]['high'] * 1.01  # Slightly above the high for marker
            elif patt.is_engulfing(stock_data.iloc[i-1], stock_data.iloc[i]):
                stock_data.at[stock_data.index[i], 'Pattern'] = 'Bullish Engulfing'
                stock_data.at[stock_data.index[i], 'Engulfing'] = stock_data.iloc[i]['high'] * 1.01
                
        # Replace None values with NaN to prevent errors
        stock_data['Hammer'] = stock_data['Hammer'].astype(float)
        stock_data['Engulfing'] = stock_data['Engulfing'].astype(float)

        # Define custom markers for detected patterns
        hammer_markers = mpf.make_addplot(stock_data['Hammer'], type='scatter', markersize=100, marker='v', color='red')
        engulfing_markers = mpf.make_addplot(stock_data['Engulfing'], type='scatter', markersize=100, marker='^', color='blue')
        
        mpf.plot(
            stock_data,
            type='candle',
            style='charles',
            title='Candlestick Chart with Patterns',
            ylabel='Price',
            addplot=[hammer_markers, engulfing_markers],
            volume=True
        )
