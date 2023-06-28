const PuestoBuilder = require('../clases/puesto/puestoBuilder')
const EquipoServicios =require('../servicios/equipoServicios')
const TiposDeEquipos = require('../clases/tipos/tiposDeEquipos')
const TecladoFactory = require('../clases/equipo/tecladoFactory')
const MouseFactory = require('../clases/equipo/mouseFactory')
const MonitorFactory = require('../clases/equipo/monitorFactory')
const CpuFactory = require('../clases/equipo/cpuFactory')

module.exports = class PuestoServicios{
    constructor(){
    }

    transformarJsonEnConexion(datos){
        const teclado = (new EquipoServicios(TiposDeEquipos.Teclado, TecladoFactory)).transformarJsonEnEquipo(datos.teclado)
        const mouse = (new EquipoServicios(TiposDeEquipos.Mouse, MouseFactory)).transformarJsonEnEquipo(datos.mouse)
        const monitor = (new EquipoServicios(TiposDeEquipos.Monitor, MonitorFactory)).transformarJsonEnEquipo(datos.monitor)
        const cpu = (new EquipoServicios(TiposDeEquipos.Cpu, CpuFactory)).transformarJsonEnEquipo(datos.cpu)
        return (new PuestoBuilder)
                .setTeclado(teclado)
                .setMouse(mouse)
                .setMonitor(monitor)
                .setCpu(cpu)
                .setHabilitado(datos.habilitado)
                .build()
    }

    liberarPerifericos(puesto){
        const teclado = puesto.getTeclado()
        const mouse = puesto.getMouse()
        const monitor = puesto.getMonitor()
        const cpu = puesto.getCpu()

        if(teclado){
            (new EquipoServicios(TiposDeEquipos.Teclado, TecladoFactory)).equipoLibre(teclado)
        }

        if(mouse){
            (new EquipoServicios(TiposDeEquipos.Mouse, MouseFactory)).equipoLibre(mouse)
        }

        if(monitor){
            (new EquipoServicios(TiposDeEquipos.Monitor, MonitorFactory)).equipoLibre(monitor)
        }

        if(cpu){
            (new EquipoServicios(TiposDeEquipos.Cpu, CpuFactory)).equipoLibre(cpu)
        }

    }

}