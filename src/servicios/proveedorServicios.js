const RepositorioProveedores = require('../baseDeDatos/repositorios/repositorioProveedores.js')
const ProveedorBuilder = require('../clases/proveedor/proveedorBuilder')

module.exports = class ProveedorServicios{
    constructor(){
        this.proveedor = null

    }

    async crear(datos){
        const repositorioProveedor = new RepositorioProveedores()
        await repositorioProveedor.conectar()
        const proveedor = await repositorioProveedor.buscar(datos.cuit)
        repositorioProveedor.desconectar()
        if(proveedor.length>0){
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
        return (new ProveedorBuilder)
                .setRazonSocial(datos.razonSocial)
                .setCuit(datos.cuit)
                .setTelefonoSoporte(datos.telefonoSoporte)
                .build()
    }

    async guardar(){
        const repositorioProveedor = new RepositorioProveedores()
        await repositorioProveedor.conectar()
        await repositorioProveedor.agregar(this.proveedor)
        repositorioProveedor.desconectar()
    }
}