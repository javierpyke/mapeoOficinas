const PuestoDeConsulta = require("./puesto_de_consulta");

class Centro{
    constructor(direccion,numeroDeCentro){
        this.direccion = direccion
        this.numeroDeCentro = numeroDeCentro
        this.puestos = []
    }

    setEncargado(encargado){
        if(!this.encargado){
            this.encargado = encargado
        }
    }

    eliminarEncargado(){
        var encargado = this.encargado
        this.encargado = null

        return encargado
    }

    getEncargado(){
        return this.encargado;
    }

    getNumeroDeCentro(){
        return this.numeroDeCentro
    }

    getPuesto(numeroDePuesto){
        return this.puestos[numeroDePuesto-1]
    }

    crearPuesto(){
        this.puestos.push(new PuestoDeConsulta())
    }

    eliminarPuesto(numeroDePuesto){      
        var puestoEliminado = this.puestos.splice(numeroDePuesto-1,1)
        return puestoEliminado
        
    }

    habilitarPuesto(numeroDePuesto){
        this.puestos[numeroDePuesto-1].habilitar()
    }

    agregarTeclado(teclado,numeroDePuesto){
        this.puestos[numeroDePuesto-1].setTeclado(teclado)
    }

    agregarMouse(mouse,numeroDePuesto){
        this.puestos[numeroDePuesto-1].setMouse(mouse)
    }

    agregarMonitor(monitor,numeroDePuesto){
        this.puestos[numeroDePuesto-1].setMonitor(monitor)
    }

    agregarCpu(cpu,numeroDePuesto){
        this.puestos[numeroDePuesto-1].setCpu(cpu)
    }

}

module.exports = Centro;