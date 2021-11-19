from flask import Blueprint
from flask import Flask,request, jsonify, send_from_directory #pip install Flask
import psycopg2
from psycopg2.extras import RealDictCursor
from flask_cors import CORS #pip install flask-cors
import os
from random import SystemRandom
from werkzeug.utils import secure_filename

conta_api = Blueprint('conta_api', __name__)

def conexion():
    return psycopg2.connect(
    host="localhost",
    database="puntodeventa",
    user="postgres",
    password="root")

## ------------------------------------------------------------------------------ ##
## --------------------------Operaciones de contabilidad------------------------- ##
## ------------------------------------------------------------------------------ ##

@conta_api.route('/contabilidad/sumaParciales/<fecha>',  methods=['GET'])
def getSumaParciales(fecha):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT SUM(total) FROM movimientos WHERE fechamovimiento>='{0}' AND razon='parcial'".format(fecha)
    cur.execute(sql) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@conta_api.route('/contabilidad/ultimosMovimientos/<fecha>',  methods=['GET'])
def getultimosMovimientos(fecha):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT to_char(fechamovimiento, 'YYYY-MM-DD HH24:MI:SS') As fechamovimiento,razon,descripcion,total,usuarios.usuario FROM movimientos JOIN usuarios ON movimientos.idusuario=usuarios.idusuario WHERE fechamovimiento>='{0}' AND (razon='parcial' OR razon='observacion') ORDER BY fechamovimiento DESC".format(fecha)
    cur.execute(sql) 
    row = cur.fetchall()
    conn.close()
    return jsonify(row)

@conta_api.route('/contabilidad/inversionPeriodoPasado/<fecha>',  methods=['GET'])
def getInversionPeriodoPasado(fecha):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT SUM(total) FROM movimientos WHERE fechamovimiento>='{0}' AND razon='carga'".format(fecha)
    cur.execute(sql, fecha) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@conta_api.route('/contabilidad/ultimosAperturas',  methods=['GET'])
def getultimosAperturas():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT to_char(fechaapertura, 'YYYY-MM-DD HH24:MI:SS') As fechaapertura,idcortecaja,saldoapertura FROM cortescaja ORDER BY fechaapertura DESC"
    cur.execute(sql) 
    row = cur.fetchall()
    conn.close()
    return jsonify(row)

@conta_api.route('/contabilidad/editApertura', methods=['PUT'])
def editionApertura():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""UPDATE cortescaja SET fechaapertura=NOW(), saldoapertura=%(montoapertura)s WHERE idcortecaja=%(idcorte)s"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='edited succesfully');

@conta_api.route('/contabilidad/ultimoApertura',  methods=['GET'])
def getultimoApertura():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT to_char(fechaapertura, 'YYYY-MM-DD HH24:MI:SS') As fechaapertura,idcortecaja,saldoapertura FROM cortescaja ORDER BY fechaapertura DESC"
    cur.execute(sql) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@conta_api.route('/contabilidad/insertContabilidadMovimiento', methods=['POST'])
def insercionMoveCont():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""INSERT INTO movimientos (tipo,razon,descripcion,total,idusuario,fechamovimiento) values(%(tipo)s,%(razon)s,%(descripcionmov)s,%(totalretiro)s,%(idusuario)s,NOW())"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='movimiento registrado');

@conta_api.route('/contabilidad/insertPrimerApertura', methods=['POST'])
def insercionPrimerApertura():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""INSERT INTO cortescaja (subtotalcorte,totalcorte,saldoapertura, idusuario,fechaapertura,fechacorte,cuenta) values(0,0,%(montoapertura)s, %(idusuario)s,NOW(),'2021-01-01 00:00:00', %(cuenta)s)"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='movimiento registrado');

@conta_api.route('/contabilidad/insertCierre', methods=['POST'])
def insercionCierreCaja():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""INSERT INTO cortescaja (totalcorte, subtotalcorte,saldoapertura,idusuario,fechaapertura,fechacorte,cuenta) values(%(totalrecaudado)s,%(recuento)s, %(fondodecambio)s, %(idusuario)s, NOW(), NOW(),%(cuenta)s)"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='cierre registrado');

@conta_api.route('/contabilidad/DatosUltimoCierre',  methods=['GET'])
def getUltimoCierre():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT usuarios.idusuario,usuario,totalcorte,saldoapertura,to_char(fechacorte, 'DD/MM/YYYY HH24:MI:SS') As fechacorte, to_char(fechaapertura, 'DD/MM/YYYY HH24:MI:SS') As fechaapertura FROM usuarios JOIN cortescaja ON usuarios.idusuario=cortescaja.idusuario ORDER BY fechacorte DESC "
    cur.execute(sql) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@conta_api.route('/contabilidad/VentasHastaAhora/<fecha>',  methods=['GET'])
def getVentasDesdeApertura(fecha):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT SUM(totalventa) FROM ventas WHERE fechaventa>='{0}' AND idpago=1".format(fecha)
    cur.execute(sql, fecha) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@conta_api.route('/contabilidad/VentasHastaAhoraTarjetas/<fecha>',  methods=['GET'])
def getVentasHoyT(fecha):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT SUM(totalventa) FROM ventas WHERE fechaventa>='{0}' AND idpago=2".format(fecha)
    cur.execute(sql, fecha) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@conta_api.route('/contabilidad/VentasHastaAhoraVales/<fecha>',  methods=['GET'])
def getVentasHoyV(fecha):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT SUM(totalventa) FROM ventas WHERE fechaventa>='{0}' AND idpago=3".format(fecha)
    cur.execute(sql, fecha) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@conta_api.route('/contabilidad/CajaHastaAhora/<fecha>',  methods=['GET'])
def getCajaHoy(fecha):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT totalcorte,saldoapertura FROM cortescaja ORDER BY fechacorte DESC"
    cur.execute(sql, fecha) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@conta_api.route('/contabilidad/GastosCaja/<fecha>',  methods=['GET'])
def getRetirosHoy(fecha):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT SUM(total) FROM movimientos WHERE fechamovimiento>='{0}' AND razon = 'retiro' ".format(fecha)
    cur.execute(sql, fecha) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@conta_api.route('/contabilidad/CambiosCaja/<fecha>',  methods=['GET'])
def getCambiosHoy(fecha):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT SUM(total) FROM movimientos WHERE fechamovimiento>='{0}' AND razon = 'cambio' ".format(fecha)
    cur.execute(sql, fecha) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)