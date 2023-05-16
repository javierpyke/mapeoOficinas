class CentroAnses extends Centro {
    constructor(){
        super()
    }

    setNumeroDeAnses(numeroDeAnses){
        this.numeroDeAnses = numeroDeAnses
    }

    getNumeroDeAnses(){
        return this.numeroDeAnses
    }

    eliminarNumeroDeAnses(){
        var numeroDeAnses = this.numeroDeAnses
        this.numeroDeAnses = null

        return numeroDeAnses
    }
}

module.exports = CentroAnses