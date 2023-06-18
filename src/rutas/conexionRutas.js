const express = require('express')
const app = express()
const port = 3000
const ConexionServicios = require('../servicios/conexionServicios')


const agregarConexion = async (request, response) => {
  const conexionServicios = new ConexionServicios()
  try {
    await conexionServicios.crear(request.query)
    await conexionServicios.guardar()
    response.send(`Conexion agregada`)
  } catch(e){
    response.send(e.message)
  }  

}

app.post('/conexion', agregarConexion)


app.listen(port, () => {
  console.log(`Nuestro server está funcionando bien en el port ${port}`)
})