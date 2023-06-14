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

    build(){
        this.centro = new CentroPropio(this.direccion,this.numeroDeCentro)
        this.centro.setConexion(this.conexion)
        return this.centro
    }
}

module.exports = CentroPropioBuilder