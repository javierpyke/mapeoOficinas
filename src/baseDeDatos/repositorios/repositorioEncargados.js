const MongoDBDao = require('../dao/MongoBDDAO.js')

module.exports = class RepositorioEncargados {
  constructor() {
    this.almacen = new MongoDBDao('encargados')
  }

  async conectar(){
    await this.almacen.conectar()
  }

  desconectar(){
    this.almacen.desconectar()
  }

  async agregar(encargado){
    await this.almacen.agregar(encargado)
  }

  getAll() {
    return this.almacen.obtenerTodos()
  }

  async buscar(dni){
    return await this.almacen.obtener({'dni':dni})
  }
}