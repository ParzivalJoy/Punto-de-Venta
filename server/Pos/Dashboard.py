from flask import Blueprint
from flask import Flask,request, jsonify, send_from_directory #pip install Flask
import psycopg2
from psycopg2.extras import RealDictCursor
from flask_cors import CORS #pip install flask-cors
import os
from random import SystemRandom
from werkzeug.utils import secure_filename

dash_api = Blueprint('dash_api', __name__)

def conexion():
    return psycopg2.connect(
    host="localhost",
    database="puntodeventa",
    user="postgres",
    password="root")


## --------------------------------------------------------- ##
## ----------------Gráfica de ventas anual ----------------- ##
## --------------------------------------------------------- ##

@dash_api.route('/api/dashboard/salesEnero/<year>',  methods=['GET'])
def getSalesEnero(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-01-01' AND '{0}-01-31'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@dash_api.route('/api/dashboard/salesFebrero/<year>',  methods=['GET'])
def getSalesFebrero(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-02-01' AND '{0}-02-28'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@dash_api.route('/api/dashboard/salesMarzo/<year>',  methods=['GET'])
def getSalesMarzo(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-03-01' AND '{0}-03-31'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@dash_api.route('/api/dashboard/salesAbril/<year>',  methods=['GET'])
def getSalesAbril(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-04-01' AND '{0}-04-30'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@dash_api.route('/api/dashboard/salesMayo/<year>',  methods=['GET'])
def getSalesMayo(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-05-01' AND '{0}-05-31'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@dash_api.route('/api/dashboard/salesJunio/<year>',  methods=['GET'])
def getSalesJunio(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-06-01' AND '{0}-06-30'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@dash_api.route('/api/dashboard/salesJulio/<year>',  methods=['GET'])
def getSalesJulio(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-07-01' AND '{0}-07-31'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@dash_api.route('/api/dashboard/salesAgosto/<year>',  methods=['GET'])
def getSalesAgosto(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-08-01' AND '{0}-08-31'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@dash_api.route('/api/dashboard/salesSeptiembre/<year>',  methods=['GET'])
def getSalesSeptiembre(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-09-01' AND '{0}-09-30'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@dash_api.route('/api/dashboard/salesOctubre/<year>',  methods=['GET'])
def getSalesOctubre(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-10-01' AND '{0}-10-31'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@dash_api.route('/api/dashboard/salesNoviembre/<year>',  methods=['GET'])
def getSalesNoviembre(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-11-01' AND '{0}-11-30'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@dash_api.route('/api/dashboard/salesDiciembre/<year>',  methods=['GET'])
def getSalesDiciembre(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-12-01' AND '{0}-12-31'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)


## --------------------------------------------------------- ##
## --Gráficas de Productos, Ingredientes y Complementos----- ##
## --------------------------------------------------------- ##

@dash_api.route('/api/dashboard/graphdata',  methods=['GET'])
def getGraphData():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT nombreproducto, count(nombreproducto) FROM ventasproducto GROUP BY nombreproducto LIMIT 5"
    cur.execute(sql) 
    row = cur.fetchall()
    conn.close()
    return jsonify(row)

@dash_api.route('/api/dashboard/ingredientnot',  methods=['GET'])
def getIngredientNot():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ingredientes WHERE cantidadingrediente <= cantidadnotificacioningrediente"
    cur.execute(sql) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@dash_api.route('/api/dashboard/ingredient',  methods=['GET'])
def getTotalIngredients():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ingredientes"
    cur.execute(sql) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@dash_api.route('/api/dashboard/complement',  methods=['GET'])
def getSalesComplement():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT nombrecomplemento, COUNT(*)idcomplemento FROM ventascomplemento GROUP BY nombrecomplemento LIMIT 5"
    cur.execute(sql) 
    row = cur.fetchall()
    conn.close()
    return jsonify(row)
## --------------------------------------------------------- ##
## ----------Gráfica de Ventas de los empleados------------- ##
## --------------------------------------------------------- ##

@dash_api.route('/api/dashboard/doughnut',  methods=['GET'])
def getProductsToday():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="""select ventas.idusuario, usuario, count(ventas.idusuario) from ventas inner join usuarios
        on ventas.idusuario = usuarios.idusuario
        group by ventas.idusuario, usuario"""
    cur.execute(sql) 
    row = cur.fetchall()
    conn.close()
    return jsonify(row)


## --------------------------------------------------------- ##
## ----------Tabla de transacciones del día ---------------- ##
## --------------------------------------------------------- ##

@dash_api.route('/api/dashboard/transactions/<fecha>',  methods=['GET'])
def getTransactions(fecha):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql = ('''SELECT usuarios.idusuario, usuario, fechaventa, totalventa, tipopago FROM ventas INNER JOIN usuarios
                    ON ventas.idusuario = usuarios.idusuario INNER JOIN pagos 
                    ON pagos.idpago = ventas.idpago AND ventas.fechaventa = '{0}' '''.format(fecha))
    cur.execute(sql, fecha) 
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)


## --------------------------------------------------------- ##
## ---------------- Cards de Información ------------------- ##
## --------------------------------------------------------- ##

@dash_api.route('/api/dashboard/<fechaventa>',  methods=['GET'])
def getSalesToday(fechaventa):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT SUM(totalventa) FROM ventas WHERE fechaventa = '{0}'".format(fechaventa)
    cur.execute(sql, fechaventa) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@dash_api.route('/api/dashboard/',  methods=['GET'])
def getProductNot():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM productos WHERE cantidadproducto <= cantidadnotificacionproducto"
    cur.execute(sql) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

