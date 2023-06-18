const TiposDeEquipos = require("../tipos/tiposDeEquipos")
const Equipo = require("./equipo");

class MouseFactory{
    crear(marca,modelo,inventario){
        return new Equipo(marca,modelo,TiposDeEquipos.Mouse,inventario)
    }
}

module.exports = MouseFactory