const Equipo = require('./equipo.js')

class EquipoInventariable extends Equipo{
    constructor(marca,modelo,tipoDeEquipo,inventario){
        super(marca,modelo,tipoDeEquipo);
        this.setInventario(inventario)
    }

    getInventario(){
        return this.inventario
    }

    setInventario(inventario){
        if(!inventario){
            throw new Error('Falta Inventario');
        } else {
            this.inventario = inventario
        }
        
    }

    

}

module.exports = EquipoInventariable;