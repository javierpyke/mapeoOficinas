const RepositorioEncargados = require('../baseDeDatos/repositorios/repositorioEncargados')
const EncargadoBuilder = require('../clases/encargado/encargadoBuilder')

module.exports = class EncargadoServicios{
    constructor(){
        this.encargado = null

    }

    async obtenerEncargados(){
        const repositorioEncargados = new RepositorioEncargados()
        await repositorioEncargados.conectar()
        const encargados = await repositorioEncargados.obtenerTodos()
        repositorioEncargados.desconectar()
        return encargados.map(encargado => this.transformarJsonEnEncargado(encargado))
    }

    async obtenerEncargado(dni){
        const repositorioEncargados = new RepositorioEncargados()
        await repositorioEncargados.conectar()
        const encargado = await repositorioEncargados.buscar(String(dni))
        if(!encargado){
            throw new Error('No existe encargado con ese dni')
        }
        repositorioEncargados.desconectar()
        return this.transformarJsonEnEncargado(encargado)
    }

    transformarJsonEnEncargado(datos){
        let resultado = null
        if(datos){
            resultado = (new EncargadoBuilder)
            .setNombre(datos.nombre)
            .setDni(datos.dni)
            .setTelefono(datos.telefono)
            .build()
        }
        return resultado
        
    }

    async crear(datos){
        const repositorioEncargados = new RepositorioEncargados()
        await repositorioEncargados.conectar()
        const encargado = await repositorioEncargados.buscar(datos.dni)
        repositorioEncargados.desconectar()
        if(encargado){
            throw new Error('Ya existe un encargado con ese dni')
        }
        try {
            this.encargado = (new EncargadoBuilder)
                            .setNombre(datos.nombre)
                            .setDni(datos.dni)
                            .setTelefono(datos.telefono)
                            .build()
        } catch(e){
            throw e
        }
        
        return this        
    }

    async guardar(){
        const repositorioEncargados = new RepositorioEncargados()
        await repositorioEncargados.conectar()
        await repositorioEncargados.agregar(this.encargado)
        repositorioEncargados.desconectar()
    }
}