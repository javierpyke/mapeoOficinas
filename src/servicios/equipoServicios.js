const RepositorioEquipos = require('../baseDeDatos/repositorios/repositorioEquipos')

module.exports = class EquipoServicios{
    constructor(tipoDeEquipo, factory){
        this.repositorio = new RepositorioEquipos()
        this.tipoDeEquipo = tipoDeEquipo
        this.factory = new factory
    }

    async obtenerEquiposFiltro(filtro){
        await this.repositorio.conectar()
        const equipos = await this.repositorio.obtenerTodos(filtro)
        this.repositorio.desconectar()
        return equipos.map(equipo => this.transformarJsonEnEquipo(equipo))
    }

    async obtenerEquipos(){
        return await this.obtenerEquiposFiltro({'tipoDeEquipo':this.tipoDeEquipo})
    }

    async obtenerEquiposLibres(){
        return await this.obtenerEquiposFiltro({'tipoDeEquipo':this.tipoDeEquipo,'usado':false})
    }

    async guardar(equipo){
        await this.repositorio.conectar()
        await this.repositorio.agregar(equipo)
        this.repositorio.desconectar()
    }

    async obtenerInventario(){
        await this.repositorio.conectar()
        const inventario = await this.repositorio.obtenerInventario()
        this.repositorio.desconectar()
        return inventario
    }

    async crearEquipo(datos){
        let equipo = null
        const inventario = await this.obtenerInventario()
        try {
            equipo = this.factory.crear(datos.marca,datos.modelo,inventario)
        } catch(e){
            throw e
        }        
        return equipo       
    }

    transformarJsonEnEquipo(datos){
        if(datos){
            const equipo = this.factory.crear(datos.marca,datos.modelo,datos.inventario)
            equipo.setUsado(datos.usado)
            return equipo
        } else {
            return datos
        }   
    }

    async obtenerEquipo(inventario){
        await this.repositorio.conectar()
        const equipo = await this.repositorio.buscar({'inventario':inventario,'tipoDeEquipo':this.tipoDeEquipo})
        this.repositorio.desconectar()
        if(!equipo){
            throw new Error(`No existe ${this.tipoDeEquipo} con ese inventario`)
        }
        return this.transformarJsonEnEquipo(equipo)
    }

    async actualizarEquipo(equipo){
        await this.repositorio.conectar()
        await this.repositorio.actualizar(equipo)
        this.repositorio.desconectar()
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