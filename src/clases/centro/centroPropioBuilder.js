const CentroBuilder = require('./centroBuilder')
const CentroPropio = require('./centroPropio')

class CentroPropioBuilder extends CentroBuilder{
    constructor(){
        super()
    }

    setConexion(conexion){
        this.conexion = conexion

        return this
    }

    setPuestos(puestos){
        this.puestos = puestos
        return this
    }

    build(){
        this.centro = new CentroPropio(this.direccion,this.numeroDeCentro)
        this.centro.setEncargado(this.encargado)
        this.centro.setConexion(this.conexion)
        this.centro.setPuestos(this.puestos)
        return this.centro
    }
}

module.exports = CentroPropioBuilder