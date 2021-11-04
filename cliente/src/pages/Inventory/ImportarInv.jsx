import React,{useState} from 'react'
import XLSX from 'xlsx'
import formato from './imgs/excelformato.png'
import PacmanLoader from "react-spinners/PacmanLoader";
import Swal from 'sweetalert2'

export default function ImportarInv() {
  const [products, setProducts] = useState([]);
  const [infovalida, setInfovalida] = useState(false);
  const [habilitaring, setHabilitaring] = useState(false);
  const [registrarhab, setRegistrarhab] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleImportIngredients = () => {
    setHabilitaring(!habilitaring);
  };

  const convertToJson = (headers, data) => {
    const rows = [];
    data.forEach((row) => {
      let rowData = {};
      row.forEach((element, index) => {
        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });
    return rows;
  };

  const importExcel = (e) => {
    setInfovalida(false);

    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      ////////parse data
      const bstr = event.target.result;
      const workBook = XLSX.read(bstr, { type: "binary" });

      //get first sheet

      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      //convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      //console.log(fileData)
      const headers = fileData[0];
      fileData.splice(0, 1);
      const info = convertToJson(headers, fileData);
      setProducts(info);
    };
    reader.readAsBinaryString(file);
  };

  const showProducts = () => {
    setInfovalida(true);
    setRegistrarhab(false);
  };

  const importInf = () => {
    setRegistrarhab(true);
    setLoading(true);

    const vainilla = products.map(async (product) => {
      const productcode = product.Codigo;
      const productname = product.Producto;
      const productcost = product.Costo;
      const productprice = product.Precio;
      const productdescrip = product.Descripcion;
      const productunidad = product.Unidad;
      const productstock = product.Stock;
      const productproveedor = product.Proveedor;
      const productcategoria = product.Categoria;
      const productstocknotif = product.Notificacion;

      const traduccionUnidades = () => {
        var unidad = "";
        if (productunidad === 1) unidad = "kg";
        else if (productunidad === 2) unidad = "gramos";
        else if (productunidad === 3) unidad = "Litros";
        else if (productunidad === 4) unidad = "ml";
        else unidad = "unidades";
        return unidad;
      };

      if (habilitaring === false) {
        const res = await fetch(
          `http://localhost:5000/inventario/insertProduct`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productcode,
              productname,
              productdescrip,
              productprice,
              productcost,
              productstock,
              productunidad,
              productstocknotif,
            }),
          }
        );
        const data = await res.json();
        console.log(data);

        const res1 = await fetch(
          `http://localhost:5000/inventario/getProveedor/${productproveedor}`
        );
        const data1 = await res1.json();

        /////Si no existe ese nombre de proveedor, crearlo////
        if (data1 === null) {
          const res2 = await fetch(
            `http://localhost:5000/inventario/insertProveedor`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                productproveedor,
              }),
            }
          );
          const data2 = await res2.json();
          console.log(data2);
        }
        /////Se consigue el id del proveedor recien creado//////////////////
        const res3 = await fetch(
          `http://localhost:5000/inventario/getProveedor/${productproveedor}`
        );
        const data3 = await res3.json();
        console.log(data3.idproveedor);
        const idproveedor1 = data3.idproveedor;
        //////////al conseguirse el id del proveedor, se inserta este y los demas datos a proveedor-producto///
        const res4 = await fetch(
          `http://localhost:5000/inventario/insertProveedorProduct`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idproveedor1,
              productstock,
              productcost,
              productcode,
            }),
          }
        );
        const data4 = await res4.json();
        console.log(data4);

        /////Ahora la categoria
        const res5 = await fetch(
          `http://localhost:5000/inventario/getCategoria/${productcategoria}`
        );
        const data5 = await res5.json();
        /////Si no existe ese nombre de categoria, crearla////
        if (data5 === null) {
          const res6 = await fetch(
            `http://localhost:5000/inventario/insertCategoria`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                productcategoria,
              }),
            }
          );
          await res6.json();
        }
        /////Se consigue el id de la categoria recien creada//////////////////
        const res7 = await fetch(
          `http://localhost:5000/inventario/getCategoria/${productcategoria}`
        );
        const data7 = await res7.json();
        const idcategoria1 = data7.idcategoria;
        ////////////////el id de la categoria se inserta en la tabla productos///////////////////
        const res8 = await fetch(
          `http://localhost:5000/inventario/insertCategoria2`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productcode,
              idcategoria1,
            }),
          }
        );
        const data8 = await res8.json();
        console.log(data8);
        //////////////////////Insercion del movimiento de productos///////////////////////
        var totalinversion = parseFloat(productcost) * parseFloat(productstock);
        var unidad = traduccionUnidades();
        var descripcionmov =
          "Se ingreso " + productstock + unidad + " de (" + productname + ")";
        var razon = "carga";
        var tipo = "entradaInventario";
        const res9 = await fetch(
          `http://localhost:5000/inventario/insertInventarioMovimiento`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              totalinversion,
              descripcionmov,
              razon,
              tipo,
            }),
          }
        );
        const data9 = await res9.json();
        console.log(data9);
      } else {
        /////////////////////////Inserción si se trata de ingredientes///////////////////////////////////
        const res = await fetch(
          `http://localhost:5000/inventario/insertIngredient`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productcode,
              productname,
              productstocknotif,
              productstock,
              productunidad,
            }),
          }
        );
        const data = await res.json();
        console.log(data);
        ///////////inserción de la parte de proveedores/////////////////////////////
        const res1 = await fetch(
          `http://localhost:5000/inventario/getProveedor/${productproveedor}`
        );
        const data1 = await res1.json();
        /////Si no existe ese nombre de proveedor, crearlo////
        if (data1 === null) {
          const res2 = await fetch(
            `http://localhost:5000/inventario/insertProveedor`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                productproveedor,
              }),
            }
          );
          const data2 = await res2.json();
          console.log(data2);
        }
        /////Se consigue el id del proveedor recien creado//////////////////
        const res3 = await fetch(
          `http://localhost:5000/inventario/getProveedor/${productproveedor}`
        );
        const data3 = await res3.json();
        const idproveedor1 = data3.idproveedor;
        //////////al conseguirse el id del proveedor, se inserta este y los demas datos a proveedor-producto///
        const res4 = await fetch(
          `http://localhost:5000/inventario/insertProveedorIng`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idproveedor1,
              productstock,
              productcost,
              productcode,
            }),
          }
        );
        const data4 = await res4.json();
        console.log(data4);
        ///////////////////////Se inserta el movimiento de inventario///////////////////////////
        totalinversion = parseFloat(productcost) * parseFloat(productstock);
        unidad = traduccionUnidades();
        descripcionmov =
          "Se ingreso " + productstock + unidad + " de (" + productname + ")";
        razon = "carga";
        tipo = "entradaInventario";
        const res9 = await fetch(
          `http://localhost:5000/inventario/insertInventarioMovimiento`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              totalinversion,
              descripcionmov,
              razon,
              tipo,
            }),
          }
        );
        const data9 = await res9.json();
        console.log(data9);
        setLoading(false);
      }
    });

    Promise.all(vainilla).then((data) => {
      Swal.fire('Bien!','Tu información se registró correctamente','success');
      window.location.replace("/");
    });
  };

  return (
    <div className="container">
      {loading === true ? (
        <div
          className="d-flex justify-content-center align-items-center"
          id="cargascreen"
        >
          <div>
            <PacmanLoader size={30} color={"#123adc"} loading={loading} />
          </div>
        </div>
      ) : (
        <div className="row py-3">
          <div className="py-2 m-3 border" id="colors">
            <h1>Importa tus inventarios de un Excel!</h1>
          </div>
          <div id="colors">
            <h5>Instrucciones:</h5>
          </div>
          <div id="colors">
          <div className="m-2 border">
            <h6>1. Recuerda que tu excel debe llevar el siguiente formato:</h6>
            <div className="d-flex justify-content-center">
              <img
                src={formato}
                className="img-fluid"
                alt="formato del excel"
              />
            </div>
          </div>
          <div className="m-2 border">
            <h6>
              Las equivalencias de las unidades son: 1.Kg, 2.gramos, 3.Litros,
              4.Mililitros, 5.Unidad
            </h6>
          </div>
          <div className="py-2 m-2 border">
            <h6>2.Carga tu archivo:</h6>
            <input
              type="file"
              accept=".xlsx"
              className="form-control"
              onChange={importExcel}
            />
          </div>
          <div className="py-2 m-3 border">
            <h6>
              3.Presiona el botón para mostrar la información en la tabla:
            </h6>
            <button className="btn btn-outline-dark" onClick={showProducts}>
              Cargar información en tabla
            </button>
          </div>

          <div className="border">
            <h6>
              4.Presiona la casilla si lo que se importan son ingredientes y no
              productos que se venderán
            </h6>

            <div className="mb-3 form-check m-3 col-md-10 col-11 d-flex justify-content-center">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck2"
                checked={habilitaring}
                onChange={handleImportIngredients}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Se agrega como ingrediente???
              </label>
            </div>
          </div>

          <div className="m-2 border">
            <h6>
              5.Si la información que quieres importar es correcta, presiona
              este botón para insertar la información:
            </h6>
            <button
              className="btn btn-outline-dark"
              disabled={registrarhab}
              onClick={importInf}
            >
              Registrar la información
            </button>
          </div>

          <div className="col-12 table-responsive">
            <table className="table bg-white rounded shadow-sm table-hover">
              <thead>
                <tr>
                  <th scope="col">Código</th>
                  <th scope="col">Producto</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Costo</th>
                  <th scope="col">Precio de venta</th>
                  <th scope="col">Unidad</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Proveedor</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Notificacion</th>
                </tr>
              </thead>
              <tbody>
                {infovalida === true ? (
                  products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.Codigo}</td>
                      <td>{product.Producto}</td>
                      <td>{product.Descripcion}</td>
                      <td>{product.Costo}</td>
                      <td>{product.Precio}</td>
                      <td>{product.Unidad}</td>
                      <td>{product.Stock}</td>
                      <td>{product.Proveedor}</td>
                      <td>{product.Categoria}</td>
                      <td>{product.Notificacion}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No hay información válida</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
