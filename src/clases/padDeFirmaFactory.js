const TiposDeEquipos = require("../tipos/tiposDeEquipos");
const EquipoInventariable = require("./equipo_inventariable");

class PadDeFirmaFactory{
    crear(marca,modelo,inventario){
        return new EquipoInventariable(marca,modelo,TiposDeEquipos.PadDeFirma,inventario)
    }
}

module.exports = PadDeFirmaFactory