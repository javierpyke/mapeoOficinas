const Equipo = require('./equipo.js')

class EquipoInventariable extends Equipo{
    constructor(arca,modelo,tipoDeEquipo,inventario){
        super(arca,modelo,tipoDeEquipo);
        this.inventario = inventario
    }

    getInventario(){
        return this.inventario
    }

}

module.exports = EquipoInventariable;