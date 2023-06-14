const TiposDeEquipos = require("../../tipos/tiposDeEquipos");
const Equipo = require("./equipo");

class TecladoFactory{
    crear(marca,modelo){
        return new Equipo(marca,modelo,TiposDeEquipos.Teclado)
    }
}

module.exports = TecladoFactory