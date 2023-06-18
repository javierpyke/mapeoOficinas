const Conexion = require('./conexion')

module.exports = class ConexionBuilder{
    constructor(){
        this.numeroDeReferencia = null
        this.proveedor = null
        this.conexion = null
    }

    setNumeroDeReferencia(numeroDeReferencia){
        try{
            this.numeroDeReferencia = numeroDeReferencia
            return this
        } catch(e){
            throw e
        }        
    }

    setProveedor(proveedor){
        try{
            this.proveedor = proveedor
            return this
        } catch(e){
            throw e
        }
    }

    build(){
        this.conexion = new Conexion(this.numeroDeReferencia,this.proveedor)

        return this.conexion
    }
}