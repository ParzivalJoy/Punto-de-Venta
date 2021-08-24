import posix
from flask import Flask, render_template
from flask_cors import CORS
from dotenv import load_dotenv
import psycopg2
import os

#PostgreSQL Database credentials loaded from the .env file
DATABASE = os.getenv('DATABASE')
DATABASE_USERNAME = os.getenv('DATABASE_USERNAME')
DATABASE_PASSWORD = os.getenv('DATABSE_PASSWORD')

app = Flask(__name__)

#CORS implemented
CORS(app) 

try:
    con = psycopg2.connect(
        database=DATABASE,
        user=DATABASE_USERNAME,
        password = DATABASE_PASSWORD)

    cur = con.cursor()

except:
    print('Error')

@app.route('/')
def index():
    return render_template("index.html") 

if __name__ == "__main__":
    app.run(debug=True)

