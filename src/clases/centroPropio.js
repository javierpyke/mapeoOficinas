const Centro = require('./centro.js')

class CentroPropio extends Centro {
    constructor(){
        super()
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