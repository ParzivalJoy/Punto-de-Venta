from flask import Flask,request, jsonify, send_from_directory #pip install Flask
import psycopg2
from psycopg2.extras import RealDictCursor
from flask_cors import CORS #pip install flask-cors
import os
from random import SystemRandom
from werkzeug.utils import secure_filename
from Pos.Dashboard import dash_api
from Pos.Ventas import ventas_api
from Pos.Configuracion import config_api
from Pos.Contabilidad import conta_api
from Pos.Empleados import empleado_api
from Pos.Inventarios import inv_api
from Pos.Login import login_api

#JWT libraries
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app)

def conexion():
    return psycopg2.connect(
    host="localhost",
    database="puntodeventa",
    user="postgres",
    password="root")

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "dsankldqwp2310953nc812245" 
jwt = JWTManager(app)


os.makedirs(os.path.join(app.instance_path, 'uploads'), exist_ok=True)
IMAGE_FOLDER= os.path.join(app.instance_path, 'uploads')

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

##------------------Blueprints------------------------##
app.register_blueprint(dash_api)
app.register_blueprint(ventas_api)
app.register_blueprint(config_api)
app.register_blueprint(conta_api)
app.register_blueprint(empleado_api)
app.register_blueprint(inv_api)
app.register_blueprint(login_api)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


#python3 -m venv venv
#activar entorno virtual
#venv\Scripts\activate
