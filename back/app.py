from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from data import Stock, Indicators
from visualization import Graph
import io
import base64
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes (use for development purposes)

@app.route('/')
def index():
    return "Stock Analysis API"

@app.route('/api/stock_data', methods=['POST'])
def get_stock_data():
    """API route to get stock data and return it as JSON"""
    data = request.get_json()
    symbol = data.get('symbol')
    start_date = data.get('start_date')
    end_date = data.get('end_date')
    
    if not symbol or not start_date or not end_date:
        return jsonify({'error': 'Missing parameters'}), 400
    
    try:
        # Create an instance of Stock to retrieve data
        stock = Stock(symbol)
        stock_data = stock.get_stock_data(start_date, end_date)
        return jsonify(stock_data.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/indicators', methods=['POST'])
def get_indicators():
    """API route to get moving average or other indicators"""
    data = request.get_json()
    symbol = data.get('symbol')
    start_date = data.get('start_date')
    end_date = data.get('end_date')
    indicators = data.get('indicators', [])
    
    if not symbol or not start_date or not end_date:
        return jsonify({'error': 'Missing parameters'}), 400
    
    try:
        # Create an instance of Indicators to retrieve data
        indicators_data = {}
        indicator_obj = Indicators(symbol)

        if 'sma' in indicators:
            sma_data = indicator_obj.moving_avg(start_date, end_date)
            indicators_data['sma'] = sma_data.to_dict()
        
        # Add more indicators if needed (RSI, EMA, etc.)
        if 'rsi' in indicators:
            rsi_data = indicator_obj.relative_strength(start_date, end_date)
            indicators_data['rsi'] = rsi_data.to_dict()
        
        return jsonify(indicators_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/plot_candlestick', methods=['POST'])
def plot_candlestick():
    """API route to plot candlestick with indicators"""
    data = request.get_json()
    symbol = data.get('symbol')
    start_date = data.get('start_date')
    end_date = data.get('end_date')
    indicators = data.get('indicators', [])
    
    if not symbol or not start_date or not end_date:
        return jsonify({'error': 'Missing parameters'}), 400
    
    try:
        # Create an instance of Stock to retrieve data
        stock = Stock(symbol)
        stock_data = stock.get_stock_data(start_date, end_date)
        
        # Create an instance of Graph to generate the graph
        graph = Graph()
        img = io.BytesIO()  # In-memory binary stream to store image
        
        # If indicators were requested, apply them
        if 'sma' in indicators:
            sma_data = Indicators(symbol).moving_avg(start_date, end_date)
            graph.plot_candlestick_with_sma(stock_data, sma_data, 50)
        else:
            graph.plot_candlestick(stock_data)
        
        # Save the plot to the in-memory image buffer
        plt.savefig(img, format='png')
        img.seek(0)
        
        # Encode the image to base64 for sending as a response
        img_base64 = base64.b64encode(img.getvalue()).decode('utf-8')
        
        return jsonify({'image': img_base64})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)