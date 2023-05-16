class Equipo{
    constructor(marca,modelo,tipoDeEquipo){
        this.marca = marca
        this.modelo = modelo
        this.funcionando = true
        this.tipoDeEquipo = tipoDeEquipo
    }

    getMarca(){
        return this.marca
    }

    estaFuncionando(){
        return this.funcionando
    }

    getModelo(){
        return this.modelo
    }

    getTipoDeEquipo(){
        return this.tipoDeEquipo
    }

    cambiarEstado(){
        this.funcionando = !this.funcionando
    }
    
}

module.exports = Equipo;