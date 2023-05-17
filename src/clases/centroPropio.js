const Centro = require('./centro.js')

class CentroPropio extends Centro {
    constructor(direccion,numeroDeCentro){
        super(direccion,numeroDeCentro)
    }

    setConexion(conexion){
        if(!this.conexion){
            this.conexion = conexion
        }        
    }

    getConexion(){
        return this.conexion
    }

    eliminarConexion(){
        var conexion = this.conexion
        this.conexion = null

        return conexion
    }
}

module.exports = CentroPropio