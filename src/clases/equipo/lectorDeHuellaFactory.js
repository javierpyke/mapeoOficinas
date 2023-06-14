const TiposDeEquipos = require("../../tipos/tiposDeEquipos");
const EquipoInventariable = require("./equipoInventariable");

class LectorDeHuellaFactory{
    crear(marca,modelo,inventario){
        return new EquipoInventariable(marca,modelo,TiposDeEquipos.LectorDeHuella,inventario)
    }
}

module.exports = LectorDeHuellaFactory