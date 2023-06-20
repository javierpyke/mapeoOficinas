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

  async buscar(cuit){
    return await this.almacen.obtener({'cuit':cuit})
  }

  async obtenerTodos(){
    const proveedores = await this.almacen.obtenerTodos()
    return proveedores
  }
}