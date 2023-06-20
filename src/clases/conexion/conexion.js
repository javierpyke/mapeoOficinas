class Conexion{
    constructor(numeroDeReferencia,proveedor){
        this.setNumeroDeReferencia(numeroDeReferencia)
        this.setProveedor(proveedor)
    }

    setNumeroDeReferencia(numeroDeReferencia){
        if(!numeroDeReferencia){
            throw new Error('Falta el numero de referencia')
        } else {
            this.numeroDeReferencia = numeroDeReferencia
        }
    }

    getNumeroDeReferencia(){
        return this.numeroDeReferencia
    }

    setProveedor(proveedor){
        if(!proveedor){
            throw new Error('Falta proveedor')
        } else {
            this.proveedor = proveedor
        }        
    }

    getProveedor(){
        return this.proveedor
    }

    getInformacion(){
        return `Numero de referencia: ${this.getNumeroDeReferencia()} - Proveedor: ${this.getProveedor().getInformacion()}`
    }
}

module.exports = Conexion;