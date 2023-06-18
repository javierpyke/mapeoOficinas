const EquipoInventariable = require("./equipoInventariable");
const TiposDeEquipo = require("../tipos/tiposDeEquipos.js")


class CamaraFactory{
    crear(marca,modelo,inventario){
        try {
            return new EquipoInventariable(marca,modelo,TiposDeEquipo.Camara,inventario)
        } catch(e){
            throw e
        }
        
    }
}

module.exports = CamaraFactory;