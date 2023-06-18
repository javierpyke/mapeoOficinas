const PuestoBuilder = require('../clases/puesto/puestoBuilder')
const EquipoServicios =require('../servicios/equipoServicios')

module.exports = class PuestoServicios{
    constructor(){
    }

    transformarJsonEnConexion(datos){
        const equipoServicios = new EquipoServicios
        const teclado = equipoServicios.transformarJsonEnTeclado(datos.teclado)
        const mouse = (new EquipoServicios).transformarJsonEnMouse(datos.mouse)
        return (new PuestoBuilder)
                .setTeclado(teclado)
                .setMouse(mouse)
                .setMonitor(datos.monitor)
                .setCpu(datos.cpu)
                .setHabilitado(datos.habilitado)
                .build()
    }

}