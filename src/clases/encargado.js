class Encargado{
    constructor(nombre,dni,telefono){
        this.nombre = nombre
        this.dni = dni
        this.telefono = telefono
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
}

module.exports = Encargado;