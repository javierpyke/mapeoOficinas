const RepositorioConexiones = require('../baseDeDatos/repositorios/repositorioConexiones')
const RepositorioProveedores = require('../baseDeDatos/repositorios/repositorioProveedores')
const ConexionBuilder = require('../clases/conexion/conexionBuilder')
const ProveedorBuilder = require('../clases/proveedor/proveedorBuilder')
const ProveedorServicios = require('../servicios/proveedorServicios')

module.exports = class ConexionServicios{
    constructor(){
        this.conexion = null

    }

    async buscarProveedor(cuit){
        const repositorioProveedores = new RepositorioProveedores()
        await repositorioProveedores.conectar()
        const proveedor = (await repositorioProveedores.buscar(cuit))[0]
        repositorioProveedores.desconectar()

        if(!proveedor){
            throw new Error('No existe proveedor con ese cuit')
        }

        try{
            return (new ProveedorBuilder)
                .setRazonSocial(proveedor.razonSocial)
                .setCuit(proveedor.cuit)
                .setTelefonoSoporte(proveedor.telefonoSoporte)
                .build()
        } catch(e){
            throw e
        }  
    }

    transformarJsonEnConexion(datos){
        const proveedor = (new ProveedorServicios).transformarJsonEnProveedor(datos.proveedor)
        return (new ConexionBuilder)
                .setNumeroDeReferencia(datos.numeroDeReferencia)
                .setProveedor(proveedor)
                .build()
    }

    async crear(datos){
        let proveedor = null
        const repositorioConexiones = new RepositorioConexiones()
        await repositorioConexiones.conectar()
        const conexion = await repositorioConexiones.buscar(datos.numeroDeReferencia)
        repositorioConexiones.desconectar()
        try{
            proveedor = await this.buscarProveedor(datos.cuitProveedor)
        } catch(e){
            throw e
        }
        if(conexion.length>0){
            throw new Error('Ya existe una conexion con ese numero de referencia')
        }
        try {
            this.conexion = (new ConexionBuilder)
                            .setNumeroDeReferencia(datos.numeroDeReferencia)
                            .setProveedor(proveedor)
                            .build()
        } catch(e){
            throw e
        }
        
        return this        
    }

    async guardar(){
        const repositorioConexiones = new RepositorioConexiones()
        await repositorioConexiones.conectar()
        await repositorioConexiones.agregar(this.conexion)
        repositorioConexiones.desconectar()
    }
}