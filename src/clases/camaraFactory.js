const EquipoInventariable = require("./equipo_inventariable");
const TiposDeEquipo = require("../tipos/tiposDeEquipos.js")


class CamaraFactory{
    crear(marca,modelo,inventario){
        return new EquipoInventariable(marca,modelo,TiposDeEquipo.Camara,inventario)
    }
}

module.exports = CamaraFactory;