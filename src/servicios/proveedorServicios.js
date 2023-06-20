const RepositorioProveedores = require('../baseDeDatos/repositorios/repositorioProveedores.js')
const ProveedorBuilder = require('../clases/proveedor/proveedorBuilder')

module.exports = class ProveedorServicios{
    constructor(){
        this.proveedor = null

    }

    async obtenerProveedores(){
        const repositorioProveedores = new RepositorioProveedores()
        await repositorioProveedores.conectar()
        const proveedores = await repositorioProveedores.obtenerTodos()
        repositorioProveedores.desconectar()
        return proveedores.map(proveedor => this.transformarJsonEnProveedor(proveedor))
    }

    async obtenerProveedor(cuit){
        const repositorioProveedores = new RepositorioProveedores()
        await repositorioProveedores.conectar()
        const proveedor = await repositorioProveedores.buscar(cuit)
        if(!proveedor){
            throw new Error('No existe proveedor con ese cuit')
        }
        repositorioProveedores.desconectar()
        return this.transformarJsonEnProveedor(proveedor)
    }

    async crear(datos){
        const repositorioProveedor = new RepositorioProveedores()
        await repositorioProveedor.conectar()
        const proveedor = await repositorioProveedor.buscar(datos.cuit)
        repositorioProveedor.desconectar()
        if(proveedor){
            throw new Error('Ya existe un proveedor con ese cuit')
        }
        try {
            this.proveedor = (new ProveedorBuilder)
                            .setRazonSocial(datos.razonSocial)
                            .setCuit(datos.cuit)
                            .setTelefonoSoporte(datos.telefonoSoporte)
                            .build()
        } catch(e){
            throw e
        }
        
        return this        
    }

    transformarJsonEnProveedor(datos){
        if(datos){
            return (new ProveedorBuilder)
                .setRazonSocial(datos.razonSocial)
                .setCuit(datos.cuit)
                .setTelefonoSoporte(datos.telefonoSoporte)
                .build()
        }
        return datos
        
    }

    async guardar(){
        const repositorioProveedor = new RepositorioProveedores()
        await repositorioProveedor.conectar()
        await repositorioProveedor.agregar(this.proveedor)
        repositorioProveedor.desconectar()
    }
}