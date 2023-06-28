const express = require('express')
const app = express()
const port = 3000
const CentroServicios = require('./src/servicios/centroServicios')
const EquipoServicios = require('./src/servicios/equipoServicios')
const EncargadoServicios = require('./src/servicios/encargadoServicios')
const TiposDeEquipos = require('./src/clases/tipos/tiposDeEquipos')
const TecladoFactory = require('./src/clases/equipo/tecladoFactory')
const MouseFactory = require('./src/clases/equipo/mouseFactory')
const MonitorFactory = require('./src/clases/equipo/monitorFactory')
const CpuFactory = require('./src/clases/equipo/cpuFactory')
const ConexionServicios = require('./src/servicios/conexionServicios')
const ProveedorServicios = require('./src/servicios/proveedorServicios.js')


/******************************* CENTRO **********************************/

const habilitarCentro = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {    
    await centroServicios.habilitar(request.query)
    response.send(`Centro habilitado`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/centro/habilitar', habilitarCentro)

const deshabilitarCentro = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {    
    await centroServicios.deshabilitar(request.query)
    response.send(`Centro deshabilitado`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/centro/deshabilitar', deshabilitarCentro)

const crearCentro = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {
    await centroServicios.crear(request.query)
    await centroServicios.guardar()
    response.send(`Centro creado`)
  } catch(e){
    response.send(e.message)
  }  

}

app.post('/centro', crearCentro)

const verCentro = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {    
    const centro = await centroServicios.buscar(request.query.numeroDeCentro)
    response.send(`<html><body><h3>${centro.getInformacion()}</h3>
                    <p>Encargado: ${centro.getEncargado()?centro.getEncargado().getInformacion():'no posee'}</p>
                    <p>Conexion: ${centro.getConexion()?centro.getConexion().getInformacion():'no posee'}</p>
    <ul>${centro.getPuestos().map(puesto =>
              `<li><p>Puesto ${centro.getNumeroDePuesto(puesto)} - ${puesto.estaHabilitado()?'HABILITADO':'NO HABILITADO'}</p>
                    <p>Teclado: ${puesto.getTeclado()?puesto.getTeclado().getInformacion():'no posee'}</p>
                    <p>Monitor: ${puesto.getMonitor()?puesto.getMonitor().getInformacion():'no posee'}</p>
                    <p>Mouse: ${puesto.getMouse()?puesto.getMouse().getInformacion():'no posee'}</p>
                    <p>Cpu: ${puesto.getCpu()?puesto.getCpu().getInformacion():'no posee'}</p>
                    `)}</li></ul></body></htmtl>`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/centro', verCentro)

const verCentros = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {    
    const centros = await centroServicios.obtenerCentros()
    response.send(`${centros.map(centro => `<html><body><h3>${centro.getInformacion()}</h3>
                    <p>Encargado: ${centro.getEncargado()?centro.getEncargado().getInformacion():'no posee'}</p>
                    <p>Conexion: ${centro.getConexion()?centro.getConexion().getInformacion():'no posee'}</p>
                    </li></ul></body></htmtl>`)}`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/centros', verCentros)

/*************************************************************************/

/******************************* TECLADO *********************************/

const obtenerTeclado = async (request, response) => {
  const equipoServicios = new EquipoServicios(TiposDeEquipos.Teclado, TecladoFactory)
  try {
    const equipo = await equipoServicios.obtenerEquipo(parseInt(request.query.numeroDeInventario))
    response.send(`<html><body>
                    <ul><li>${equipo.getInformacion()}</li></ul></body></htmtl>`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/teclado', obtenerTeclado)

const obtenerTecladosLibres = async (request, response) => {
  const equipoServicios = new EquipoServicios(TiposDeEquipos.Teclado, TecladoFactory)
  try {
    const equipos = await equipoServicios.obtenerEquiposLibres()
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
  const equipoServicios = new EquipoServicios(TiposDeEquipos.Teclado, TecladoFactory)
  try {
    const equipos = await equipoServicios.obtenerEquipos()
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
  const equipoServicios = new EquipoServicios(TiposDeEquipos.Teclado, TecladoFactory)
  try {
    const teclado = await equipoServicios.crearEquipo(request.query)
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

/******************************* MOUSE *********************************/

const obtenerMouse = async (request, response) => {
  const equipoServicios = new EquipoServicios(TiposDeEquipos.Mouse, MouseFactory)
  try {
    const equipo = await equipoServicios.obtenerEquipo(parseInt(request.query.numeroDeInventario))
    response.send(`<html><body>
                    <ul><li>${equipo.getInformacion()}</li></ul></body></htmtl>`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/mouse', obtenerMouse)

const obtenerMousesLibres = async (request, response) => {
  const equipoServicios = new EquipoServicios(TiposDeEquipos.Mouse, MouseFactory)
  try {
    const equipos = await equipoServicios.obtenerEquiposLibres()
    response.send(`<html><body>
                    <ul>${equipos.map(equipo =>
                    `<li>${equipo.getInformacion()}</li>
                    `)}</ul></body></htmtl>`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/mousesLibres', obtenerMousesLibres)

const obtenerMouses = async (request, response) => {
  const equipoServicios = new EquipoServicios(TiposDeEquipos.Mouse, MouseFactory)
  try {
    const equipos = await equipoServicios.obtenerEquipos()
    response.send(`<html><body>
                    <ul>${equipos.map(equipo =>
                    `<li>${equipo.getInformacion()}</li>
                    `)}</ul></body></htmtl>`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/mouses', obtenerMouses)

const crearMouse = async (request, response) => {
  const equipoServicios = new EquipoServicios(TiposDeEquipos.Mouse, MouseFactory)
  try {
    const mouse = await equipoServicios.crearEquipo(request.query)
    await equipoServicios.guardar(mouse)
    response.send(`Mouse creado`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/mouse', crearMouse)

const agregarMouse = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {    
    await centroServicios.agregarMouse(request.query)
    response.send(`Mouse agregado`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/centro/agregarMouse', agregarMouse)

const quitarMouse = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {    
    await centroServicios.quitarMouse(request.query)
    response.send(`Se ha quitado el mouse`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/centro/quitarMouse', quitarMouse)

/*************************************************************************/

/******************************* MONITOR *********************************/

const obtenerMonitor = async (request, response) => {
  const equipoServicios = new EquipoServicios(TiposDeEquipos.Monitor, MonitorFactory)
  try {
    const equipo = await equipoServicios.obtenerEquipo(parseInt(request.query.numeroDeInventario))
    response.send(`<html><body>
                    <ul><li>${equipo.getInformacion()}</li></ul></body></htmtl>`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/monitor', obtenerMonitor)

const obtenerMonitoresLibres = async (request, response) => {
  const equipoServicios = new EquipoServicios(TiposDeEquipos.Monitor, MonitorFactory)
  try {
    const equipos = await equipoServicios.obtenerEquiposLibres()
    response.send(`<html><body>
                    <ul>${equipos.map(equipo =>
                    `<li>${equipo.getInformacion()}</li>
                    `)}</ul></body></htmtl>`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/monitoresLibres', obtenerMonitoresLibres)

const obtenerMonitores = async (request, response) => {
  const equipoServicios = new EquipoServicios(TiposDeEquipos.Monitor, MonitorFactory)
  try {
    const equipos = await equipoServicios.obtenerEquipos()
    response.send(`<html><body>
                    <ul>${equipos.map(equipo =>
                    `<li>${equipo.getInformacion()}</li>
                    `)}</ul></body></htmtl>`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/monitores', obtenerMonitores)

const crearMonitor = async (request, response) => {
  const equipoServicios = new EquipoServicios(TiposDeEquipos.Monitor, MonitorFactory)
  try {
    const monitor = await equipoServicios.crearEquipo(request.query)
    await equipoServicios.guardar(monitor)
    response.send(`Monitor creado`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/monitor', crearMonitor)

const agregarMonitor = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {  
    await centroServicios.agregarMonitor(request.query)
    response.send(`Monitor agregado`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/centro/agregarMonitor', agregarMonitor)

const quitarMonitor = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {    
    await centroServicios.quitarMonitor(request.query)
    response.send(`Se ha quitado el monitor`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/centro/quitarMonitor', quitarMonitor)

/*************************************************************************/

/******************************* CPU *********************************/

const obtenerCpu = async (request, response) => {
  const equipoServicios = new EquipoServicios(TiposDeEquipos.Cpu, CpuFactory)
  try {
    const equipo = await equipoServicios.obtenerEquipo(parseInt(request.query.numeroDeInventario))
    response.send(`<html><body>
                    <ul><li>${equipo.getInformacion()}</li></ul></body></htmtl>`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/cpu', obtenerCpu)

const obtenerCpusLibres = async (request, response) => {
  const equipoServicios = new EquipoServicios(TiposDeEquipos.Cpu, CpuFactory)
  try {
    const equipos = await equipoServicios.obtenerEquiposLibres()
    response.send(`<html><body>
                    <ul>${equipos.map(equipo =>
                    `<li>${equipo.getInformacion()}</li>
                    `)}</ul></body></htmtl>`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/cpusLibres', obtenerCpusLibres)

const obtenerCpus = async (request, response) => {
  const equipoServicios = new EquipoServicios(TiposDeEquipos.Cpu, CpuFactory)
  try {
    const equipos = await equipoServicios.obtenerEquipos()
    response.send(`<html><body>
                    <ul>${equipos.map(equipo =>
                    `<li>${equipo.getInformacion()}</li>
                    `)}</ul></body></htmtl>`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/cpus', obtenerCpus)

const crearCpu = async (request, response) => {
  const equipoServicios = new EquipoServicios(TiposDeEquipos.Cpu, CpuFactory)
  try {
    const cpu = await equipoServicios.crearEquipo(request.query)
    await equipoServicios.guardar(cpu)
    response.send(`Cpu creado`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/cpu', crearCpu)

const agregarCpu = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {  
    await centroServicios.agregarCpu(request.query)
    response.send(`Cpu agregado`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/centro/agregarCpu', agregarCpu)

const quitarCpu = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {    
    await centroServicios.quitarCpu(request.query)
    response.send(`Se ha quitado el cpu`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/centro/quitarCpu', quitarCpu)

/*************************************************************************/

/******************************** PUESTO *********************************/

const agregarPuesto = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {    
    await centroServicios.agregarPuesto(request.query.numeroDeCentro)
    response.send(`Puesto agregado`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/centro/agregarPuesto', agregarPuesto)

const habilitarPuesto = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {    
    await centroServicios.habilitarPuesto(request.query)
    response.send(`Puesto habilitado`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/centro/habilitarPuesto', habilitarPuesto)

const deshabilitarPuesto = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {    
    await centroServicios.deshabilitarPuesto(request.query)
    response.send(`Puesto deshabilitado`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/centro/deshabilitarPuesto', deshabilitarPuesto)

const eliminarPuesto = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {    
    await centroServicios.eliminarPuesto(request.query)
    response.send(`Puesto eliminado`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/centro/eliminarPuesto', eliminarPuesto)

/*************************************************************************/

/**************************** ENCARGADO ***********************************/

const verEncargado = async (request, response) => {
  const encargadoServicios = new EncargadoServicios()
  try {
    const encargado = await encargadoServicios.obtenerEncargado(request.query.dni)
    response.send(`<html><body>
                    ${encargado.getInformacion()}</body></htmtl>`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/encargado', verEncargado)

const verEncargados = async (request, response) => {
  const encargadoServicios = new EncargadoServicios()
  try {
    const encargados = await encargadoServicios.obtenerEncargados()
    response.send(`<html><body>
                    <ul>${encargados.map(encargado =>
                    `<li>${encargado.getInformacion()}</li>
                    `)}</ul></body></htmtl>`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/encargados', verEncargados)

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
    response.send(`Encargado creado`)
  } catch(e) {
    response.send(e.message)
  }  
  
}

app.post('/encargado', crearEncargado)

/*************************************************************************/

/***************************** CONEXION ********************************/

const verConexion = async (request, response) => {
  const conexionServicios = new ConexionServicios()
  try {
    const conexion = await conexionServicios.obtenerConexion(request.query.numeroDeReferencia)
    response.send(`<html><body>
                    ${conexion.getInformacion()}</body></htmtl>`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/conexion', verConexion)

const verConexiones = async (request, response) => {
  const conexionServicios = new ConexionServicios()
  try {
    const conexiones = await conexionServicios.obtenerConexiones()
    response.send(`<html><body>
                    <ul>${conexiones.map(conexion =>
                    `<li>${conexion.getInformacion()}</li>
                    `)}</ul></body></htmtl>`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/conexiones', verConexiones)

const agregarConexion = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {    
    await centroServicios.agregarConexion(request.query)
    response.send(`Conexion agregada`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/centro/agregarConexion', agregarConexion)

const eliminarConexion = async (request, response) => {
  const centroServicios = new CentroServicios()
  try {    
    await centroServicios.eliminarConexion(request.query)
    response.send(`Conexion eliminada`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/centro/eliminarConexion', eliminarConexion)

const crearConexion = async (request, response) => {
  const conexionServicios = new ConexionServicios()
  try {
    await conexionServicios.crear(request.query)
    await conexionServicios.guardar()
    response.send(`Conexion creada`)
  } catch(e){
    response.send(e.message)
  }
}

app.post('/conexion', crearConexion)

/*************************************************************************/

/***************************** PROVEEDOR *********************************/

const verProveedor = async (request, response) => {
  const proveedorServicios = new ProveedorServicios()
  try {
    const proveedor = await proveedorServicios.obtenerProveedor(request.query.cuit)
    response.send(`<html><body>
                    ${proveedor.getInformacion()}</body></htmtl>`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/proveedor', verProveedor)

const verProveedores = async (request, response) => {
  const proveedorServicios = new ProveedorServicios()
  try {
    const proveedores = await proveedorServicios.obtenerProveedores()
    response.send(`<html><body>
                    <ul>${proveedores.map(proveedor =>
                    `<li>${proveedor.getInformacion()}</li>
                    `)}</ul></body></htmtl>`)
  } catch(e){
    response.send(e.message)
  }  
}

app.get('/proveedores', verProveedores)

const crearProveedor = async (request, response) => {
  const proveedorServicios = new ProveedorServicios()
  try {
    await proveedorServicios.crear(request.query)
    await proveedorServicios.guardar()
    response.send(`Proveedor agregado`)
  } catch(e){
    response.send(e.message)
  }  
}

app.post('/proveedor', crearProveedor)

/*************************************************************************/

app.listen(port, () => {
  console.log(`Nuestro server está funcionando bien en el port ${port}`)
})