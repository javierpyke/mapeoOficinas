const PuestoDeConsultaBuilder = require('./puestoDeConsultaBuilder')
const PuestoDeToma = require('./puestoDeToma')

module.exports = class PuestoDeTomaBuilder extends PuestoDeConsultaBuilder{
    constructor(){
        super()
        this.padDeFirma = null
        this.camara = null
        this.lectorDeHuella = this.lectorDeHuella
    }

    setPadDeFirma(padDeFirma){
        this.padDeFirma = padDeFirma

        return this
    }

    setLectorDeHuella(lectorDeHuella){
        this.lectorDeHuella = lectorDeHuella

        return this
    }

    setCamara(camara){
        this.camara = camara

        return this
    }

    build(){
        this.puesto = new PuestoDeToma()
        this.puesto.setCpu(this.cpu)
        this.puesto.setMonitor(this.monitor)
        this.puesto.setTeclado(this.teclado)
        this.puesto.setMouse(this.mouse)
        this.puesto.setCamara(this.camara)
        this.puesto.setLectorDeHuella(this.lectorDeHuella)
        this.puesto.setPadDeFirma(this.padDeFirma)
        return this.puesto
    }
}