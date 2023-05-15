class Proveedor{
    constructor(razonSocial, cuit, telefonoSoporte){
        this.razonSocial = razonSocial
        this.cuit = cuit
        this.telefonoSoporte = telefonoSoporte
    }

    getRazonSocial(){
        return this.razonSocial
    }

    getCuit(){
        return this.cuit
    }

    getTelefonoSoporte(){
        return this.telefonoSoporte
    }
}

module.exports = Proveedor