const expect = require('chai').expect

// const Equipo = require('../src/clases/equipo.js')
// const EquipoInventariable = require('../src/clases/equipo_inventariable.js')
const CamaraFactory = require('../src/clases/camaraFactory.js')
const TiposDeEquipos = require('../src/tipos/tiposDeEquipos.js')

describe('Equipo', function(){
    //const camara = new EquipoInventariable('Logitech','C925','camara',562264)
    const camara = (new CamaraFactory).crear('Logitech','C925',562264)
    describe('#getMarca', function(){
        it('Devuelve la marca: Logitech', function(){
            const resultado = camara.getMarca()
            expect(resultado).to.eql( 'Logitech' )
        })
    })

    describe('#getModelo', function(){
        it('Devuelve el modelo: C925', function(){
            const resultado = camara.getModelo()
            expect(resultado).to.eql( 'C925' )
        })
    })

    describe('#getTipoDeEquipo', function(){
        it('Devuelve el tipo de equipo: CAMARA', function(){
            const resultado = camara.getTipoDeEquipo()
            expect(resultado).to.eql( TiposDeEquipos.Camara )
        })
    })

    describe('#getInventario', function(){
        it('Devuelve el inventario: 562264', function(){
            const resultado = camara.getInventario()
            expect(resultado).to.eql( 562264 )
        })
    })
})