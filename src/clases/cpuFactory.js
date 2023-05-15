const EquipoInventariable = require("./equipo_inventariable");

class CpuFactory{
    crear(marca,modelo,inventario){
        return new EquipoInventariable(marca,modelo,'cpu',inventario)
    }
}