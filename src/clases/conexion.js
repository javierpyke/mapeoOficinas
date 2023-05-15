class Conexion{
    constructor(numeroDeReferencia,proveedor){
        this.numeroDeReferencia = numeroDeReferencia
        this.proveedor = proveedor
    }

    setNumeroDeReferencia(numeroDeReferencia){
        this.numeroDeReferencia = numeroDeReferencia
    }

    getNumeroDeReferencia(){
        return this.numeroDeReferencia
    }

    setProveedor(proveedor){
        this.proveedor = proveedor
    }

    getProveedor(){
        return this.proveedor
    }
}

module.exports = Conexion;