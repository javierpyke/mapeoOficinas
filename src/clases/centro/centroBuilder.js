const Centro = require("./centro")

module.exports = class CentroBuilder{
    constructor(){
        this.direccion = null
        this.numeroDeCentro = null
        this.puestos = []
        this.encargado = null
        this.centro = null
    }

    setDireccion(direccion){
        this.direccion = direccion

        return this
    }

    setNumeroDeCentro(numeroDeCentro){
        this.numeroDeCentro = numeroDeCentro

        return this
    }

    setEncargado(encargado){
        this.encargado = encargado

        return this
    }

}
