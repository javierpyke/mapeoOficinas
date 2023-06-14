const MongoDBDao = require('../dao/MongoBDDAO.js')

module.exports = class RepositorioCentros {
  constructor() {
    this.almacen = new MongoDBDao('centros')
  }

  async conectar(){
    await this.almacen.conectar()
  }

  desconectar(){
    this.almacen.desconectar()
  }

  async agregarCentro(centros){
    await this.almacen.agregar(centros)
  }

  getAll() {
    return this.almacen.obtenerTodas()
  }
}