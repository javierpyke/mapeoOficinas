const expect = require('chai').expect

const Puesto = require('../src/clases/puesto_de_consulta.js')
const TiposDeEquipos = require('../src/tipos/tiposDeEquipos.js')

describe('Puesto', function(){
    const puesto = new Puesto(1)
    describe('#getNumeroDePuesto', function(){
        it('Devuelve el numero de puesto: 1', function(){
            const resultado = puesto.getNumeroDePuesto()
            expect(resultado).to.eql( 1 )
        })
    })

    
})