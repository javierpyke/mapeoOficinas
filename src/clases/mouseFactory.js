const TiposDeEquipos = require("../tipos/tiposDeEquipos");
const Equipo = require("./equipo");

class MouseFactory{
    crear(marca,modelo){
        return new Equipo(marca,modelo,TiposDeEquipos.Mouse)
    }
}

module.exports = MouseFactory