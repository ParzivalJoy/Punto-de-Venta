from flask import Blueprint
from flask import Flask,request, jsonify, send_from_directory #pip install Flask
import psycopg2
from psycopg2.extras import RealDictCursor
from flask_cors import CORS #pip install flask-cors
import os
from random import SystemRandom
from werkzeug.utils import secure_filename

ventas_api = Blueprint('ventas_api', __name__)

def conexion():
    return psycopg2.connect(
    host="localhost",
    database="puntodeventa",
    user="postgres",
    password="root")

## ------------------------------------------------------------------------------ ##
## -----------------------Catalogo de productos y filtros------------------------ ##
## ------------------------------------------------------------------------------ ##

@ventas_api.route('/api/sales/products',  methods=['GET'])
def getAllProducts():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT idproducto, nombreproducto, precioproducto, descripcionproducto, imagebproducto FROM productos")
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@ventas_api.route('/api/sales/products/price1',  methods=['GET'])
def getProductsByPrice1():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT idproducto, nombreproducto, precioproducto, descripcionproducto FROM productos WHERE precioproducto <= 50")
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@ventas_api.route('/api/sales/products/price2',  methods=['GET'])
def getProductsByPrice2():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT idproducto, nombreproducto, precioproducto, descripcionproducto FROM productos WHERE precioproducto > 50 AND precioproducto <= 500")
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@ventas_api.route('/api/sales/products/price3',  methods=['GET'])
def getProductsByPrice3():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT idproducto, nombreproducto, precioproducto, descripcionproducto FROM productos WHERE precioproducto > 500")
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@ventas_api.route('/api/sales/products/category/<idcategoria>',  methods=['GET'])
def getProductsByCategory(idcategoria):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql = ('''SELECT idproducto, nombreproducto, precioproducto, descripcionproducto, nombrecategoria FROM productos 
            INNER JOIN categorias ON productos.idcategoria = {0} AND categorias.idcategoria = productos.idcategoria'''.format(idcategoria))
    cur.execute(sql, idcategoria)
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@ventas_api.route('/api/sales/products/name/<search>',  methods=['GET'])
def getProductByName(search):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql = ("SELECT idproducto, nombreproducto, precioproducto, descripcionproducto FROM productos WHERE nombreproducto = '{0}'".format(search))
    cur.execute(sql, search)
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@ventas_api.route('/api/sales/products/id/<search>',  methods=['GET'])
def getProductById(search):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql = ("SELECT idproducto, nombreproducto, precioproducto, descripcionproducto FROM productos WHERE idproducto = '{0}'".format(search))
    cur.execute(sql, search)
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@ventas_api.route('/api/getproducts/<id>',  methods=['GET'])
def getProduct(id):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql = ("SELECT idproducto, nombreproducto, precioproducto, descripcionproducto, imagebproducto FROM productos WHERE idproducto = '{0}'".format(id))
    cur.execute(sql, id)
    rows = cur.fetchone()
    conn.close()
    return jsonify(rows)

@ventas_api.route('/api/sales/categories',  methods=['GET'])
def getCategories():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT idcategoria, nombrecategoria FROM categorias ORDER BY idcategoria")
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)
   
@ventas_api.route('/api/complements/<id>',  methods=['GET'])
def getListComplements(id):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT idcomplemento, nombrecomplemento, preciocomplemento, descripcioncomplemento FROM complementos WHERE idproducto = '{0}'".format(id))
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@ventas_api.route('/api/modifiers/<id>',  methods=['GET'])
def getListModifiers(id):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('''SELECT modificadores.idmodificador, nombremodificador, preciomodificador, obligatorio FROM modificadores INNER JOIN productosmodificadores 
                ON productosmodificadores.idproducto = '{0}' AND modificadores.idmodificador = productosmodificadores.idmodificador '''.format(id))
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@ventas_api.route('/api/options/<idmodificador>',  methods=['GET'])
def getListOptions(idmodificador):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('''SELECT opciones.idopcionmodificador, idmodificador, nombreopcion, precioopcionmodificador, idingrediente, opcionporcion FROM opciones JOIN modificadoresopciones
                ON modificadoresopciones.idmodificador = {0} AND opciones.idopcionmodificador = modificadoresopciones.idopcionmodificador'''.format(idmodificador))
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@ventas_api.route('/api/categories/<idcategoria>',  methods=['GET'])
def getProducts(idcategoria):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT idproducto, nombreproducto, descripcionproducto, precioproducto, idcategoria FROM productos WHERE idcategoria = {0}".format(idcategoria)
    cur.execute(sql, idcategoria) 
    row = cur.fetchall()
    conn.close()
    return jsonify(row)
## ------------------------------------------------------------------------------ ##
## -----------Verificacion de Cantidades de productos e Ingredientes ------------ ##
## ------------------------------------------------------------------------------ ##

@ventas_api.route('/sales/verification/<id>',  methods=['GET'])
def verifyCantProduct(id):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT cantidadproducto FROM productos WHERE idproducto = '{0}'".format(id)
    cur.execute(sql, id) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@ventas_api.route('/api/sales/verification/complement/<id>',  methods=['GET'])
def updateComplemento(id):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT idproductooriginal FROM complementos WHERE idcomplemento = '{0}'".format(id)
    cur.execute(sql, id) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@ventas_api.route('/api/sales/verification/ingredient/portion/<idproducto>',  methods=['GET'])
def getPortion(idproducto):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT porcion FROM productosingredientes WHERE idproducto = '{0}'".format(idproducto)
    cur.execute(sql, idproducto) 
    row = cur.fetchall()
    conn.close()
    return jsonify(row)

## ------------------------------------------------------------------------------ ##
## ----------Verificacion de productos simples o productos compuestos------------ ##
## ------------------------------------------------------------------------------ ##

@ventas_api.route('/api/sales/verification/products/complements/<search>',  methods=['GET'])
def verifyProductComplement(search):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql = ("SELECT idcomplemento FROM complementos WHERE idproducto = '{0}'".format(search))
    cur.execute(sql, search)
    rows = cur.fetchone()
    conn.close()
    return jsonify(rows)

@ventas_api.route('/api/sales/verification/products/modifiers/<search>',  methods=['GET'])
def verifyProductModifier(search):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql = ("SELECT idmodificador FROM productosmodificadores WHERE idproducto = '{0}'".format(search))
    cur.execute(sql, search)
    rows = cur.fetchone()
    conn.close()
    return jsonify(rows)

## ------------------------------------------------------------------------------ ##
## ----------- Cambios en las cantidades de productos e ingredientes------------- ##
## ------------------------------------------------------------------------------ ##

@ventas_api.route('/api/sales/updateproduct', methods=['PUT'])
def updateProducts():
    conn = conexion()
    cur = conn.cursor()
    data = request.json
    sql = "UPDATE productos SET cantidadproducto = cantidadproducto - {0} WHERE idproducto='{1}'".format(data['cantidad'], data['idproducto'])
    cur.execute(sql, data) 
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg="employee updated")

@ventas_api.route('/api/sales/updateingredient', methods=['PUT'])
def updateIngredients():
    conn = conexion()
    cur = conn.cursor()
    data = request.json
    sql = """update ingredientes set cantidadingrediente = cantidadingrediente - {0} from productosingredientes
            where productosingredientes.idproducto = '{1}' and ingredientes.idingrediente = productosingredientes.idingrediente""".format(data['porcion'], data['idproducto'])
    cur.execute(sql, data) 
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg="ingredient updated")

@ventas_api.route('/api/sales/modifier/updateingredient', methods=['PUT'])
def updateModifierIngredients():
    conn = conexion()
    cur = conn.cursor()
    data = request.json
    sql = "UPDATE ingredientes SET cantidadingrediente = cantidadingrediente - {0} WHERE idingrediente = '{1}'"-format(data['porcion'], data['idingrediente'])
    cur.execute(sql, data) 
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg="ingredient updated")


## ------------------------------------------------------------------------------ ##
## ------------------Inserciones en las tablas de ventas------------------------- ##
## ------------------------------------------------------------------------------ ##

@ventas_api.route('/api/sales/venta', methods=['POST'])
def addSale():
	conn = conexion()
	cur = conn.cursor()
	data = request.json
	sql = """INSERT INTO ventas (idusuario, idcliente, idpago, totalventa, fechaventa, horaventa )
             VALUES (%(idusuario)s,%(idcliente)s, %(idpago)s, %(totalventa)s, %(fechaventa)s, %(horaventa)s)"""
	cur.execute(sql, data)
	conn.commit()
	conn.close()
	cur.close()
	return jsonify(msg='added successfully!')

@ventas_api.route('/api/sales/addsaleproduct', methods=['POST'])
def addSaleProduct():
	conn = conexion()
	cur = conn.cursor()
	data = request.json
	sql = """INSERT INTO ventasproducto (idusuario, idproducto, cantidad, nombreproducto, notas, subtotal, totalproductos )
             VALUES (%(idusuario)s,%(idproducto)s, %(cantidad)s, %(nombre)s, %(nota)s, %(precio)s, %(total)s)"""
	cur.execute(sql, data)
	conn.commit()
	conn.close()
	cur.close()
	return jsonify(msg='added successfully!')

@ventas_api.route('/api/sales/addsalecomplement', methods=['POST'])
def addSaleComplement():
	conn = conexion()
	cur = conn.cursor()
	data = request.json
	sql = """INSERT INTO ventascomplemento (idusuario, idcomplemento, nombrecomplemento, cantidad, subtotal, totalcomplemento )
             VALUES (%(idusuario)s,%(idcomplemento)s, %(nombre)s, %(cantidad)s, %(precio)s, %(total)s)"""
	cur.execute(sql, data)
	conn.commit()
	conn.close()
	cur.close()
	return jsonify(msg='added successfully!')

@ventas_api.route('/api/sales/addsalemodifier', methods=['POST'])
def addSaleModifier():
	conn = conexion()
	cur = conn.cursor()
	data = request.json
	sql = """INSERT INTO ventasmodificadores (idusuario, idmodificador, idopcionmodificador, nombremodificador, nombreopcion, subtotal, totalmodificador )
             VALUES (%(idusuario)s,%(idmod)s, %(idop)s, %(nombremod)s, %(nombreop)s, %(precio)s, %(precio)s)"""
	cur.execute(sql, data)
	conn.commit()
	conn.close()
	cur.close()
	return jsonify(msg='added successfully!')