const Proveedor = require('./proveedor')

module.exports = class ProveedorBuilder{
    constructor(){
        this.razonSocial = null
        this.cuit = null
        this.telefonoSoporte = null
        this.proveedor = null
    }
    
    setRazonSocial(razonSocial){
        this.razonSocial = razonSocial
        return this
    }

    setCuit(cuit){
        this.cuit = cuit
        return this
    }

    setTelefonoSoporte(telefonoSoporte){
        this.telefonoSoporte = telefonoSoporte
        return this
    }

    build(){
        this.proveedor = new Proveedor(this.razonSocial,this.cuit,this.telefonoSoporte)
        return this.proveedor
    }


}