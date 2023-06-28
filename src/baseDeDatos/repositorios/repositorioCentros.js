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

  async agregar(centro){
    await this.almacen.agregar(centro)
  }

  async buscar(numeroDeCentro){
    return await this.almacen.obtener({'numeroDeCentro':numeroDeCentro})
  }

  getAll() {
    return this.almacen.obtenerTodas()
  }

  async actualizar(centro){
    return await this.almacen.actualizar({'numeroDeCentro':centro.getNumeroDeCentro()},centro)
  }

  async obtenerTodos(){
    return await this.almacen.obtenerTodos()
  }
}