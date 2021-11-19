from flask import Blueprint
from flask import Flask,request, jsonify, send_from_directory #pip install Flask
import psycopg2
from psycopg2.extras import RealDictCursor
from flask_cors import CORS #pip install flask-cors
import os
from random import SystemRandom
from werkzeug.utils import secure_filename

login_api = Blueprint('login_api', __name__)

def conexion():
    return psycopg2.connect(
    host="localhost",
    database="puntodeventa",
    user="postgres",
    password="root")

## ------------------------------------------------------------------------------ ##
## -----------------Verificacion del usuario en el login ------------------------ ##
## ------------------------------------------------------------------------------ ##

@login_api.route('/api/login', methods=['POST'])
def verifyLogin():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    data=request.json
    print(data)
    sql="SELECT a.nombreempleado as nombreempleado, c.nombrecargo as nombrecargo, b.idusuario as id FROM empleados a LEFT JOIN usuarios b ON a.idempleado=b.idempleado LEFT JOIN perfil c ON a.idcargo=c.idcargo WHERE b.usuario='{0}' AND b.contrasena='{1}'".format(data['username'],data['password'])
    cur.execute(sql)
    row = cur.fetchone()
    conn.close()
    if (row==None):
        return jsonify('0')
    access_token = create_access_token(identity=data['username'])
    row['access_token'] = access_token
    return jsonify(row)

## ------------------------------------------------------------------------------ ##
## ------------- Se rescata el email del usuario en el login -------------------- ##
## ------------------------------------------------------------------------------ ##

@login_api.route('/api/userEmail',  methods=['POST'])
def getEmailUser():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    data=request.json
    print(data)
    sql="SELECT a.emailempleado, a.nombreempleado,  b.contrasena FROM empleados a LEFT JOIN usuarios b ON b.idempleado=a.idempleado WHERE usuario= '{0}'".format(data['username'])
    cur.execute(sql)
    row = cur.fetchone()
    conn.close()
    if (row==None):
        return jsonify(0)
    return jsonify(row)