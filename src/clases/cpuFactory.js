const TiposDeEquipos = require("../tipos/tiposDeEquipos");
const EquipoInventariable = require("./equipo_inventariable");

class CpuFactory{
    crear(marca,modelo,inventario){
        return new EquipoInventariable(marca,modelo,TiposDeEquipos.Cpu,inventario)
    }
}

module.exports = CpuFactory