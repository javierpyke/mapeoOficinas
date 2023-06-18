const PuestoDeConsulta = require("../puesto/puesto");

class Centro{
    constructor(direccion,numeroDeCentro){
        this.setDireccion(direccion)
        this.setNumeroDeCentro(numeroDeCentro)
        this.puestos = []
    }

    setDireccion(direccion){
        if(!direccion){
            throw new Error('Falta direccion del centro')
        } else {
            this.direccion = direccion
        }
    }

    

    setNumeroDeCentro(numeroDeCentro){
        if(!numeroDeCentro){
            throw new Error('Falta el numero del centro')
        } else {
            this.numeroDeCentro = numeroDeCentro
        }
    }

    setEncargado(encargado){
        if(!this.encargado){
            this.encargado = encargado
            return this
        } else {
            throw new Error('El centro ya posee un encargado')
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
        teclado.enUso()
        try{
            this.puestos[numeroDePuesto-1].setTeclado(teclado)
        }catch(e){
            throw e
        }
        
    }

    quitarTeclado(numeroDePuesto){
        try{
            return this.puestos[numeroDePuesto-1].eliminarTeclado()
        } catch(e){
            throw e
        }
        
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

    deshabilitarPuesto(numeroDePuesto){
        this.puestos[numeroDePuesto-1].deshabilitar()
    }

    setPuestos(puestos){
        this.puestos = puestos
    }
}

module.exports = Centro;