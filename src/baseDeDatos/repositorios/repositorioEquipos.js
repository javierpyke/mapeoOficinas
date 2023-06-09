const MongoDBDao = require('../dao/MongoBDDAO.js')

module.exports = class RepositorioEquipos {
  constructor() {
    this.almacen = new MongoDBDao('equipos')
  }

  async conectar(){
    await this.almacen.conectar()
  }

  desconectar(){
    this.almacen.desconectar()
  }

  async agregar(equipo){
    await this.almacen.agregar(equipo)
  }

  async obtenerInventario(){
    const inventario = await this.almacen.obtenerInventario()
    return inventario
  }

  async obtenerTodos(filtro){
    const equipos = await this.almacen.obtenerTodos(filtro)
    return equipos
  }

  async obtener(filtro){
    const equipos = await this.almacen.obtener(filtro)
    return equipos
  }

  async buscar(filtro){
    const equipo = await this.almacen.obtener(filtro)
    return equipo
  }


  async obtenerCamaras(){
    const camaras = await this.almacen.obtenerCamaras()
    return camaras
  }

  async actualizar(teclado){
    return await this.almacen.actualizar({'inventario':teclado.getInventario()},teclado)
  }
}
