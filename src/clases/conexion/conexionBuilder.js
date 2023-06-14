const Conexion = require('./conexion')

class ConexionBuilder{
    constructor(){
        this.numeroDeRefencia = numeroDeReferencia
        this.proveedor = proveedor
        this.conexion = null
    }

    setNumeroDeReferencia(numeroDeRefencia){
        this.numeroDeRefencia = numeroDeRefencia

        return this
    }

    setProveedor(proveedor){
        this.proveedor = proveedor

        return this
    }

    build(){
        this.conexion = new Conexion(this.numeroDeReferencia,this.proveedor)

        return this.conexion
    }
}