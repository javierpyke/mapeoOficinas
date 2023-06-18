const RepositorioEquipos = require('../baseDeDatos/repositorios/repositorioEquipos')
const TiposDeEquipos = require('../clases/tipos/tiposDeEquipos')
const TecladoFactory = require('../clases/equipo/tecladoFactory')
const MouseFactory = require('../clases/equipo/mouseFactory')

module.exports = class EquipoServicios{
    constructor(){   
    }

    async guardar(equipo){
        const repositorioEquipo = new RepositorioEquipos()
        await repositorioEquipo.conectar()
        console.log(equipo)
        await repositorioEquipo.agregar(equipo)
        repositorioEquipo.desconectar()
    }

    async obtenerInventario(){
        const repositorioEquipo = new RepositorioEquipos()
        await repositorioEquipo.conectar()
        const inventario = await repositorioEquipo.obtenerInventario()
        repositorioEquipo.desconectar()
        return inventario
    }

    async crearTeclado(datos){
        let teclado = null
        const inventario = await this.obtenerInventario()
        try {
            teclado = (new TecladoFactory).crear(datos.marca,datos.modelo,inventario)
            console.log(teclado)
        } catch(e){
            throw e
        }        
        return teclado       
    }

    transformarJsonEnTeclado(datos){
        if(datos){
            const teclado = (new TecladoFactory).crear(datos.marca,datos.modelo,datos.inventario)
            teclado.setUsado(datos.usado)
            return teclado
        } else {
            return datos
        }   
    }

    transformarJsonEnMouse(datos){
        if(datos){
            const mouse = (new MouseFactory).crear(datos.marca,datos.modelo,datos.inventario)
            mouse.setUsado(datos.usado)
            return mouse
        } else {
            return datos
        }
        
    }

    async obtenerEquipo(inventario,tipoDeEquipo){
        const repositorioEquipos = new RepositorioEquipos()
        await repositorioEquipos.conectar()
        const equipo = await repositorioEquipos.buscar({'inventario':inventario,'tipoDeEquipo':tipoDeEquipo})
        repositorioEquipos.desconectar()
        return equipo
    }

    async obtenerTeclado(inventario){
        const teclado = await this.obtenerEquipo(inventario,TiposDeEquipos.Teclado)
        if(!teclado){
            throw new Error('No existe teclado con ese inventario')
        }
        return this.transformarJsonEnTeclado(teclado)
    }

    async obtenerMouse(inventario){
        const mouse = await this.obtenerEquipo(inventario,TiposDeEquipos.Mouse)
        if(!mouse){
            throw new Error('No existe mouse con ese inventario')
        }
        return this.transformarJsonEnMouse(mouse)
    }

    async actualizarEquipo(equipo){
        const repositorioEquipos = new RepositorioEquipos()
        await repositorioEquipos.conectar()
        await repositorioEquipos.actualizar(equipo)
        repositorioEquipos.desconectar()
    }

    async equipoEnUso(equipo){
        equipo.enUso()
        this.actualizarEquipo(equipo)
    }

    async equipoLibre(equipo){
        equipo.libre()
        this.actualizarEquipo(equipo)
    }



}