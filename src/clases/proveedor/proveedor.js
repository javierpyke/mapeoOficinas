class Proveedor{
    constructor(razonSocial, cuit, telefonoSoporte){
        this.SetRazonSocial(razonSocial)
        this.SetCuit(cuit)
        this.SetTelefonoSoporte(telefonoSoporte)
    }

    SetRazonSocial(razonSocial){
        if(!razonSocial){
            throw new Error('Falta razon social')
        } else {
            this.razonSocial = razonSocial
        }
    }

    eliminarRazonSocial(){
        const razonSocialEliminada = this.razonSocial
        this.razonSocial = null
        return razonSocialEliminada
    }

    SetCuit(cuit){
        if(!cuit){
            throw new Error('Falta cuit')
        } else {
            this.cuit = cuit
        }
    }

    eliminarCuit(){
        const cuitEliminado = this.cuit
        this.cuit = null
        return cuitEliminado
    }

    SetTelefonoSoporte(telefonoSoporte){
        if(!telefonoSoporte){
            throw new Error('Falta telefono de soporte')
        } else {
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

    getInformacion(){
        return `Razon Social: ${this.getRazonSocial()} - CUIT: ${this.getCuit()} - Telefono Soporte: ${this.getTelefonoSoporte()}`
    }
}

module.exports = Proveedor