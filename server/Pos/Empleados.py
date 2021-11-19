from flask import Blueprint
from flask import Flask,request, jsonify, send_from_directory #pip install Flask
import psycopg2
from psycopg2.extras import RealDictCursor
from flask_cors import CORS #pip install flask-cors
import os
from random import SystemRandom
from werkzeug.utils import secure_filename

empleado_api = Blueprint('empleado_api', __name__)

def conexion():
    return psycopg2.connect(
    host="localhost",
    database="puntodeventa",
    user="postgres",
    password="root")

## ------------------------------------------------------------------------------ ##
## -----------------Lista de empleados registrados en el sistema----------------- ##
## ------------------------------------------------------------------------------ ##

@empleado_api.route('/api',  methods=['GET'])
def index():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT idempleado, nombreempleado, to_char(fechacontra, 'DD/MM/YYYY') as fechacontra, dirempleado, telempleado, emailempleado FROM empleados ORDER BY idempleado")
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@empleado_api.route('/api/<idempleado>',  methods=['GET'])
def getEmployee(idempleado):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT nombreempleado, dirempleado, telempleado, emailempleado FROM empleados  WHERE idempleado = {0}".format(idempleado)
    cur.execute(sql, idempleado) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@empleado_api.route('/api', methods=['POST'])
def saveEmployee():
    conn = conexion()
    cur = conn.cursor()
    data = request.json
    sql = """INSERT INTO empleados (nombreempleado, fechacontra, dirempleado,telempleado, emailempleado, idcargo )
                VALUES (%(nombreempleado)s,%(fechacontra)s, %(dirempleado)s, %(telempleado)s, %(emailempleado)s,NULL)"""
    cur.execute(sql, data) 
    #Genera contraseña
    longitud = 8
    valores = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    cryptogen = SystemRandom()
    contrasena = ""
    while longitud > 0:
        contrasena = contrasena + cryptogen.choice(valores)
        longitud = longitud - 1
    sql2 = "INSERT INTO usuarios (usuario, contrasena) VALUES ('{0}','{1}') RETURNING idusuario".format(data['nombreempleado'],contrasena)
    cur.execute(sql2)
    idusuario= cur.fetchone()
    for i in range(8):
        if( i+1!=1 and i+1!=3 and i+1!=7):
            sql3 = "INSERT INTO permisosusuarios (idpermiso, idusuario, acceso) VALUES ({0},{1},'{2}')".format(i+1,idusuario[0],'t')
            cur.execute(sql3)
        else:
            sql3 = "INSERT INTO permisosusuarios (idpermiso, idusuario, acceso) VALUES ({0},{1},'{2}')".format(i+1,idusuario[0],'f')
            cur.execute(sql3)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='added successfully!')

@empleado_api.route('/api/<idempleado>', methods=['DELETE'])
def deleteEmployee(idempleado):
    conn = conexion()
    cur = conn.cursor()
    sql = "DELETE FROM empleados WHERE idempleado = {0}".format(idempleado)
    cur.execute(sql, idempleado) 
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg="employee eliminated") 

@empleado_api.route('/api', methods=['PUT'])
def updateEmployee():
    conn = conexion()
    cur = conn.cursor()
    data = request.json
    sql = "UPDATE empleados SET nombreempleado=%(nombreempleado)s, dirempleado=%(dirempleado)s,telempleado=%(telempleado)s, emailempleado=%(emailempleado)s WHERE idempleado=%(idempleado)s"
    cur.execute(sql,data) 
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg="employee updated") 