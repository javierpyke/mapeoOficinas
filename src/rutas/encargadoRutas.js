const express = require('express')
const app = express()
const port = 3000
const EncargadoServicios = require('../servicios/encargadoServicios')


const agregarEncargado = async (request, response) => {
  const encargadoServicios = new EncargadoServicios()
  try {
    await encargadoServicios.crear(request.query)
    await encargadoServicios.guardar()
    response.send(`Encargado agregado`)
  } catch(e){
    response.send(e.message)
  }  

}

app.post('/encargado', agregarEncargado)


app.listen(port, () => {
  console.log(`Nuestro server está funcionando bien en el port ${port}`)
})