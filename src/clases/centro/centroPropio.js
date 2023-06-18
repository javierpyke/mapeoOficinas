const Centro = require('./centro.js')

class CentroPropio extends Centro {
    constructor(direccion,numeroDeCentro){
        super(direccion,numeroDeCentro)
    }

    setConexion(conexion){
        if(!this.conexion){
            this.conexion = conexion
            return this
        } else {
            throw new Error('El centro ya posee una conexion')
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