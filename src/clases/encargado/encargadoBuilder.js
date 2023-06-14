const Encargado = require('./encargado')

class EncargadoBuilder{
    constructor(){
        this.nombre = null
        this.dni = null
        this.telefono = null
        this.encargado = null
    }

    setNombre(nombre){
        this.nombre = nombre
        return this
    }

    setDni(dni){
        this.dni = dni
        return this
    }

    setTelefono(telefono){
        this.telefono = telefono
        return this
    }

    build(){
        this.encargado = new Encargado(this.nombre,this.dni,this.telefono)
        return this.encargado
    }
}