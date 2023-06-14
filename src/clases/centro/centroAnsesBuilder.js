const CentroBuilder = require('./centroBuilder')
const CentroAnses = require('./centroAnses')

class CentroAnsesBuilder extends CentroBuilder{
    constructor(){
        super()
    }

    setNumeroDeAnses(numeroDeAnses){
        this.numeroDeAnses = numeroDeAnses

        return this
    }

    build(){
        this.centro = new CentroAnses(this.direccion,this.numeroDeCentro)
        this.centro.setNumeroDeAnses(this.numeroDeAnses)
        return this.centro
    }
}

module.exports = CentroAnsesBuilder