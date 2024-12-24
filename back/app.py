from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
from data import Stock

app = Flask(__name__)
CORS(app)

@app.route('/api/stock/<symbol>', methods=['GET'])
def get_stock_data(symbol):
    try:
        stock = Stock(symbol)
        end_date = datetime.now().strftime('%Y-%m-%d')
        start_date = (datetime.now() - timedelta(days=365)).strftime('%Y-%m-%d')
        stock_data = stock.get_stock_data(start_date, end_date)

        latest_data = stock_data.iloc[-1]
        previous_data = stock_data.iloc[-2]
        price_change = latest_data['close'] - previous_data['close']
        price_change_percent = (price_change / previous_data['close']) * 100
        
        response = {
            'symbol': symbol,
            'latest_price': round(latest_data['close'], 2),
            'price_change': round(price_change, 2),
            'price_change_percent': round(price_change_percent, 2),
            'latest_date': stock_data.index[-1].strftime('%Y-%m-%d')
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
