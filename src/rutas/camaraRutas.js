const express = require('express')
const app = express()
const port = 3000
const CamaraServicios = require('../servicios/camaraServicios')


const agregarCamara = async (request, response) => {
  const camaraServicios = new CamaraServicios()
  await camaraServicios.crearCamara(request.query)
  await camaraServicios.guardarCamara()
  response.send(`Camara agregada`)
}

app.post('/camara', agregarCamara)

const obtenerCamaras = async (request, response) => {
  const camaraServicios = new CamaraServicios()
  const camaras = await camaraServicios.obtenerCamaras()
  response.send(camaras)
}

app.get('/camara', obtenerCamaras)


app.listen(port, () => {
  console.log(`Nuestro server está funcionando bien en el port ${port}`)
})