const PuestoDeConsulta = require('./puestoDeConsulta')

module.exports = class PuestoDeConsultaBuilder{
    constructor(){
        this.teclado = null
        this.mouse = null
        this.monitor = null
        this.cpu = null
        this.puesto = null
    }

    setTeclado(teclado){
        this.teclado = teclado

        return this
    }

    setMouse(mouse){
        this.mouse = mouse

        return this
    }

    setMonitor(monito){
        this.monitor = monitor

        return this
    }

    setCpu(cpu){
        this.cpu = cpu

        return this
    }

    build(){
        this.puesto = new PuestoDeConsulta()
        this.puesto.setCpu(this.cpu)
        this.puesto.setMonitor(this.monitor)
        this.puesto.setTeclado(this.teclado)
        this.puesto.setMouse(this.mouse)
        return this.puesto
    }
}