const TiposDeEquipos = require("../tipos/tiposDeEquipos")

class Puesto{
    constructor(){
        this.habilitado = false
    }

    setTeclado(teclado){
        if(this.teclado){
            throw new Error('El puesto ya posee un teclado')
        }
        if(!this.teclado && teclado && teclado.tipoDeEquipo === TiposDeEquipos.Teclado){
            this.teclado = teclado
        }        
    }

    setHabilitado(habilitado){
        this.habilitado = habilitado
    }

    getTeclado(){
        return this.teclado
    }

    setMouse(mouse){
        if(mouse && mouse.tipoDeEquipo === TiposDeEquipos.Mouse){
            this.mouse = mouse
        }   
    }

    getMouse(){
        return this.mouse
    }

    setCpu(cpu){
        if(cpu && cpu.tipoDeEquipo === TiposDeEquipos.Cpu){
            this.cpu = cpu
        }   
    }

    getCpu(){
        return this.cpu
    }

    setMonitor(monitor){
        if(monitor && monitor.tipoDeEquipo === TiposDeEquipos.Monitor){
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

    deshabilitar(){
        this.habilitado = false
    }

    estaHabilitado(){
        return this.habilitado
    }

    getNumeroDePuesto(){
        return this.numeroDePuesto
    }

    eliminarTeclado(){
        if(!this.teclado){
            throw new Error('El puesto no posee teclado')
        }
        let teclado = this.teclado
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

module.exports = Puesto;