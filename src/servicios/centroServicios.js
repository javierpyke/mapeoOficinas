const RepositorioConexiones = require('../baseDeDatos/repositorios/repositorioConexiones')
const RepositorioCentros = require('../baseDeDatos/repositorios/repositorioCentros')
const RepositorioEncargados = require('../baseDeDatos/repositorios/repositorioEncargados')
const CentroBuilder = require('../clases/centro/centroBuilder')
const ConexionBuilder = require('../clases/conexion/conexionBuilder')
const EncargadoBuilder = require('../clases/encargado/encargadoBuilder')
const ConexionServicios = require('./conexionServicios')
const PuestoServicios = require('./puestoServicios')
const EquipoServicios = require('./equipoServicios')
const EncargadoServicios = require('./encargadoServicios')
const TiposDeEquipos = require('../clases/tipos/tiposDeEquipos')
const TecladoFactory = require('../clases/equipo/tecladoFactory')
const MouseFactory = require('../clases/equipo/mouseFactory')
const MonitorFactory = require('../clases/equipo/monitorFactory')
const CpuFactory = require('../clases/equipo/cpuFactory')

module.exports = class CentroServicios{
    constructor(){
        this.centro = null

    }    

    async buscarConexion(numeroDeReferencia){
        const repositorioConexiones = new RepositorioConexiones()
        await repositorioConexiones.conectar()
        const conexion = await repositorioConexiones.buscar(numeroDeReferencia)
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

    async buscarEncargado(dni){
        const repositorioEncargados = new RepositorioEncargados()
        await repositorioEncargados.conectar()
        const encargado = await repositorioEncargados.buscar(dni)
        repositorioEncargados.desconectar()

        if(!encargado){
            throw new Error('No existe encargado con ese dni')
        }

        try{
            return (new EncargadoBuilder)
                .setNombre(encargado.nombre)
                .setDni(encargado.dni)
                .setTelefono(encargado.telefono)
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
        return (new CentroBuilder)
                .setDireccion(datos.direccion)
                .setNumeroDeCentro(datos.numeroDeCentro)
                .setEncargado(encargado)
                .setConexion(conexion)
                .setPuestos(puestos)
                .setHabilitado(datos.habilitado)
                .build()
    }

    async buscar(numeroDeCentro){
        const repositorioCentros = new RepositorioCentros()
        await repositorioCentros.conectar()
        const datos = await repositorioCentros.buscar(numeroDeCentro)
        if(!datos){
            throw new Error('No existe centro con ese numero')
        }
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
        let encargado = null
        const repositorioCentros = new RepositorioCentros()
        await repositorioCentros.conectar()
        const centro = await repositorioCentros.buscar(datos.numeroDeCentro)
        repositorioCentros.desconectar()
        try{
            conexion = await this.buscarConexion(datos.numeroDeReferenciaDeConexion)
        } catch(e){
            throw e
        }
        try{
            encargado = await this.buscarEncargado(datos.dniDeEncargado)
        } catch(e){
            throw e
        }
        if(centro){
            throw new Error('Ya existe un centro con ese numero')
        }
        try {
            this.centro = (new CentroBuilder)
                            .setDireccion(datos.direccion)
                            .setNumeroDeCentro(datos.numeroDeCentro)
                            .setEncargado(encargado)
                            .setConexion(conexion)
                            .setHabilitado(datos.habilitado)
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
            this.centro = (new CentroBuilder)
                            .setDireccion(datos.direccion)
                            .setNumeroDeCentro(datos.numeroDeCentro)
                            .setEncargado(datos.encargado)
                            .setConexion(conexion)
                            .setHabilitado(datos.habilitado)
                            .build()
        } catch(e){
            throw e
        }
        
        return this        
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
            encargado = await encargadoServicios.obtenerEncargado(parseInt(datos.dniDeEncargado))
        } catch(e){
            throw e
        }
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
            centro.deshabilitar()
        } catch(e){
            throw e
        }  
        this.actualizarCentro(centro)    
    }

    async agregarConexion(datos){
        let conexion = null
        const centro = await this.buscar(datos.numeroDeCentro)
        const conexionServicios = new ConexionServicios
        try{
            conexion = await conexionServicios.obtenerConexion(datos.numeroDeReferenciaDeConexion)
        } catch(e){
            throw e
        }
        try {
            centro.setConexion(conexion)
        } catch(e){
            throw e
        }        
        this.actualizarCentro(centro)    
    }

    async eliminarConexion(datos){
        let conexion = null
        const centro = await this.buscar(datos.numeroDeCentro)
        try{
            conexion = centro.eliminarConexion()
            if(!conexion){
                throw new Error('El centro no posee conexion')
            }
            centro.deshabilitar()
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

    async obtenerEquipoLibre(inventario,tipoDeEquipo,factory){
        let equipo = null
        const equipoServicios = new EquipoServicios(tipoDeEquipo,factory)
        try{
            equipo = await equipoServicios.obtenerEquipo(parseInt(inventario))
        } catch(e){
            throw e
        }
        if(equipo.estaUsado()){
            throw new Error(`El ${equipo.getTipoDeEquipo()} esta en uso`)
        }
        return equipo
    }

    async agregarTeclado(datos){
        const centro = await this.buscar(datos.numeroDeCentro) 
        const equipoServicios = new EquipoServicios(TiposDeEquipos.Teclado, TecladoFactory)   
        const equipo = await this.obtenerEquipoLibre(datos.inventario,TiposDeEquipos.Teclado, TecladoFactory)
        try {
            centro.agregarTeclado(equipo,datos.numeroDePuesto)
        } catch(e){
            throw e
        }        
        equipoServicios.equipoEnUso(equipo)
        this.actualizarCentro(centro)    
    }

    async quitarTeclado(datos){
        let teclado = null
        const centro = await this.buscar(datos.numeroDeCentro)
        const equipoServicios = new EquipoServicios(TiposDeEquipos.Teclado, TecladoFactory)
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
        const centro = await this.buscar(datos.numeroDeCentro) 
        const equipoServicios = new EquipoServicios(TiposDeEquipos.Mouse, MouseFactory)   
        const equipo = await this.obtenerEquipoLibre(datos.inventario,TiposDeEquipos.Mouse, MouseFactory)
        try {
            centro.agregarMouse(equipo,datos.numeroDePuesto)
        } catch(e){
            throw e
        }        
        equipoServicios.equipoEnUso(equipo)
        this.actualizarCentro(centro)    
    }

    async quitarMouse(datos){
        let mouse = null
        const centro = await this.buscar(datos.numeroDeCentro)
        const equipoServicios = new EquipoServicios(TiposDeEquipos.Mouse, MouseFactory)
        try{
            mouse = centro.quitarMouse(datos.numeroDePuesto)
        } catch(e){
            throw e
        }  
        equipoServicios.equipoLibre(mouse)
        centro.deshabilitarPuesto(datos.numeroDePuesto)
        this.actualizarCentro(centro)    
    }

    async agregarMonitor(datos){
        const centro = await this.buscar(datos.numeroDeCentro) 
        const equipoServicios = new EquipoServicios(TiposDeEquipos.Monitor, MonitorFactory)   
        const equipo = await this.obtenerEquipoLibre(datos.inventario,TiposDeEquipos.Monitor, MonitorFactory)
        try {
            centro.agregarMonitor(equipo,datos.numeroDePuesto)
        } catch(e){
            throw e
        }        
        equipoServicios.equipoEnUso(equipo)
        this.actualizarCentro(centro)    
    }

    async quitarMonitor(datos){
        let monitor = null
        const centro = await this.buscar(datos.numeroDeCentro)
        const equipoServicios = new EquipoServicios(TiposDeEquipos.Monitor, MonitorFactory)
        try{
            monitor = centro.quitarMonitor(datos.numeroDePuesto)
        } catch(e){
            throw e
        }  
        equipoServicios.equipoLibre(monitor)
        centro.deshabilitarPuesto(datos.numeroDePuesto)
        this.actualizarCentro(centro)    
    }

    async agregarCpu(datos){
        const centro = await this.buscar(datos.numeroDeCentro) 
        const equipoServicios = new EquipoServicios(TiposDeEquipos.Cpu, CpuFactory)   
        const equipo = await this.obtenerEquipoLibre(datos.inventario,TiposDeEquipos.Cpu, CpuFactory)
        try {
            centro.agregarCpu(equipo,datos.numeroDePuesto)
        } catch(e){
            throw e
        }        
        equipoServicios.equipoEnUso(equipo)
        this.actualizarCentro(centro)    
    }

    async quitarCpu(datos){
        let cpu = null
        const centro = await this.buscar(datos.numeroDeCentro)
        const equipoServicios = new EquipoServicios(TiposDeEquipos.Cpu, CpuFactory)
        try{
            cpu = centro.quitarCpu(datos.numeroDePuesto)
        } catch(e){
            throw e
        }  
        equipoServicios.equipoLibre(cpu)
        centro.deshabilitarPuesto(datos.numeroDePuesto)
        this.actualizarCentro(centro)    
    }

    async habilitarPuesto(datos){
        const centro = await this.buscar(datos.numeroDeCentro) 
        try {
            centro.habilitarPuesto(datos.numeroDePuesto)
        } catch(e){
            throw e
        }        
        this.actualizarCentro(centro)    
    }

    async deshabilitarPuesto(datos){
        const centro = await this.buscar(datos.numeroDeCentro) 
        try {
            centro.deshabilitarPuesto(datos.numeroDePuesto)
        } catch(e){
            throw e
        }        
        this.actualizarCentro(centro)    
    }

    async eliminarPuesto(datos){
        let puesto = null
        const centro = await this.buscar(datos.numeroDeCentro)
        const puestoServicios = new PuestoServicios
        try{
            puesto = centro.eliminarPuesto(datos.numeroDePuesto)
        } catch(e){
            throw e
        }  
        puestoServicios.liberarPerifericos(puesto)
        this.actualizarCentro(centro)    
    }

    async habilitar(datos){
        const centro = await this.buscar(datos.numeroDeCentro) 
        try {
            centro.habilitar()
        } catch(e){
            throw e
        }        
        this.actualizarCentro(centro)    
    }

    async deshabilitar(datos){
        const centro = await this.buscar(datos.numeroDeCentro) 
        try {
            centro.deshabilitar()
        } catch(e){
            throw e
        }        
        this.actualizarCentro(centro)    
    }

    async obtenerCentros(){
        const repositorioCentros = new RepositorioCentros()
        await repositorioCentros.conectar()
        const centros = await repositorioCentros.obtenerTodos()
        repositorioCentros.desconectar()
        return centros.map(centro => this.transformarJsonEnCentro(centro))
    }
}