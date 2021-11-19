from flask import Blueprint
from flask import Flask,request, jsonify, send_from_directory #pip install Flask
import psycopg2
from psycopg2.extras import RealDictCursor
from flask_cors import CORS #pip install flask-cors
import os
from random import SystemRandom
from werkzeug.utils import secure_filename

def conexion():
    return psycopg2.connect(
    host="localhost",
    database="puntodeventa",
    user="postgres",
    password="root")

config_api = Blueprint('config_api', __name__)

## ------------------------------------------------------------------------------ ##
## ---------------Configuración del Tema, Logo y Colores------------------------- ##
## ------------------------------------------------------------------------------ ##

@config_api.route('/configuracion/editTema', methods=['PUT'])
def editionTema():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""UPDATE temas SET modo=%(estiloactivo1)s, color=%(temaescogido)s,logo=%(nombreempresa)s WHERE idtema=1"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='tema editado de manera satisfactoria!');

@config_api.route('/configuracion/getTemasEs',  methods=['GET'])
def getTema():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT * FROM temas WHERE idtema=1"
    cur.execute(sql) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)


## ------------------------------------------------------------------------------ ##
## -------------Configuración de los permisos de los empleados------------------- ##
## ------------------------------------------------------------------------------ ##

@config_api.route('/configuracion/editPermisoEmpleados', methods=['PUT'])
def editPermisoEmp():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""UPDATE permisosusuarios SET acceso=%(permisoempleados)s WHERE idusuario=%(idusuario)s AND idpermiso=1"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='bien');

@config_api.route('/configuracion/editPermisoInventarios', methods=['PUT'])
def editPermisoInv():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""UPDATE permisosusuarios SET acceso=%(permisoinventarios)s WHERE idusuario=%(idusuario)s AND idpermiso=2"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='bien');

@config_api.route('/configuracion/editPermisoConfiguracion', methods=['PUT'])
def editPermisoCon():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""UPDATE permisosusuarios SET acceso=%(permisoconfiguracion)s WHERE idusuario=%(idusuario)s AND idpermiso=3"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='bien');

@config_api.route('/configuracion/editPermisoGestor', methods=['PUT'])
def editPermisoGes():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""UPDATE permisosusuarios SET acceso=%(permisogestor)s WHERE idusuario=%(idusuario)s AND idpermiso=4"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='bien');

@config_api.route('/configuracion/editPermisoProductos', methods=['PUT'])
def editPermisoPro():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""UPDATE permisosusuarios SET acceso=%(permisoproductos)s WHERE idusuario=%(idusuario)s AND idpermiso=5"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='bien');

@config_api.route('/configuracion/editPermisoVentas', methods=['PUT'])
def editPermisoVen():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""UPDATE permisosusuarios SET acceso=%(permisoventas)s WHERE idusuario=%(idusuario)s AND idpermiso=6"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='bien');

@config_api.route('/configuracion/editPermisoContabilidad', methods=['PUT'])
def editPermisoConta():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""UPDATE permisosusuarios SET acceso=%(permisocontabilidad)s WHERE idusuario=%(idusuario)s AND idpermiso=7"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='bien');

## ------------------------------------------------------------------------------ ##
## --------------Obtención de los datos de los empleados------------------------- ##
## ------------------------------------------------------------------------------ ##

@config_api.route('/configuracion/getEmpleados',  methods=['GET'])
def getTEmpleados():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT idempleado,nombreempleado FROM empleados"
    cur.execute(sql) 
    row = cur.fetchall()
    conn.close()
    return jsonify(row)

@config_api.route('/configuracion/getIdusuario/<idempleado>',  methods=['GET'])
def getTUsuario(idempleado):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT idusuario FROM usuarios WHERE idempleado={0}".format(idempleado)
    cur.execute(sql) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@config_api.route('/configuracion/getPermisos/<userid>',  methods=['GET'])
def getTPermisos(userid):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT idpermiso, acceso FROM permisosusuarios WHERE idusuario={0}".format(userid)
    cur.execute(sql) 
    row = cur.fetchall()
    conn.close()
    return jsonify(row)
