from flask import Flask,request,jsonify #pip install Flask
import psycopg2  #pip install psycopg2
from psycopg2.extras import RealDictCursor
from flask_cors import CORS #pip install flask-cors

app = Flask(__name__)
CORS(app)

def conexion():
    return psycopg2.connect(
    host="localhost",
    database="puntoventa",
    user="postgres",
    password="maira")

@app.route('/api',  methods=['GET'])
def index():
    conn = conexion()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT idempleado, nombreempleado, to_char(fechacontra, 'DD/MM/YYYY') as fechacontra, dirempleado, telempleado, emailempleado FROM empleados ORDER BY idempleado")
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

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
