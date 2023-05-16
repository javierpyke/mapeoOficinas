class CentroPropio extends Centro {
    constructor(){
        super()
    }

    setConexion(conexion){
        this.conexion = conexion
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