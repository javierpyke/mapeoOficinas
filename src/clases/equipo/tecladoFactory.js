const TiposDeEquipos = require("../tipos/tiposDeEquipos");
const Equipo = require("./equipo");

class TecladoFactory{
    crear(marca,modelo,inventario){
        return new Equipo(marca,modelo,TiposDeEquipos.Teclado,inventario)
    }
}

module.exports = TecladoFactory