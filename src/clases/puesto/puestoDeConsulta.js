const TiposDeEquipos = require("../../tipos/tiposDeEquipos")

class PuestoDeConsulta{
    constructor(){
        this.habilitado = false
    }

    setTeclado(teclado){
        if(!this.teclado && teclado.tipoDeEquipo === TiposDeEquipos.Teclado){
            this.teclado = teclado
        }        
    }

    getTeclado(){
        return this.teclado
    }

    setMouse(mouse){
        if(mouse.tipoDeEquipo === TiposDeEquipos.Mouse){
            this.mouse = mouse
        }   
    }

    getMouse(){
        return this.mouse
    }

    setCpu(cpu){
        if(cpu.tipoDeEquipo === TiposDeEquipos.Cpu){
            this.cpu = cpu
        }   
    }

    getCpu(){
        return this.cpu
    }

    setMonitor(monitor){
        if(monitor.tipoDeEquipo === TiposDeEquipos.Monitor){
            this.monitor = monitor
        }   
    }

    getMonitor(){
        return this.monitor
    }

    habilitar(){
        if(this.mouse && this.cpu && this.monitor && this.teclado){
            this.habilitado = true
        }
    }

    estaHabilitado(){
        return this.habilitado
    }

    getNumeroDePuesto(){
        return this.numeroDePuesto
    }

    eliminarTeclado(){
        var teclado = this.teclado
        this.teclado = null
        this.habilitado = false

        return teclado
    }

    eliminarMonitor(){
        var monitor = this.monitor
        this.monitor = null
        this.habilitado = false

        return monitor
    }

    eliminarMouse(){
        var mouse = this.mouse
        this.mouse = null
        this.habilitado = false

        return mouse
    }

    eliminarCpu(){
        var cpu = this.cpu
        this.cpu = null
        this.habilitado = false

        return cpu
    }


}

module.exports = PuestoDeConsulta;