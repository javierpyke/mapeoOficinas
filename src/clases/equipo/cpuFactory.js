const TiposDeEquipos = require("../../tipos/tiposDeEquipos");
const EquipoInventariable = require("./equipoInventariable");

class CpuFactory{
    crear(marca,modelo,inventario){
        return new EquipoInventariable(marca,modelo,TiposDeEquipos.Cpu,inventario)
    }
}

module.exports = CpuFactory