const express = require('express')
const app = express()
const port = 3000
const RepositorioCentros = require('./src/conexion/repositorios/repositorioCentros')

const controladorCentros = async (request, response) => {
  const repositorioCentros = new RepositorioCentros()
  await repositorioCentros.conectar()
  const centros = await repositorioCentros.getAll()
  console.log(centros[0])

  response.status(200)
  response.send("ok")
  repositorioCentros.desconectar()
}


app.get('/centros', controladorCentros)

const agregarCentro = async (request, response) => {
    const repositorioCentros = new RepositorioCentros()
    await repositorioCentros.conectar()
    await repositorioCentros.agregarCentro(request.query)
    repositorioCentros.desconectar()
    response.send("Centro agregado")
}

app.post('/centros', agregarCentro)


app.listen(port, () => {
  console.log(`Nuestro server está funcionando bien en el port ${port}`)
})