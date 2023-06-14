const TiposDeEquipos = require("../../tipos/tiposDeEquipos");
const EquipoInventariable = require("./equipoInventariable");

class MonitorFactory{
    crear(marca,modelo,inventario){
        return new EquipoInventariable(marca,modelo,TiposDeEquipos.Monitor,inventario)
    }
}

module.exports = MonitorFactory