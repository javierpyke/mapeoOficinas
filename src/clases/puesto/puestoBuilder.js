const Puesto = require('../puesto/puesto')

module.exports = class PuestoBuilder{
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

    setMonitor(monitor){
        this.monitor = monitor

        return this
    }

    setCpu(cpu){
        this.cpu = cpu

        return this
    }

    setHabilitado(habilitado){
        this.habilitado = habilitado
        return this
    }

    build(){
        this.puesto = new Puesto()
        this.puesto.setCpu(this.cpu)
        this.puesto.setMonitor(this.monitor)
        this.puesto.setTeclado(this.teclado)
        this.puesto.setMouse(this.mouse)
        this.puesto.setHabilitado(this.habilitado)
        return this.puesto
    }
}