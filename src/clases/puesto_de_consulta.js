class PuestoDeConsulta{
    constructor(numeroDePuesto){
        this.numeroDePuesto = numeroDePuesto
        this.habilitado = false
    }

    setTeclado(teclado){
        if(teclado.tipoDeEquipo === 'teclado'){
            this.teclado = teclado
        }        
    }

    setMouse(mouse){
        this.mouse = mouse
    }

    setCpu(cpu){
        this.cpu = cpu
    }

    setMonitor(monitor){
        this.monitor = monitor
    }

    habilitar(){
        console.log('ok')
        if(this.mouse && this.cpu && this.monitor && this.teclado){
            console.log('ok2')
            this.habilitado = true
        }
    }

    estaHabilitado(){
        return this.habilitado
    }

}

module.exports = PuestoDeConsulta;