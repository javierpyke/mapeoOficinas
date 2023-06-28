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

    setConexion(conexion){
        this.conexion = conexion

        return this
    }

    setPuestos(puestos){
        this.puestos = puestos
        return this
    }

    setHabilitado(habilitado){
        this.habilitado = habilitado
        return this
    }

    build(){
        this.centro = new Centro(this.direccion,this.numeroDeCentro)
        this.centro.setEncargado(this.encargado)
        this.centro.setConexion(this.conexion)
        this.centro.setPuestos(this.puestos)
        this.centro.setHabilitado(this.habilitado)
        return this.centro
    }
}
