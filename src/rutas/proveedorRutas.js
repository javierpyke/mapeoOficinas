const express = require('express')
const app = express()
const port = 3000
const ProveedorServicios = require('../servicios/proveedorServicios.js')


const agregarProveedor = async (request, response) => {
  const proveedorServicios = new ProveedorServicios()
  try {
    await proveedorServicios.crear(request.query)
    await proveedorServicios.guardar()
    response.send(`Proveedor agregado`)
  } catch(e){
    response.send(e.message)
  }  

}

app.post('/proveedor', agregarProveedor)


app.listen(port, () => {
  console.log(`Nuestro server está funcionando bien en el port ${port}`)
})