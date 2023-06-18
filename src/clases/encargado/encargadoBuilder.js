const Encargado = require('./encargado')

module.exports = class EncargadoBuilder{
    constructor(){
        this.nombre = null
        this.dni = null
        this.telefono = null
        this.encargado = null
    }

    setNombre(nombre){
        try{
            this.nombre = nombre
            return this
        } catch(e){
            throw e
        }        
    }

    setDni(dni){
        try{
            this.dni = dni
            return this
        } catch(e){
            throw e
        }        
    }

    setTelefono(telefono){
        try{
            this.telefono = telefono
            return this
        } catch(e){
            throw e
        }        
    }

    build(){
        this.encargado = new Encargado(this.nombre,this.dni,this.telefono)
        return this.encargado
    }
}