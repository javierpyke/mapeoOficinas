const RepositorioConexiones = require('../baseDeDatos/repositorios/repositorioConexiones')
const RepositorioCentros = require('../baseDeDatos/repositorios/repositorioCentros')
const RepositorioEquipos = require('../baseDeDatos/repositorios/repositorioEquipos')
const CentroPropioBuilder = require('../clases/centro/centroPropioBuilder')
const ConexionBuilder = require('../clases/conexion/conexionBuilder')
const ConexionServicios = require('./conexionServicios')
const PuestoServicios = require('./puestoServicios')
const EquipoServicios = require('./equipoServicios')
const EncargadoServicios = require('./encargadoServicios')
const TiposDeEquipos = require('../clases/tipos/tiposDeEquipos')

module.exports = class CentroPropioServicios{
    constructor(){
        this.centro = null

    }    

    async buscarConexion(numeroDeReferencia){
        const repositorioConexiones = new RepositorioConexiones()
        await repositorioConexiones.conectar()
        const conexion = (await repositorioConexiones.buscar(numeroDeReferencia))[0]
        repositorioConexiones.desconectar()

        if(!conexion){
            throw new Error('No existe conexion con ese numero de referencia')
        }

        try{
            return (new ConexionBuilder)
                .setNumeroDeReferencia(conexion.numeroDeReferencia)
                .setProveedor( await (new ConexionServicios)
                                .buscarProveedor(conexion.proveedor.cuit)
                )
                .build()
        } catch(e){
            throw e
        }  
    }

    transformarJsonEnCentro(datos){
        const conexion = (new ConexionServicios).transformarJsonEnConexion(datos.conexion)
        const encargado = (new EncargadoServicios).transformarJsonEnEncargado(datos.encargado)
        const puestoServicios = new PuestoServicios
        const puestos = datos.puestos.map(puesto => puestoServicios.transformarJsonEnConexion(puesto))
        return (new CentroPropioBuilder)
                .setDireccion(datos.direccion)
                .setNumeroDeCentro(datos.numeroDeCentro)
                .setEncargado(encargado)
                .setConexion(conexion)
                .setPuestos(puestos)
                .build()
    }

    async buscar(numeroDeCentro){
        const repositorioCentros = new RepositorioCentros()
        await repositorioCentros.conectar()
        const datos = await repositorioCentros.buscar(numeroDeCentro)
        repositorioCentros.desconectar()
        return this.transformarJsonEnCentro(datos)      
    }

    async agregarPuesto(numeroDeCentro){
        const centro = await this.buscar(numeroDeCentro)
        centro.crearPuesto()
        this.actualizarCentro(centro)
    }

    async crear(datos){
        let conexion = null
        const repositorioCentros = new RepositorioCentros()
        await repositorioCentros.conectar()
        const centro = await repositorioCentros.buscar(datos.numeroDeCentro)
        repositorioCentros.desconectar()
        try{
            conexion = await this.buscarConexion(datos.numeroDeReferenciaDeConexion)
        } catch(e){
            throw e
        }
        if(centro.length>0){
            throw new Error('Ya existe un centro con ese numero')
        }
        try {
            this.centro = (new CentroPropioBuilder)
                            .setDireccion(datos.direccion)
                            .setNumeroDeCentro(datos.numeroDeCentro)
                            .setEncargado(datos.encargado)
                            .setConexion(conexion)
                            .build()
        } catch(e){
            throw e
        }
        
        return this        
    }

    async crearPuesto(datos){
        let conexion = null
        const repositorioCentros = new RepositorioCentros()
        await repositorioCentros.conectar()
        const centro = await repositorioCentros.buscar(datos.numeroDeCentro)
        repositorioCentros.desconectar()
        try{
            conexion = await this.buscarConexion(datos.numeroDeReferenciaDeConexion)
        } catch(e){
            throw e
        }
        if(centro.length>0){
            throw new Error('Ya existe un centro con ese numero')
        }
        try {
            this.centro = (new CentroPropioBuilder)
                            .setDireccion(datos.direccion)
                            .setNumeroDeCentro(datos.numeroDeCentro)
                            .setEncargado(datos.encargado)
                            .setConexion(conexion)
                            .build()
        } catch(e){
            throw e
        }
        
        return this        
    }

    async agregarTeclado(datos){
        let teclado = null
        const centro = await this.buscar(datos.numeroDeCentro)
        const equipoServicios = new EquipoServicios
        try{
            teclado = await equipoServicios.obtenerTeclado(parseInt(datos.inventarioTeclado))
        } catch(e){
            throw e
        }
        if(teclado.estaUsado()){
            throw new Error('El teclado esta en uso')
        }
        try {
            centro.agregarTeclado(teclado,datos.numeroDePuesto)
        } catch(e){
            throw e
        }        
        equipoServicios.equipoEnUso(teclado)
        this.actualizarCentro(centro)    
    }

    async quitarTeclado(datos){
        let teclado = null
        const centro = await this.buscar(datos.numeroDeCentro)
        const equipoServicios = new EquipoServicios
        try{
            teclado = centro.quitarTeclado(datos.numeroDePuesto)
        } catch(e){
            throw e
        }  
        equipoServicios.equipoLibre(teclado)
        centro.deshabilitarPuesto(datos.numeroDePuesto)
        this.actualizarCentro(centro)    
    }

    async agregarMouse(datos){
        let mouse = null
        const centro = await this.buscar(datos.numeroDeCentro)
        const equipoServicios = new EquipoServicios
        try{
            mouse = await equipoServicios.obtenerMouse(parseInt(datos.inventarioMouse))
        } catch(e){
            throw e
        }
        if(mouse.estaUsado()){
            throw new Error('El mouse esta en uso')
        }
        try {
            centro.agregarMouse(mouse,datos.numeroDePuesto)
        } catch(e){
            throw e
        }        
        equipoServicios.equipoEnUso(mouse)
        this.actualizarCentro(centro)    
    }

    async quitarMouse(datos){
        let mouse = null
        const centro = await this.buscar(datos.numeroDeCentro)
        const equipoServicios = new EquipoServicios
        try{
            mouse = centro.quitarMouse(datos.numeroDePuesto)
        } catch(e){
            throw e
        }  
        equipoServicios.equipoLibre(mouse)
        centro.deshabilitarPuesto(datos.numeroDePuesto)
        this.actualizarCentro(centro)    
    }

    async guardar(){
        const repositorioCentros = new RepositorioCentros()
        await repositorioCentros.conectar()
        await repositorioCentros.agregar(this.centro)
        repositorioCentros.desconectar()
    }

    async agregarEncargado(datos){
        let encargado = null
        const centro = await this.buscar(datos.numeroDeCentro)
        const encargadoServicios = new EncargadoServicios
        try{
            encargado = await encargadoServicios.obtenerEncargado(parseInt(datos.dniEncargado))
        } catch(e){
            throw e
        }
        console.log(encargado)
        try {
            centro.setEncargado(encargado)
        } catch(e){
            throw e
        }        
        this.actualizarCentro(centro)    
    }

    async eliminarEncargado(datos){
        let encargado = null
        const centro = await this.buscar(datos.numeroDeCentro)
        try{
            encargado = centro.eliminarEncargado()
            if(!encargado){
                throw new Error('El centro no posee encargado')
            }
        } catch(e){
            throw e
        }  
        this.actualizarCentro(centro)    
    }

    async actualizarCentro(centro){
        const repositorioCentros = new RepositorioCentros()
        await repositorioCentros.conectar()
        await repositorioCentros.actualizar(centro)
        repositorioCentros.desconectar()
    }
}