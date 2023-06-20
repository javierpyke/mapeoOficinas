const express = require('express')
const app = express()
const port = 3000
const CentroServicios = require('../servicios/centroPropioServicios')
const EquipoServicios = require('../servicios/equipoServicios')
const EncargadoServicios = require('../servicios/encargadoServicios')
const TiposDeEquipos = require('../clases/tipos/tiposDeEquipos')


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
    response.send(`Puesto agregado`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/centro', verCentro)

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


/******************************* TECLADO *********************************/

const obtenerTeclado = async (request, response) => {
  const equipoServicios = new EquipoServicios()
  try {
    const equipo = await equipoServicios.obtenerTeclado(parseInt(request.query.numeroDeInventario))
    response.send(`<html><body>
                    <ul><li>${equipo.getInformacion()}</li></ul></body></htmtl>`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/teclado', obtenerTeclado)

const obtenerTecladosLibres = async (request, response) => {
  const equipoServicios = new EquipoServicios()
  try {
    const equipos = await equipoServicios.obtenerTecladosLibres()
    response.send(`<html><body>
                    <ul>${equipos.map(equipo =>
                    `<li>${equipo.getInformacion()}</li>
                    `)}</ul></body></htmtl>`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/tecladosLibres', obtenerTecladosLibres)

const obtenerTeclados = async (request, response) => {
  const equipoServicios = new EquipoServicios()
  try {
    const equipos = await equipoServicios.obtenerTeclados()
    console.log(equipos)
    response.send(`<html><body>
                    <ul>${equipos.map(equipo =>
                    `<li>${equipo.getInformacion()}</li>
                    `)}</ul></body></htmtl>`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/teclados', obtenerTeclados)

const crearTeclado = async (request, response) => {
  const equipoServicios = new EquipoServicios()
  try {
    const teclado = await equipoServicios.crearTeclado(request.query)
    await equipoServicios.guardar(teclado)
    response.send(`Teclado creado`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/teclado', crearTeclado)

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

/*************************************************************************/


app.listen(port, () => {
  console.log(`Nuestro server está funcionando bien en el port ${port}`)
})