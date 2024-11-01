# sre-backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app) 

db_config = {
    'user': 'mguellil',
    'password': 'Mostafa@2024',
    'host': 'localhost',
    'database': 'sre-database'
}

@app.route('/api/data', methods=['GET'])
def get_data():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM VIP")

    data = cursor.fetchall()
    cursor.close()
    conn.close()
    
    return jsonify(data)

if __name__ == '__main__':
    app.run(port=5000)
