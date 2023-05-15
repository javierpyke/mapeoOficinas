class Centro{
    constructor(direccion,numeroDeCentro){
        this.direccion = direccion
        this.numeroDeCentro = numeroDeCentro
    }

    setEncargado(encargado){
        this.encargado = encargado
    }

    getEncargado(){
        return this.encargado;
    }

    getNumeroDeCentro(){
        return this.numeroDeCentro
    }
}

module.exports = Centro;