const MongoDBDao = require('../dao/MongoBDDAO.js')

module.exports = class RepositorioPuestos {
  constructor() {
    this.almacen = new MongoDBDao('puestos')
  }

  async conectar(){
    await this.almacen.conectar()
  }

  desconectar(){
    this.almacen.desconectar()
  }

  async agregarPuesto(puesto){
    await this.almacen.agregar(puesto)
  }

  getAll() {
    return this.almacen.obtenerTodas()
  }
}