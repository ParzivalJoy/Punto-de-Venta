from flask import Flask,request,jsonify #pip install Flask
import psycopg2
from psycopg2.extras import RealDictCursor
from flask_cors import CORS #pip install flask-cors
import os

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
    database="puntoventa",
    user="postgres",
    password="root")

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "dsankldqwp2310953nc812245" 
jwt = JWTManager(app)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@app.route("/api/token", methods=["POST", "GET"])
def verifyLogin():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

@app.route('/api',  methods=['GET'])
def index():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT idempleado, nombreempleado, to_char(fechacontra, 'DD/MM/YYYY') as fechacontra, dirempleado, telempleado, emailempleado FROM empleados ORDER BY idempleado")
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/api/categories',  methods=['GET'])
def getCategories():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT idcategoria, nombrecategoria FROM categorias ORDER BY idcategoria")
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/api/complements/<id>',  methods=['GET'])
def getListComplements(id):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT nombrecomplemento, preciocomplemento, descripcioncomplemento FROM complementos JOIN productoscomplementos ON productoscomplementos.idproducto = '{0}' AND complementos.idcomplemento = productoscomplementos.idcomplemento".format(id))
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/api/modifiers/<id>',  methods=['GET'])
def getListModifiers(id):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('''SELECT modificadores.idmodificador, nombremodificador, preciomodificador, obligatorio, multiple FROM modificadores INNER JOIN productosmodificadores 
                ON productosmodificadores.idproducto = '{0}' AND modificadores.idmodificador = productosmodificadores.idmodificador'''.format(id))
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/api/options/<idmodificador>',  methods=['GET'])
def getListOptions(idmodificador):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('''SELECT nombreopcion, precioopcionmodificador FROM opciones JOIN modificadoresopciones
                ON modificadoresopciones.idmodificador = {0} AND opciones.idopcionmodificador = modificadoresopciones.idopcionmodificador'''.format(idmodificador))
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/api/categories/<idcategoria>',  methods=['GET'])
def getProducts(idcategoria):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT idproducto, nombreproducto, descripcionproducto, precioproducto, idcategoria, encode(imagenproducto, 'base64') FROM productos WHERE idcategoria = {0}".format(idcategoria)
    cur.execute(sql, idcategoria) 
    row = cur.fetchall()
    conn.close()
    return jsonify(row)

@app.route('/api/products/<idproducto>',  methods=['GET'])
def getProduct(idproducto):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql='''SELECT nombreproducto, nombreunidad, cantidadproducto, descripcionproducto, precioproducto, encode(imagenproducto, 'base64')
        FROM productos INNER JOIN unidades ON idproducto = '{0}' '''.format(idproducto)
    cur.execute(sql, idproducto) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/api/<idempleado>',  methods=['GET'])
def getEmployee(idempleado):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT nombreempleado, dirempleado, telempleado, emailempleado FROM empleados  WHERE idempleado = {0}".format(idempleado)
    cur.execute(sql, idempleado) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)


@app.route('/api', methods=['POST'])
def saveEmployee():
	conn = conexion()
	cur = conn.cursor()
	data = request.json
	sql = """INSERT INTO empleados (nombreempleado, fechacontra, dirempleado,telempleado, emailempleado, idcargo )
             VALUES (%(nombreempleado)s,%(fechacontra)s, %(dirempleado)s, %(telempleado)s, %(emailempleado)s,NULL)"""
	cur.execute(sql, data)
	conn.commit()
	conn.close()
	cur.close()
	return jsonify(msg='added successfully!')

@app.route('/api/<idempleado>', methods=['DELETE'])
def deleteEmployee(idempleado):
    conn = conexion()
    cur = conn.cursor()
    sql = "DELETE FROM empleados WHERE idempleado = {0}".format(idempleado)
    cur.execute(sql, idempleado) 
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg="employee eliminated") 

@app.route('/api', methods=['PUT'])
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


    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


#python3 -m venv venv
#activar entorno virtual
#venv\Scripts\activate