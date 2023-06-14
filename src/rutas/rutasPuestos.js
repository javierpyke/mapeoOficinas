const express = require('express')
const app = express()
const port = 3000
const RepositorioPersonas = require('./src/conexion/repositorios/prueba_repository')

// app.get('/personas', callback1, callback2, ... )
const controladorPersonas = async (request, response, next) => {
  const repositorioPersonas = new RepositorioPersonas()

  await repositorioPersonas.conectar()

  const params = request.query
 // console.log(repositorioPersonas)


  const personas = await repositorioPersonas.getAll()
  console.log(personas[0])

  response.status(200)
  response.send(`<html><body><pre>Listado de personas VIP</pre> <pre>${personas[0].nombre}</pre></body></htmtl>`)
  repositorioPersonas.desconectar()
}



const controladorAutorizacion = (request, response, next) => {
  const result = Math.random() < 0.5

  if (result) {
    console.log('Tiene acceso')
    response.set({ 'Acceso-Correcto' : true })
    next()
  } else {
    console.log('No tiene acceso')
    response.status(403) // Forbidden
    response.send('No se puede acceder')
  }

}

app.get('/personas', controladorAutorizacion, controladorPersonas)

const agregarPersona = async (request, response, next) => {
  const repositorioPersonas = new RepositorioPersonas()
  await repositorioPersonas.conectar()
  await repositorioPersonas.agregarPersona(request.query)
  repositorioPersonas.desconectar()
  response.send("Persona agregada")
}

app.post('/personas', agregarPersona)



app.listen(port, () => {
  console.log(`Nuestro server está funcionando bien en el port ${port}`)
})