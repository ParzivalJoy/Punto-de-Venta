from flask import Flask,request, jsonify, send_from_directory #pip install Flask
import psycopg2
from psycopg2.extras import RealDictCursor
from flask_cors import CORS #pip install flask-cors
import os
from random import SystemRandom
from werkzeug.utils import secure_filename

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


##Comentario
##--------------Operaciones al realizar una venta----------##

##----------------Verificaciones-----------------------##

@app.route('/sales/verification/<id>',  methods=['GET'])
def verifyCantProduct(id):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT cantidadproducto FROM productos WHERE idproducto = '{0}'".format(id)
    cur.execute(sql, id) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/api/sales/verification/complement/<id>',  methods=['GET'])
def updateComplemento(id):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT idproductooriginal FROM complementos WHERE idcomplemento = '{0}'".format(id)
    cur.execute(sql, id) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/api/sales/verification/ingredient/portion/<idproducto>',  methods=['GET'])
def getPortion(idproducto):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT porcion FROM productosingredientes WHERE idproducto = '{0}'".format(idproducto)
    cur.execute(sql, idproducto) 
    row = cur.fetchall()
    conn.close()
    return jsonify(row)

##----------------Updates-------------------------------##
@app.route('/api/sales/updateproduct', methods=['PUT'])
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

@app.route('/api/sales/updateingredient', methods=['PUT'])
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

@app.route('/api/sales/modifier/updateingredient', methods=['PUT'])
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

##---------------Inserciones en las tablas de ventas--------------##
@app.route('/api/sales/venta', methods=['POST'])
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

@app.route('/api/sales/addsaleproduct', methods=['POST'])
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

@app.route('/api/sales/addsalecomplement', methods=['POST'])
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

@app.route('/api/sales/addsalemodifier', methods=['POST'])
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

##------- Operaciones de la interfaz Dashboard ------##

# ----------------  Gráfica ----------------#
@app.route('/api/dashboard/salesEnero/<year>',  methods=['GET'])
def getSalesEnero(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-01-01' AND '{0}-01-31'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/api/dashboard/salesFebrero/<year>',  methods=['GET'])
def getSalesFebrero(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-02-01' AND '{0}-02-28'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/api/dashboard/salesMarzo/<year>',  methods=['GET'])
def getSalesMarzo(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-03-01' AND '{0}-03-31'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/api/dashboard/salesAbril/<year>',  methods=['GET'])
def getSalesAbril(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-04-01' AND '{0}-04-30'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/api/dashboard/salesMayo/<year>',  methods=['GET'])
def getSalesMayo(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-05-01' AND '{0}-05-31'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/api/dashboard/salesJunio/<year>',  methods=['GET'])
def getSalesJunio(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-06-01' AND '{0}-06-30'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/api/dashboard/salesJulio/<year>',  methods=['GET'])
def getSalesJulio(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-07-01' AND '{0}-07-31'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/api/dashboard/salesAgosto/<year>',  methods=['GET'])
def getSalesAgosto(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-08-01' AND '{0}-08-31'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/api/dashboard/salesSeptiembre/<year>',  methods=['GET'])
def getSalesSeptiembre(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-09-01' AND '{0}-09-30'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/api/dashboard/salesOctubre/<year>',  methods=['GET'])
def getSalesOctubre(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-10-01' AND '{0}-10-31'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/api/dashboard/salesNoviembre/<year>',  methods=['GET'])
def getSalesNoviembre(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-11-01' AND '{0}-11-30'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/api/dashboard/salesDiciembre/<year>',  methods=['GET'])
def getSalesDiciembre(year):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ventas WHERE fechaventa BETWEEN '{0}-12-01' AND '{0}-12-31'".format(year)
    cur.execute(sql, year) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

#-----------------Gráficas de barras (Productos más vendidos)---------##
@app.route('/api/dashboard/graphdata',  methods=['GET'])
def getGraphData():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT nombreproducto, count(nombreproducto) FROM ventasproducto GROUP BY nombreproducto LIMIT 5"
    cur.execute(sql) 
    row = cur.fetchall()
    conn.close()
    return jsonify(row)

@app.route('/api/dashboard/doughnut',  methods=['GET'])
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


# ---------------- Tabla de transacciones ----------------#
@app.route('/api/dashboard/transactions/<fecha>',  methods=['GET'])
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

## ----------------- Operaciones de la interfaz Sales ------------ ##

@app.route('/api/sales/products',  methods=['GET'])
def getAllProducts():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT idproducto, nombreproducto, precioproducto, descripcionproducto, imagebproducto FROM productos")
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/api/sales/products/price1',  methods=['GET'])
def getProductsByPrice1():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT idproducto, nombreproducto, precioproducto, descripcionproducto FROM productos WHERE precioproducto <= 50")
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/api/sales/products/price2',  methods=['GET'])
def getProductsByPrice2():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT idproducto, nombreproducto, precioproducto, descripcionproducto FROM productos WHERE precioproducto > 50 AND precioproducto <= 500")
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/api/sales/products/price3',  methods=['GET'])
def getProductsByPrice3():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT idproducto, nombreproducto, precioproducto, descripcionproducto FROM productos WHERE precioproducto > 500")
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/api/sales/products/category/<idcategoria>',  methods=['GET'])
def getProductsByCategory(idcategoria):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql = ('''SELECT idproducto, nombreproducto, precioproducto, descripcionproducto, nombrecategoria FROM productos 
            INNER JOIN categorias ON productos.idcategoria = {0} AND categorias.idcategoria = productos.idcategoria'''.format(idcategoria))
    cur.execute(sql, idcategoria)
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/api/sales/products/name/<search>',  methods=['GET'])
def getProductByName(search):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql = ("SELECT idproducto, nombreproducto, precioproducto, descripcionproducto FROM productos WHERE nombreproducto = '{0}'".format(search))
    cur.execute(sql, search)
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/api/sales/products/id/<search>',  methods=['GET'])
def getProductById(search):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql = ("SELECT idproducto, nombreproducto, precioproducto, descripcionproducto FROM productos WHERE idproducto = '{0}'".format(search))
    cur.execute(sql, search)
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/api/sales/verification/products/complements/<search>',  methods=['GET'])
def verifyProductComplement(search):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql = ("SELECT idcomplemento FROM complementos WHERE idproducto = '{0}'".format(search))
    cur.execute(sql, search)
    rows = cur.fetchone()
    conn.close()
    return jsonify(rows)

@app.route('/api/sales/verification/products/modifiers/<search>',  methods=['GET'])
def verifyProductModifier(search):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql = ("SELECT idmodificador FROM productosmodificadores WHERE idproducto = '{0}'".format(search))
    cur.execute(sql, search)
    rows = cur.fetchone()
    conn.close()
    return jsonify(rows)

@app.route('/api/getproducts/<id>',  methods=['GET'])
def getProduct(id):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql = ("SELECT idproducto, nombreproducto, precioproducto, descripcionproducto, imagebproducto FROM productos WHERE idproducto = '{0}'".format(id))
    cur.execute(sql, id)
    rows = cur.fetchone()
    conn.close()
    return jsonify(rows)

@app.route('/api/sales/categories',  methods=['GET'])
def getCategories():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT idcategoria, nombrecategoria FROM categorias ORDER BY idcategoria")
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/api',  methods=['GET'])
def index():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT idempleado, nombreempleado, to_char(fechacontra, 'DD/MM/YYYY') as fechacontra, dirempleado, telempleado, emailempleado FROM empleados ORDER BY idempleado")
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/api/login', methods=['POST'])
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

@app.route('/api/userEmail',  methods=['POST'])
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

@app.route('/api/complements/<id>',  methods=['GET'])
def getListComplements(id):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT idcomplemento, nombrecomplemento, preciocomplemento, descripcioncomplemento FROM complementos WHERE idproducto = '{0}'".format(id))
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/api/modifiers/<id>',  methods=['GET'])
def getListModifiers(id):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('''SELECT modificadores.idmodificador, nombremodificador, preciomodificador, obligatorio FROM modificadores INNER JOIN productosmodificadores 
                ON productosmodificadores.idproducto = '{0}' AND modificadores.idmodificador = productosmodificadores.idmodificador '''.format(id))
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/api/options/<idmodificador>',  methods=['GET'])
def getListOptions(idmodificador):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('''SELECT opciones.idopcionmodificador, idmodificador, nombreopcion, precioopcionmodificador, idingrediente, opcionporcion FROM opciones JOIN modificadoresopciones
                ON modificadoresopciones.idmodificador = {0} AND opciones.idopcionmodificador = modificadoresopciones.idopcionmodificador'''.format(idmodificador))
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/api/categories/<idcategoria>',  methods=['GET'])
def getProducts(idcategoria):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT idproducto, nombreproducto, descripcionproducto, precioproducto, idcategoria FROM productos WHERE idcategoria = {0}".format(idcategoria)
    cur.execute(sql, idcategoria) 
    row = cur.fetchall()
    conn.close()
    return jsonify(row)

@app.route('/api/dashboard/<fechaventa>',  methods=['GET'])
def getSalesToday(fechaventa):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT SUM(totalventa) FROM ventas WHERE fechaventa = '{0}'".format(fechaventa)
    cur.execute(sql, fechaventa) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/api/dashboard/',  methods=['GET'])
def getProductNot():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM productos WHERE cantidadproducto <= cantidadnotificacionproducto"
    cur.execute(sql) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/api/dashboard/ingredientnot',  methods=['GET'])
def getIngredientNot():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ingredientes WHERE cantidadingrediente <= cantidadnotificacioningrediente"
    cur.execute(sql) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/api/dashboard/ingredient',  methods=['GET'])
def getTotalIngredients():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT COUNT(*) FROM ingredientes"
    cur.execute(sql) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/api/dashboard/complement',  methods=['GET'])
def getSalesComplement():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT nombrecomplemento, COUNT(*)idcomplemento FROM ventascomplemento GROUP BY nombrecomplemento LIMIT 5"
    cur.execute(sql) 
    row = cur.fetchall()
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

os.makedirs(os.path.join(app.instance_path, 'uploads'), exist_ok=True)
IMAGE_FOLDER= os.path.join(app.instance_path, 'uploads')

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/inventario/manejoImgs/<id>', methods=['PUT'])
def uploadimage(id):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    if 'file' not in request.files:
        return jsonify(' not got it, file in not requested files')
    file=request.files['file']
    if file.filename== '':
        return jsonify('not got it, no name')
    if file and allowed_file(file.filename):
        filename=secure_filename(file.filename)
        file.save(os.path.join(app.instance_path, 'uploads', filename))
        cur.execute("UPDATE productos SET imagebproducto=(%s) WHERE idproducto= '{0}' ".format(id),(filename,))
        conn.commit()
        return jsonify('got it: '+filename)
    else:
        return jsonify('extensiones permitidas: jpg, jpeg, png')

@app.route('/inventario/insertInventarioMovimiento', methods=['POST'])
def insercionMoveInv():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""INSERT INTO movimientos (tipo,razon,descripcion,total,idusuario,fechamovimiento) values(%(tipo)s,%(razon)s,%(descripcionmov)s,%(totalinversion)s,1,NOW())"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='movimiento de entrada agregado');

@app.route('/inventario/bringImgs/<filename>')
def uploaded_file(filename):
    return send_from_directory(IMAGE_FOLDER, path=filename, as_attachment=False)

@app.route('/inventario/getActualProduct/<id>',  methods=['GET'])
def getProductsInv(id):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT idproducto,nombreproducto,precioproducto,costoproducto,descripcionproducto,idunidad,imagebproducto,cantidadproducto,cantidadnotificacionproducto,productos.idcategoria,nombrecategoria FROM productos JOIN categorias ON productos.idcategoria=categorias.idcategoria WHERE productos.idproducto = '{0}'".format(id)
    cur.execute(sql, id) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)


@app.route('/inventario/getInventario2/<int:valor>', methods=['GET'])
def selectall2(valor):
    conn=conexion()
    cur=conn.cursor(cursor_factory= RealDictCursor)
    if valor ==1:
        cur.execute("SELECT c.nombreproveedor, b.costo, a.nombreingrediente, a.idunidad, a.idingrediente,a.cantidadingrediente,b.fecha,TO_CHAR(b.fecha, 'DD/MM/YYYY') AS fecha FROM ingredientes a LEFT JOIN ingredientesproveedores b ON a.idingrediente=b.idingrediente LEFT JOIN proveedores c ON c.idproveedor=b.idproveedor ORDER BY a.nombreingrediente")
    if valor ==4:
        cur.execute("SELECT c.nombreproveedor, b.costo, a.nombreingrediente, a.idunidad, a.idingrediente,a.cantidadingrediente,b.fecha,TO_CHAR(b.fecha, 'DD/MM/YYYY') AS fecha FROM ingredientes a LEFT JOIN ingredientesproveedores b ON a.idingrediente=b.idingrediente LEFT JOIN proveedores c ON c.idproveedor=b.idproveedor WHERE a.cantidadnotificacioningrediente>a.cantidadingrediente")
    if valor ==6:
        cur.execute("SELECT c.nombreproveedor, b.costo, a.nombreingrediente, a.idunidad, a.idingrediente,b.cantidad,b.fecha,TO_CHAR(b.fecha, 'DD/MM/YYYY') AS fecha FROM ingredientes a LEFT JOIN ingredientesproveedores b ON a.idingrediente=b.idingrediente LEFT JOIN proveedores c ON c.idproveedor=b.idproveedor ORDER BY b.fecha DESC")
    if valor ==2:
        cur.execute("SELECT c.nombreproveedor, a.costoproducto,a.precioproducto,a.descripcionproducto, a.nombreproducto, a.idunidad, a.idproducto,a.cantidadproducto,b.fecha,TO_CHAR(b.fecha, 'DD/MM/YYYY') AS fecha FROM productos a LEFT JOIN productosproveedores b ON a.idproducto=b.idproducto LEFT JOIN proveedores c ON c.idproveedor=b.idproveedor ORDER BY a.nombreproducto")
    if valor ==3:
        cur.execute("SELECT c.nombreproveedor, a.costoproducto,a.precioproducto,a.descripcionproducto, a.nombreproducto, a.idunidad, a.idproducto,a.cantidadproducto,b.fecha,TO_CHAR(b.fecha, 'DD/MM/YYYY') AS fecha FROM productos a LEFT JOIN productosproveedores b ON a.idproducto=b.idproducto LEFT JOIN proveedores c ON c.idproveedor=b.idproveedor WHERE a.cantidadnotificacionproducto>a.cantidadproducto")
    if valor ==5:
        cur.execute("SELECT c.nombreproveedor, a.costoproducto,a.precioproducto,a.descripcionproducto, a.nombreproducto, a.idunidad, a.idproducto,b.cantidad,b.fecha,TO_CHAR(b.fecha, 'DD/MM/YYYY') AS fecha FROM productos a LEFT JOIN productosproveedores b ON a.idproducto=b.idproducto LEFT JOIN proveedores c ON c.idproveedor=b.idproveedor ORDER BY b.fecha DESC")
    if valor ==7:
        cur.execute("SELECT idproducto,cantidadmerma,descripcionmerma,nombreproducto,idunidad,fechareporte,TO_CHAR(fechareporte, 'DD/MM/YYYY') AS fechareporteZ FROM reportesMermas ORDER BY fechareporteZ DESC")
    if valor ==8:
        cur.execute("SELECT descripcion,total,to_char(fechamovimiento, 'YYYY-MM-DD HH24:MI:SS') As fechamovimiento, usuarios.usuario FROM movimientos JOIN usuarios ON usuarios.idusuario=movimientos.idusuario WHERE (razon='carga' AND fechamovimiento>current_date-interval '5' day) ORDER BY fechamovimiento DESC")
    rows=cur.fetchall()
    conn.close()
    cur.close()
    return jsonify(rows)


@app.route('/inventario/getInventario/<int:valor>', methods=['GET'])
def selectall(valor):
    conn=conexion()
    cur=conn.cursor(cursor_factory= RealDictCursor)
    if valor ==1:
        cur.execute("SELECT * FROM ingredientes")
    if valor ==4:
        cur.execute("SELECT * FROM ingredientes WHERE cantidadnotificacioningrediente>cantidadingrediente")
    if valor ==6:
        cur.execute("SELECT * FROM ingredientes")
    if valor ==2:
        cur.execute("SELECT idproducto,nombreproducto,precioproducto,costoproducto,descripcionproducto,idcategoria,idunidad,cantidadproducto,cantidadnotificacionproducto FROM productos")
    if valor ==3:
        cur.execute("SELECT idproducto,nombreproducto,precioproducto,costoproducto,descripcionproducto,idcategoria,idunidad,cantidadproducto,cantidadnotificacionproducto FROM productos WHERE cantidadnotificacionproducto>cantidadproducto")
    if valor ==5:
        cur.execute("SELECT idproducto,nombreproducto,precioproducto,costoproducto,descripcionproducto,idcategoria,idunidad,cantidadproducto,cantidadnotificacionproducto FROM productos")
    rows=cur.fetchall()
    conn.close()
    cur.close()
    return jsonify(rows)

@app.route('/inventario/getActualIngredient/<ids>',  methods=['GET'])
def getIngredientsInv(ids):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT a.idunidad, a.cantidadingrediente, a.idingrediente, a.nombreingrediente, a.cantidadnotificacioningrediente, b.idproveedor, b.costo, c.nombreproveedor FROM ingredientes a LEFT JOIN ingredientesproveedores b ON a.idingrediente=b.idingrediente LEFT JOIN proveedores c ON c.idproveedor=b.idproveedor WHERE a.idingrediente = '{0}' ORDER BY a.nombreingrediente".format(ids) 
    cur.execute(sql,ids) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/inventario/insertProduct', methods=['POST'])
def insercionProductInv():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""INSERT INTO productos (idproducto, nombreproducto, descripcionproducto, precioproducto, costoproducto, idcategoria, cantidadnotificacionproducto, idunidad, cantidadproducto) values(%(productcode)s,%(productname)s,%(productdescrip)s,%(productprice)s,%(productcost)s,1, %(productstocknotif)s,%(productunidad)s, %(productstock)s)"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='added succesfully');

@app.route('/inventario/editProduct', methods=['PUT'])
def editionProductInv():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""UPDATE productos SET nombreproducto=%(productname)s, descripcionproducto=%(productdescrip)s, precioproducto=%(productprice)s, costoproducto=%(productcost)s, idcategoria=1, cantidadnotificacionproducto=%(productstocknotif)s, idunidad=%(productunidad)s, cantidadproducto= %(stockParcial1)s WHERE idproducto=%(productcode)s"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='edited succesfully');

@app.route('/inventario/editProductMerma', methods=['PUT'])
def editionProductMermaInv():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""UPDATE productos SET cantidadproducto= %(stockParcial1)s WHERE idproducto=%(productcode)s"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='edited succesfully');

@app.route('/inventario/editIngredientMerma', methods=['PUT'])
def editionIngredientMermaInv():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""UPDATE ingredientes SET cantidadingrediente= %(stockParcial1)s WHERE idingrediente=%(productcode)s"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='edited succesfully');

@app.route('/inventario/editIngredient', methods=['PUT'])
def editionIngredientInv():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""UPDATE ingredientes SET nombreingrediente=%(productname)s, cantidadingrediente=%(stockParcial1)s, cantidadnotificacioningrediente=%(productstocknotif)s, idunidad=%(productunidad)s WHERE idingrediente=%(productcode)s"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='edited succesfully');

@app.route('/inventario/editProveedorPro', methods=['PUT'])
def editionProveedorPro():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""UPDATE proveedores SET nombreproveedor=%(productproveedor)s WHERE idproveedor=%(productidproveedor)s"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='edited succesfully');

@app.route('/inventario/editCategoriaPro', methods=['PUT'])
def editionCategoriaPro():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""UPDATE categorias SET nombrecategoria=%(productcategoria)s WHERE idcategoria=%(productIdcategoria)s"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='edited completely succesfully');

@app.route('/inventario/editProveedorPro2', methods=['PUT'])
def editionProveedorPro2():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""UPDATE productosproveedores SET idproveedor=%(productidproveedor)s,costo=%(productcost)s,cantidad=%(productstock)s, fecha=NOW() WHERE idproducto=%(productcode)s"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='edited succesfully');

@app.route('/inventario/editProveedorIng2', methods=['PUT'])
def editionProveedorIng2():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""UPDATE ingredientesproveedores SET idproveedor=%(productidproveedor)s,costo=%(productcost)s,cantidad=%(productstock)s, fecha=NOW() WHERE idingrediente=%(productcode)s"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='edited succesfully');

@app.route('/inventario/insertIngredient', methods=['POST'])
def insercionIngredientInv():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""INSERT INTO ingredientes (idingrediente,nombreingrediente,cantidadingrediente, idunidad,cantidadnotificacioningrediente) values(%(productcode)s,%(productname)s,%(productstock)s,%(productunidad)s,%(productstocknotif)s)"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='added succesfully');

@app.route('/inventario/mermaProducto', methods=['POST'])
def insercionMermaProducto():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""INSERT INTO reportesmermas(idproducto,cantidadmerma, descripcionmerma,fechareporte,nombreproducto,idunidad)values(%(productcode)s,%(productcantidad)s,%(productdescrip)s, NOW(),%(productname)s,%(productunidad)s )"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='added succesfully');

@app.route('/inventario/getProveedor/<proveedor>',  methods=['GET'])
def getProveedor(proveedor):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT * FROM proveedores WHERE nombreproveedor = '{0}'".format(proveedor) 
    cur.execute(sql,proveedor) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/inventario/getCategoria/<categoria>',  methods=['GET'])
def getCategoria(categoria):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT * FROM categorias WHERE nombrecategoria = '{0}'".format(categoria) 
    cur.execute(sql,categoria) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/inventario/getActualProveedorId/<idproducto>',  methods=['GET'])
def getProveedorId(idproducto):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT idproveedor FROM productosproveedores WHERE idproducto = '{0}'".format(idproducto) 
    cur.execute(sql,idproducto) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/inventario/getActualProveedorIdIng/<idingrediente1>',  methods=['GET'])
def getProveedorIdIng(idingrediente1):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT idproveedor,costo FROM ingredientesproveedores WHERE idingrediente = '{0}'".format(idingrediente1) 
    cur.execute(sql,idingrediente1) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/inventario/getActualProveedorName/<idproveedor>',  methods=['GET'])
def getProveedorName(idproveedor):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT nombreproveedor FROM proveedores WHERE idproveedor = {0}".format(idproveedor) 
    cur.execute(sql,idproveedor) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/inventario/insertProveedor', methods=['POST'])
def insercionProveedor():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""INSERT INTO proveedores(compania,nombreproveedor,direccionproveedor,telproveedor)values('',%(productproveedor)s,'',0)"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='added succesfully');

@app.route('/inventario/insertCategoria', methods=['POST'])
def insercionCategoria():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""INSERT INTO categorias(nombrecategoria)values(%(productcategoria)s)"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='added succesfully');

@app.route('/inventario/insertCategoria2', methods=['PUT'])
def insercionCategoria2():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""UPDATE productos SET idcategoria=%(idcategoria1)s WHERE idproducto=%(productcode)s"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='la inserción se realizó con éxito');

@app.route('/inventario/insertProveedorProduct', methods=['POST'])
def insercionProveedorProducto():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""INSERT INTO productosproveedores(idproveedor, idproducto, cantidad,costo, fecha)values(%(idproveedor1)s,%(productcode)s,%(productstock)s, %(productcost)s, NOW())"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='added succesfully');

@app.route('/inventario/insertProveedorIng', methods=['POST'])
def insercionProveedorIngrediente():
    conn=conexion()
    cur=conn.cursor()
    data=request.json
    sql="""INSERT INTO ingredientesproveedores(idproveedor, cantidad,costo, fecha, idingrediente)values(%(idproveedor1)s,%(productstock)s, %(productcost)s, NOW(),%(productcode)s)"""
    cur.execute(sql, data)
    conn.commit()
    conn.close()
    cur.close()
    return jsonify(msg='added succesfully');
    
## ------------------ Operaciones de contabilidad ---------------##

@app.route('/contabilidad/sumaParciales/<fecha>',  methods=['GET'])
def getSumaParciales(fecha):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT SUM(total) FROM movimientos WHERE fechamovimiento>='{0}' AND razon='parcial'".format(fecha)
    cur.execute(sql) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/contabilidad/ultimosMovimientos/<fecha>',  methods=['GET'])
def getultimosMovimientos(fecha):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT to_char(fechamovimiento, 'YYYY-MM-DD HH24:MI:SS') As fechamovimiento,razon,descripcion,total,usuarios.usuario FROM movimientos JOIN usuarios ON movimientos.idusuario=usuarios.idusuario WHERE fechamovimiento>='{0}' AND (razon='parcial' OR razon='observacion') ORDER BY fechamovimiento DESC".format(fecha)
    cur.execute(sql) 
    row = cur.fetchall()
    conn.close()
    return jsonify(row)

@app.route('/contabilidad/inversionPeriodoPasado/<fecha>',  methods=['GET'])
def getInversionPeriodoPasado(fecha):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT SUM(total) FROM movimientos WHERE fechamovimiento>='{0}' AND razon='carga'".format(fecha)
    cur.execute(sql, fecha) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/contabilidad/ultimosAperturas',  methods=['GET'])
def getultimosAperturas():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT to_char(fechaapertura, 'YYYY-MM-DD HH24:MI:SS') As fechaapertura,idcortecaja,saldoapertura FROM cortescaja ORDER BY fechaapertura DESC"
    cur.execute(sql) 
    row = cur.fetchall()
    conn.close()
    return jsonify(row)

@app.route('/contabilidad/editApertura', methods=['PUT'])
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

@app.route('/contabilidad/ultimoApertura',  methods=['GET'])
def getultimoApertura():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT to_char(fechaapertura, 'YYYY-MM-DD HH24:MI:SS') As fechaapertura,idcortecaja,saldoapertura FROM cortescaja ORDER BY fechaapertura DESC"
    cur.execute(sql) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/contabilidad/insertContabilidadMovimiento', methods=['POST'])
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

@app.route('/contabilidad/insertPrimerApertura', methods=['POST'])
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

@app.route('/contabilidad/insertCierre', methods=['POST'])
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

@app.route('/contabilidad/DatosUltimoCierre',  methods=['GET'])
def getUltimoCierre():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT usuarios.idusuario,usuario,totalcorte,saldoapertura,to_char(fechacorte, 'DD/MM/YYYY HH24:MI:SS') As fechacorte, to_char(fechaapertura, 'DD/MM/YYYY HH24:MI:SS') As fechaapertura FROM usuarios JOIN cortescaja ON usuarios.idusuario=cortescaja.idusuario ORDER BY fechacorte DESC "
    cur.execute(sql) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/contabilidad/VentasHastaAhora/<fecha>',  methods=['GET'])
def getVentasDesdeApertura(fecha):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT SUM(totalventa) FROM ventas WHERE fechaventa>='{0}' AND idpago=1".format(fecha)
    cur.execute(sql, fecha) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/contabilidad/VentasHastaAhoraTarjetas/<fecha>',  methods=['GET'])
def getVentasHoyT(fecha):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT SUM(totalventa) FROM ventas WHERE fechaventa>='{0}' AND idpago=2".format(fecha)
    cur.execute(sql, fecha) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/contabilidad/VentasHastaAhoraVales/<fecha>',  methods=['GET'])
def getVentasHoyV(fecha):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT SUM(totalventa) FROM ventas WHERE fechaventa>='{0}' AND idpago=3".format(fecha)
    cur.execute(sql, fecha) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/contabilidad/CajaHastaAhora/<fecha>',  methods=['GET'])
def getCajaHoy(fecha):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT totalcorte,saldoapertura FROM cortescaja ORDER BY fechacorte DESC"
    cur.execute(sql, fecha) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/contabilidad/GastosCaja/<fecha>',  methods=['GET'])
def getRetirosHoy(fecha):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT SUM(total) FROM movimientos WHERE fechamovimiento>='{0}' AND razon = 'retiro' ".format(fecha)
    cur.execute(sql, fecha) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/contabilidad/CambiosCaja/<fecha>',  methods=['GET'])
def getCambiosHoy(fecha):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT SUM(total) FROM movimientos WHERE fechamovimiento>='{0}' AND razon = 'cambio' ".format(fecha)
    cur.execute(sql, fecha) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)


##-------------Rutas para agregar productos------------##


#Obtiene la lista de unidades ordenadas por el id
@app.route('/api/products/units',  methods=['GET'])
def getUnits():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT * FROM unidades ORDER BY idunidad")
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

#Obtiene la lista de ingredientes con el nombre de la unidad
@app.route('/api/ingredients',  methods=['GET'])
def getListIngredients():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT a.idingrediente, a.nombreingrediente, b.nombreunidad FROM ingredientes a LEFT JOIN unidades b ON a.idunidad=b.idunidad")
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

#Verifica que la categoria no exista y si no existe la agrega y devuelve idcategoria
@app.route('/api/products/category',  methods=['POST'])
def newCategory():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    data=request.json
    sql="SELECT * FROM categorias WHERE nombrecategoria= '{0}'".format(data['namecategory'])
    cur.execute(sql)
    row = cur.fetchone()
    cur.close()
    if (row!=None):
        conn.close()
        return jsonify(0)
    else:
        cur = conn.cursor()
        sql = "INSERT INTO categorias (nombrecategoria) VALUES (%(namecategory)s)"
        cur.execute(sql, data)
        cur.close()
        cur1 = conn.cursor()
        sql="SELECT idcategoria FROM categorias WHERE nombrecategoria= '{0}'".format(data['namecategory'])
        cur1.execute(sql)
        row1 = cur1.fetchone()
        conn.commit()
        conn.close()
        cur1.close()
        return jsonify(row1)

#Devuelve lista de productos con el nombre y su id
@app.route('/api/products',  methods=['GET'])
def getListProducts():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT nombreproducto, idproducto FROM productos")
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

#Inserta un nuevo modificador e inserta en la tabla de productosmodificadores y devuelve idmodificador del modificador insertado
@app.route('/api/products/modifiers/<idproducto>', methods=['POST'])
def newModifier(idproducto):
    conn = conexion()
    cur = conn.cursor()
    data = request.json
    sql = "INSERT INTO modificadores (nombremodificador, preciomodificador,obligatorio) VALUES ('{0}', '{1}', '{2}') RETURNING idmodificador".format(data['namemodifier'],data['pricemodifier'],data['requiredchecked'])
    if(data['idmodifieroriginal']==''):
        cur.execute(sql, data)
        idmodificador= cur.fetchone()
        d = {}
        d['idproduct'] = idproducto
        d['idmodifier'] = idmodificador[0]
    else:
        d = {}
        d['idmodifier']=data['idmodifieroriginal']
        d['idproduct'] = idproducto
        idmodificador=[1]
    sql2 = "INSERT INTO productosmodificadores (idproducto, idmodificador) VALUES ('{0}', '{1}')".format(d['idproduct'],d['idmodifier'])
    cur.execute(sql2, d)
    conn.commit()
    cur.close()
    conn.close()
    return jsonify(idmodificador[0])

#Inserta una nueva opcion e inserta en la tabla modificadoresopciones
@app.route('/api/products/modifiers/options/<idmodificador>', methods=['POST'])
def newOptionModifier(idmodificador):
    conn = conexion()
    cur = conn.cursor()
    data = request.json
    if(data['idoptionmodifieroriginal']==''):
        sql = "INSERT INTO opciones (nombreopcion, precioopcionmodificador,idingrediente,opcionporcion) VALUES ('{0}', '{1}','{2}','{3}') RETURNING idopcionmodificador".format(data['name'],data['price'],data['idingredient'],data['portion'])
        cur.execute(sql, data)
        idopcion= cur.fetchone()
        d = {}
        d['idoption'] = idopcion[0]
        d['idmodifier'] = idmodificador
        sql2 = "INSERT INTO modificadoresopciones (idmodificador, idopcionmodificador) VALUES ('{0}', '{1}')".format(d['idmodifier'],d['idoption'])
        cur.execute(sql2, d)
        conn.commit()
        conn.close()
        cur.close()
    return jsonify(1)

#Inserta un nuevo complemento
@app.route('/api/products/complements/<idproducto>', methods=['POST'])
def newComplement(idproducto):
	conn = conexion()
	cur = conn.cursor()
	data = request.json
	sql = "INSERT INTO complementos (nombrecomplemento, preciocomplemento, idproducto, descripcioncomplemento,idproductooriginal,tipocomplemento) VALUES ('{0}', '{1}', '{2}', '{3}','{4}','{5}')".format(data['namecomplement'],data['pricecomplement'],idproducto,data['descriptioncomplement'],data['idproduct'],data['typecomplement'])
	cur.execute(sql, data)
	conn.commit()
	conn.close()
	cur.close()
	return jsonify(1)

#Inserta un nuevo ingrediente
@app.route('/api/products/ingredients/<idproducto>', methods=['POST'])
def newIngredient(idproducto):
	conn = conexion()
	cur = conn.cursor()
	data = request.json
	sql = "INSERT INTO productosingredientes (idproducto, idingrediente, porcion) VALUES ('{0}', '{1}', '{2}')".format(idproducto,data['idingredient'],data['portioningredient'])
	cur.execute(sql, data)
	conn.commit()
	conn.close()
	cur.close()
	return jsonify(1)

@app.route('/api/products', methods=['POST'])
def newProduct():
	conn = conexion()
	cur = conn.cursor()
	data = request.json
	sql = "INSERT INTO productos (idproducto, nombreproducto, precioproducto, costoproducto, descripcionproducto, idcategoria, idunidad, cantidadproducto,cantidadnotificacionproducto, imagebproducto ) VALUES (%(idproduct)s, %(nameproduct)s, %(priceproduct)s, %(costproduct)s, %(descriptionproduct)s, %(categoryproduct)s, %(unitproduct)s, %(stockinitproduct)s, %(stocknotifiproduct)s , %(imageproduct)s)"
	cur.execute(sql, data)
	conn.commit()
	conn.close()
	cur.close()
	return jsonify(1)

#Obtiene la lista de las categorias ordenanadas por abecedario
@app.route('/api/products/categories',  methods=['GET'])
def getCategoriesProducts():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT * FROM categorias ORDER BY nombrecategoria ASC ")
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/api/products/modifiers',  methods=['GET'])
def getModifiers():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT idmodificador as idmodifieroriginal, nombremodificador as namemodifier, preciomodificador as pricemodifier, obligatorio as requiredchecked FROM modificadores ")
    modifiers = cur.fetchall()
    cur2 = conn.cursor(cursor_factory=RealDictCursor)
    cur2.execute("SELECT a.idmodificador as idmodifier, a.idopcionmodificador as idoptionmodifieroriginal, b.nombreopcion as name, b.idingrediente as idingredient, c.nombreingrediente as nameingredient, b.precioopcionmodificador as price, b.opcionporcion as portion FROM modificadoresopciones a LEFT JOIN opciones b ON a.idopcionmodificador=b.idopcionmodificador LEFT JOIN ingredientes c ON b.idingrediente=c.idingrediente")
    options =cur2.fetchall()
    for modifier in modifiers:
       print(modifier)
       modifier['optionsmodifier']=[]
       modifier['idmodifier']=0
       modifier['name']=modifier['namemodifier']
       for option in options:
        if(option['idmodifier']==modifier['idmodifieroriginal']):
            modifier['optionsmodifier'].append(option)
    conn.close()
    return jsonify(modifiers)

##---------- Configuraciones de los Temas ---------------##
#@app.route('/general/getActualTheme/<nombre>',  methods=['GET'])
#def getProductsInv(nombre):
#    conn = conexion()
#    cur = conn.cursor(cursor_factory=RealDictCursor)
#    sql="SELECT id_tema FROM temas WHERE nombre_tema = '{0}'".format(nombre)
#    cur.execute(sql, nombre) 
#    row = cur.fetchone()
#    conn.close()
#    return jsonify(row)

@app.route('/configuracion/editTema', methods=['PUT'])
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

@app.route('/configuracion/editPermisoEmpleados', methods=['PUT'])
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

@app.route('/configuracion/editPermisoInventarios', methods=['PUT'])
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

@app.route('/configuracion/editPermisoConfiguracion', methods=['PUT'])
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

@app.route('/configuracion/editPermisoGestor', methods=['PUT'])
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

@app.route('/configuracion/editPermisoProductos', methods=['PUT'])
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

@app.route('/configuracion/editPermisoVentas', methods=['PUT'])
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

@app.route('/configuracion/editPermisoContabilidad', methods=['PUT'])
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

@app.route('/configuracion/getTemasEs',  methods=['GET'])
def getTema():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT * FROM temas WHERE idtema=1"
    cur.execute(sql) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/configuracion/getEmpleados',  methods=['GET'])
def getTEmpleados():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT idempleado,nombreempleado FROM empleados"
    cur.execute(sql) 
    row = cur.fetchall()
    conn.close()
    return jsonify(row)

@app.route('/configuracion/getIdusuario/<idempleado>',  methods=['GET'])
def getTUsuario(idempleado):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT idusuario FROM usuarios WHERE idempleado={0}".format(idempleado)
    cur.execute(sql) 
    row = cur.fetchone()
    conn.close()
    return jsonify(row)

@app.route('/configuracion/getPermisos/<userid>',  methods=['GET'])
def getTPermisos(userid):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql="SELECT idpermiso, acceso FROM permisosusuarios WHERE idusuario={0}".format(userid)
    cur.execute(sql) 
    row = cur.fetchall()
    conn.close()
    return jsonify(row)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


#python3 -m venv venv
#activar entorno virtual
#venv\Scripts\activate
