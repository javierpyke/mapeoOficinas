const TiposDeEquipos = require("../tipos/tiposDeEquipos");
const Equipo = require("./equipo");

class MonitorFactory{
    crear(marca,modelo,inventario){
        return new Equipo(marca,modelo,TiposDeEquipos.Monitor,inventario)
    }
}

module.exports = MonitorFactory