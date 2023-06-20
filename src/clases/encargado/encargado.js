class Encargado{
    constructor(nombre,dni,telefono){
        this.setNombre(nombre)
        this.setDni(dni)
        this.setTelefono(telefono)
    }

    setNombre(nombre){
        if(!nombre){
            throw new Error('Falta el nombre del encargado')
        } else {
            this.nombre = nombre
        }
    }

    setDni(dni){
        if(!dni){
            throw new Error('Falta el dni del encargado')
        } else {
            this.dni = dni
        }
    }

    setTelefono(telefono){
        if(!telefono){
            throw new Error('Falta el telefono del encargado')
        } else {
            this.telefono = telefono
        }
    }

    getNombre(){
        return this.nombre
    }

    getDni(){
        return this.dni
    }

    getTelefono(){
        return this.telefono
    }

    getInformacion(){
        return `Nombre: ${this.getNombre()} - DNI: ${this.getDni()} - Telefono: ${this.getTelefono()}`
    }
}

module.exports = Encargado;