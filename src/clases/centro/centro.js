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

    getDireccion(){
        return this.direccion
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

    eliminarConexion(){
        var conexion = this.conexion
        this.conexion = null

        return conexion
    }

    getEncargado(){
        return this.encargado;
    }

    getNumeroDeCentro(){
        return this.numeroDeCentro
    }

    getPuesto(numeroDePuesto){
        const puesto = this.puestos[numeroDePuesto-1]
        if(!puesto){
            throw new Error('El centro no posee ese numero de puesto')
        }
        return puesto
    }

    getPuestos(){
        return this.puestos
    }

    crearPuesto(){
        this.puestos.push(new PuestoDeConsulta())
    }

    getNumeroDePuesto(puesto){
        return this.puestos.indexOf(puesto) + 1
    }

    habilitarPuesto(numeroDePuesto){
        this.puestos[numeroDePuesto-1].habilitar()
    }

    agregarTeclado(teclado,numeroDePuesto){
        teclado.enUso()
        try{
            this.getPuesto(numeroDePuesto).setTeclado(teclado)
        }catch(e){
            throw e
        }        
    }

    quitarTeclado(numeroDePuesto){
        try{
            return this.getPuesto(numeroDePuesto).eliminarTeclado()
        } catch(e){
            throw e
        }        
    }

    agregarMouse(mouse,numeroDePuesto){
        mouse.enUso()
        try{
            this.getPuesto(numeroDePuesto).setMouse(mouse)
        }catch(e){
            throw e
        }        
    }

    quitarMouse(numeroDePuesto){
        try{
            return this.getPuesto(numeroDePuesto).eliminarMouse()
        } catch(e){
            throw e
        }        
    }

    agregarMonitor(monitor,numeroDePuesto){
        monitor.enUso()
        try{
            this.getPuesto(numeroDePuesto).setMonitor(monitor)
        }catch(e){
            throw e
        }        
    }

    quitarMonitor(numeroDePuesto){
        try{
            return this.getPuesto(numeroDePuesto).eliminarMonitor()
        } catch(e){
            throw e
        }        
    }

    agregarCpu(cpu,numeroDePuesto){
        cpu.enUso()
        try{
            this.getPuesto(numeroDePuesto).setCpu(cpu)
        }catch(e){
            throw e
        }        
    }

    quitarCpu(numeroDePuesto){
        try{
            return this.getPuesto(numeroDePuesto).eliminarCpu()
        } catch(e){
            throw e
        }        
    }

    setPuestos(puestos){
        this.puestos = puestos
    }

    habilitarPuesto(numeroDePuesto){
        try{
            this.puestos[numeroDePuesto-1].habilitar()
        } catch(e) {
            throw e
        }
    }

    deshabilitarPuesto(numeroDePuesto){
        try{
            this.puestos[numeroDePuesto-1].deshabilitar()
        } catch(e) {
            throw e
        }
        if(!this.algunPuestoHabilitado()){
            this.deshabilitar()
        }
    }

    eliminarPuesto(numeroDePuesto){
        let puesto = null
        let puestos = []
        try{
            puesto = this.getPuesto(numeroDePuesto)
            this.puestos.splice(numeroDePuesto-1, 1);
        } catch(e) {
            throw e
        }
        if(!this.algunPuestoHabilitado()){
            this.deshabilitar()
        }
        return puesto
    }

    deshabilitar(){
        this.habilitado = false
    }

    puestosHabilitados(){
        return this.puestos.filter(puesto => puesto.estaHabilitado())
    }

    algunPuestoHabilitado(){
        return (this.puestosHabilitados()).length > 0
    }

    habilitar(){
        if(!this.encargado){
            throw new Error('El centro no puede ser habilitado ya que le falta encargado')
        } else if (!this.conexion){
            throw new Error('El centro no puede ser habilitado ya que le falta una conexion')
        } else if(!this.algunPuestoHabilitado()){
            throw new Error('El centro no puede ser habilitado ya que no tiene ningun puesto habilitado')
        }
        this.habilitado = true
    }

    deshabilitar(){
        this.habilitado = false
    }

    getHabilitado(habilitado){
        return this.habilitado
    }

    setHabilitado(habilitado){
        this.habilitado = habilitado
    }

    getInformacion(){
        return `Numero de centro: ${this.getNumeroDeCentro()} - Direccion: ${this.getDireccion()} - ${this.getHabilitado()?'HABILITADO':'NO HABILITADO'}`
    }
}

module.exports = Centro;