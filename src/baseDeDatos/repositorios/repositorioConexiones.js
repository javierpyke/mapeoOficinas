const MongoDBDao = require('../dao/MongoBDDAO.js')

module.exports = class ConexionEncargados {
  constructor() {
    this.almacen = new MongoDBDao('conexiones')
  }

  async conectar(){
    await this.almacen.conectar()
  }

  desconectar(){
    this.almacen.desconectar()
  }

  async agregar(conexion){
    await this.almacen.agregar(conexion)
  }

  getAll() {
    return this.almacen.obtenerTodos()
  }

  buscar(numeroDeReferencia){
    return this.almacen.obtener({'numeroDeReferencia':numeroDeReferencia})
  }
}