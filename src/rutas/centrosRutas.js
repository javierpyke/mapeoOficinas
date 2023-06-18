const express = require('express')
const app = express()
const port = 3000
const CentroServicios = require('../servicios/centroPropioServicios')
const EquipoServicios = require('../servicios/equipoServicios')
const MouseServicios = require('../servicios/mouseServicios')
const EncargadoServicios = require('../servicios/encargadoServicios')


const agregarCentro = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {
    await centroServicios.crear(request.query)
    await centroServicios.guardar()
    response.send(`Centro agregado`)
  } catch(e){
    response.send(e.message)
  }  

}

app.post('/centro', agregarCentro)

const agregarPuesto = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {    
    await centroServicios.agregarPuesto(request.query.numeroDeCentro)
    response.send(`Puesto agregado`)
  } catch(e){
    response.send(e.message)
  }  

}

app.post('/puesto', agregarPuesto)

const verCentro = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {    
    const centro = await centroServicios.buscar(request.query.numeroDeCentro)
    console.log(await centroServicios.buscar(request.query.numeroDeCentro))
    console.log(centro.puestos)
    response.send(`Puesto agregado`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/centro', verCentro)

const crearTeclado = async (request, response) => {
  const equipoServicios = new EquipoServicios()
  try {
    const teclado = await equipoServicios.crearTeclado(request.query)
    await equipoServicios.guardar(teclado)
    response.send(`Teclado agregado`)
  } catch(e){
    response.send(e.message)
  }

  
}

app.post('/teclado', crearTeclado)

const agregarEncargado = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {    
    await centroServicios.agregarEncargado(request.query)
    response.send(`Encargado agregado`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/centro/agregarEncargado', agregarEncargado)

const eliminarEncargado = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {    
    await centroServicios.eliminarEncargado(request.query)
    response.send(`Encargado eliminado`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/centro/eliminarEncargado', eliminarEncargado)

const agregarTeclado = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {    
    await centroServicios.agregarTeclado(request.query)
    response.send(`Teclado agregado`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/centro/agregarTeclado', agregarTeclado)

const quitarTeclado = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {    
    await centroServicios.quitarTeclado(request.query)
    response.send(`Se ha quitado el teclado`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/centro/quitarTeclado', quitarTeclado)

const crearMouse = async (request, response) => {
  const mouseServicios = new MouseServicios()
  await mouseServicios.crearMouse(request.query)
  await mouseServicios.guardarMouse()
  response.send(`Mouse agregado`)
}

app.post('/mouse', crearMouse)

const agregarMouse = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {    
    await centroServicios.agregarMouse(request.query)
    response.send(`Puesto agregado`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/centro/agregarMouse', agregarMouse)

const crearEncargado = async (request, response) => {
  const encargadoServicios = new EncargadoServicios()
  try {
    await encargadoServicios.crear(request.query)
    await encargadoServicios.guardar()
    response.send(`Encargado agregado`)
  } catch(e) {
    response.send(e.message)
  }  
  
}

app.post('/encargado', crearEncargado)


app.listen(port, () => {
  console.log(`Nuestro server está funcionando bien en el port ${port}`)
})