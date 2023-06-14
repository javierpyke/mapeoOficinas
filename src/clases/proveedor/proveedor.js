class Proveedor{
    constructor(razonSocial, cuit, telefonoSoporte){
        this.razonSocial = razonSocial
        this.cuit = cuit
        this.telefonoSoporte = telefonoSoporte
    }

    setRazonSocial(razonSocial){
        if(!this.razonSocial){
            this.razonSocial = razonSocial
        }
    }

    eliminarRazonSocial(){
        const razonSocialEliminada = this.razonSocial
        this.razonSocial = null
        return razonSocialEliminada
    }

    setCuit(cuit){
        if(!this.cuit){
            this.cuit = cuit
        }
    }

    eliminarCuit(){
        const cuitEliminado = this.cuit
        this.cuit = null
        return cuitEliminado
    }

    setTelefonoSoporte(telefonoSoporte){
        if(!this.telefonoSoporte){
            this.telefonoSoporte = telefonoSoporte
        }
    }

    eliminarTelefonoSoporte(){
        const telefonoEliminado = this.telefonoSoporte
        this.telefonoSoporte = null
        return telefonoEliminado
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