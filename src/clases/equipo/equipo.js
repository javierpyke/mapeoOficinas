class Equipo{
    constructor(marca,modelo,tipoDeEquipo,inventario){
        this.setMarca(marca)
        this.setModelo(modelo)
        this.setTipoDeEquipo(tipoDeEquipo)
        this.usado = false
        this.setInventario(inventario)
    }

    getInformacion(){
        return `${this.getTipoDeEquipo()} - Marca: ${this.getMarca()} - Modelo: ${this.getModelo()} - Inventario: ${this.getInventario()} - Estado: ${this.estado()}`
    }

    estado(){
        let estado = 'Libre'
        if(this.estaUsado()){
            estado = 'En uso'
        }
        return estado
    }

    setMarca(marca){
        if(!marca){
            throw new Error('Falta Marca');
        } else {
            this.marca = marca
        }
        
    }

    setUsado(usado){
        this.usado = usado
    }

    enUso(){
        this.usado = true
    }

    libre(){
        this.usado = false
    }

    estaUsado(){
        return this.usado
    }

    setModelo(modelo){
        if(!modelo){
            throw new Error('Falta Modelo');
        } else {
            this.modelo = modelo
        }
        
    }

    setTipoDeEquipo(tipoDeEquipo){
        if(!tipoDeEquipo){
            throw new Error('Falta Tipo De Equipo');
        } else {
            this.tipoDeEquipo = tipoDeEquipo
        }
        
    }

    setInventario(inventario){
        if(!inventario){
            throw new Error('Falta Inventario');
        } else {
            this.inventario = inventario
        }
        
    }

    getMarca(){
        return this.marca
    }

    getModelo(){
        return this.modelo
    }

    getTipoDeEquipo(){
        return this.tipoDeEquipo
    }


    informarEnUso(){
        this.usado = true
    }

    informarLibre(){
        this.usado = false
    }
    
    getInventario(){
        return this.inventario
    }
}

module.exports = Equipo;