const TiposDeEquipos = require("../tipos/tiposDeEquipos");
const Equipo = require("./equipo");

class CpuFactory{
    crear(marca,modelo,inventario){
        return new Equipo(marca,modelo,TiposDeEquipos.Cpu,inventario)
    }
}

module.exports = CpuFactory