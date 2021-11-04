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
    cur.execute("SELECT idproducto, nombreproducto, precioproducto, descripcionproducto FROM productos")
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

@app.route('/api/sales/products/<search>',  methods=['GET'])
def getProductByName(search):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql = ("SELECT idproducto, nombreproducto, precioproducto, descripcionproducto FROM productos WHERE nombreproducto = '{0}'".format(search))
    cur.execute(sql, search)
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/api/products/<id>',  methods=['GET'])
def getProduct(id):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sql = ("SELECT idproducto, nombreproducto, precioproducto, descripcionproducto FROM productos WHERE idproducto = '{0}'".format(id))
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
    sql="SELECT a.nombreempleado as nombreempleado, c.nombrecargo as nombrecargo FROM empleados a LEFT JOIN usuarios b ON a.idempleado=b.idempleado LEFT JOIN perfil c ON a.idcargo=c.idcargo WHERE b.usuario='{0}' AND b.contrasena='{1}'".format(data['username'],data['password'])
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
    cur.execute("SELECT complementos.idcomplemento, nombrecomplemento, preciocomplemento, descripcioncomplemento FROM complementos JOIN productoscomplementos ON productoscomplementos.idproducto = '{0}' AND complementos.idcomplemento = productoscomplementos.idcomplemento".format(id))
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/api/modifiers/<id>',  methods=['GET'])
def getListModifiers(id):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('''SELECT modificadores.idmodificador, nombremodificador, preciomodificador, obligatorio, multiple FROM modificadores INNER JOIN productosmodificadores 
                ON productosmodificadores.idproducto = '{0}' AND modificadores.idmodificador = productosmodificadores.idmodificador ORDER BY multiple'''.format(id))
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route('/api/options/<idmodificador>',  methods=['GET'])
def getListOptions(idmodificador):
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute('''SELECT opciones.idopcionmodificador, idmodificador, nombreopcion, precioopcionmodificador FROM opciones JOIN modificadoresopciones
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

os.makedirs(os.path.join(app.instance_path, 'uploads'), exist_ok=True)
IMAGE_FOLDER= os.path.join(app.instance_path, 'uploads')

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

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
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


#python3 -m venv venv
#activar entorno virtual
#venv\Scripts\activate
