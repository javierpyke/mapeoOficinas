const CentroPropio = require('./centroPropio.js')

class App{
    constructor(){
        this.centros = []
    }

    agregarCentro(centro){
        this.centros.push(centro)
    }

    crearCentro(direccion,numeroDeCentro){
        this.agregarCentro(new CentroPropio(direccion,numeroDeCentro))
    }

    getCentro(numeroDeCentro){
        return this.centros.find( centro => centro.getNumeroDeCentro() === numeroDeCentro );
    }

    crearPuesto(numeroDeCentro){
        this.getCentro(numeroDeCentro).crearPuesto()
    }

    agregarTeclado(numeroDeCentro,numeroDePuesto,teclado){
        this.getCentro(numeroDeCentro).getPuesto(numeroDePuesto).setTeclado(teclado)
    }

    agregarMouse(numeroDeCentro,numeroDePuesto,mouse){
        this.getCentro(numeroDeCentro).getPuesto(numeroDePuesto).setMouse(mouse)
    }

    agregarMonitor(numeroDeCentro,numeroDePuesto,monitor){
        this.getCentro(numeroDeCentro).getPuesto(numeroDePuesto).setMonitor(monitor)
    }

    agregarCpu(numeroDeCentro,numeroDePuesto,cpu){
        this.getCentro(numeroDeCentro).getPuesto(numeroDePuesto).setCpu(cpu)
    }

    habilitarPuesto(numeroDeCentro,numeroDePuesto){
        this.getCentro(numeroDeCentro).getPuesto(numeroDePuesto).habilitar()
    }
}

module.exports = App;