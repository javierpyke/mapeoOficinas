
const RepositorioEquipos = require('../baseDeDatos/repositorios/repositorioEquipos')
const MouseFactory = require('../clases/equipo/mouseFactory')
const TiposDeEquipos = require('../clases/tipos/tiposDeEquipos')

module.exports = class MouseServicios{
    constructor(){
        this.mouse = null
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

    async crearMouse(datos){
        const repositorioEquipo = new RepositorioEquipos()
        await repositorioEquipo.conectar()
        const inventario = await repositorioEquipo.obtenerInventario()
        repositorioEquipo.desconectar()
        try {
            this.mouse = (new MouseFactory).crear(datos.marca,datos.modelo,inventario)
        } catch(e){
            throw e
        }
        
        return this        
    }

    async guardarMouse(){
        const repositorioEquipo = new RepositorioEquipos()
        await repositorioEquipo.conectar()
        await repositorioEquipo.agregar(this.mouse)
        repositorioEquipo.desconectar()
    }

    async obtenerMouse(inventario){
        const repositorioEquipos = new RepositorioEquipos()
        await repositorioEquipos.conectar()
        const mouse = await repositorioEquipos.buscar({'inventario':inventario,'tipoDeEquipo':TiposDeEquipos.Mouse})
        if(!mouse){
            throw new Error('No existe mouse con ese inventario')
        }
        repositorioEquipos.desconectar()
        return this.transformarJsonEnMouse(mouse)
    }

    async actualizarMouse(mouse){
        const repositorioEquipos = new RepositorioEquipos()
        await repositorioEquipos.conectar()
        await repositorioEquipos.actualizar(mouse)
        repositorioEquipos.desconectar()
    }

    async mouseEnUso(mouse){
        mouse.enUso()
        this.actualizarMouse(mouse)
    }

}