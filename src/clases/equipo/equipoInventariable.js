const Equipo = require('./equipo.js')

class EquipoInventariable extends Equipo{
    constructor(marca,modelo,tipoDeEquipo,inventario){
        super(marca,modelo,tipoDeEquipo);
        this.inventario = inventario
    }

    getInventario(){
        return this.inventario
    }

    

}

module.exports = EquipoInventariable;