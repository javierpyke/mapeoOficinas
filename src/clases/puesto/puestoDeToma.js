const PuestoDeConsulta = require("./puestoDeConsulta");


module.exports = class PuestoDeToma extends PuestoDeConsulta{
    constructor(){
        super()
    }

    setPadDeFirma(padDeFirma){
        this.padDeFirma = padDeFirma
    }

    getPadDeFirma(){
        return this.padDeFirma
    }

    eliminarPadDeFirma(){
        const padDeFirma = this.padDeFirma
        this.padDeFirma = null
        return padDeFirma
    }

    setLectorDeHuella(lectorDeHuella){
        this.lectorDeHuella = lectorDeHuella
    }

    getLectorDeHuella(){
        return this.lectorDeHuella
    }

    eliminarLectorDeHuella(){
        const lectorDeHuella = this.lectorDeHuella
        this.lectorDeHuella = null
        return lectorDeHuella
    }

    setCamara(camara){
        this.camara = camara
    }

    getCamara(){
        return this.camara
    }

    eliminarCamara(){
        const camara = this.camara
        this.camara = null
        return camara
    }
}