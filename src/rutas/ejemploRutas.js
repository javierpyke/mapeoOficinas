const express = require('express')
const app = express()
const port = 3000
const RepositorioPuestos = require('../baseDeDatos/repositorios/repositorioPuestos')


const agregarPuesto = async (request, response) => {
  const repositorioPuesto = new RepositorioPuestos()
  await repositorioPuesto.conectar()
  await repositorioPuesto.agregarPuesto(request.query)
  repositorioPuesto.desconectar()
  response.send("Puesto agregado")
}

app.post('/puesto', agregarPuesto)

const agregarEquipo = async (request, response) => {
  const repositorioPuesto = new RepositorioPuestos()
  await repositorioPuesto.conectar()
  await repositorioPuesto.agregarPuesto(request.query)
  repositorioPuesto.desconectar()
  response.send("Puesto agregado")
}

app.post('/equipo', agregarEquipo)



app.listen(port, () => {
  console.log(`Nuestro server está funcionando bien en el port ${port}`)
})