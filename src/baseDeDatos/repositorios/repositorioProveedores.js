const MongoDBDao = require('../dao/MongoBDDAO.js')

module.exports = class RepositorioProveedores {
  constructor() {
    this.almacen = new MongoDBDao('proveedores')
  }

  async conectar(){
    await this.almacen.conectar()
  }

  desconectar(){
    this.almacen.desconectar()
  }

  async agregar(proveedor){
    await this.almacen.agregar(proveedor)
  }

  getAll() {
    return this.almacen.obtenerTodos()
  }

  buscar(cuit){
    return this.almacen.obtener({'cuit':cuit})
  }
}