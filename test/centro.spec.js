const expect = require('chai').expect
const Encargado = require('../src/clases/encargado.js')
const Conexion = require('../src/clases/conexion.js')
const Centro = require('../src/clases/centro.js')
const CentroPropio = require('../src/clases/centroPropio.js')
const CentroAnses = require('../src/clases/centroAnses.js')

describe('Centro', function(){
    const centroPropio = new CentroPropio()
    const encargado = new Encargado("Juan Ramirez",32152696,1169541525)
    const encargado2 = new Encargado("Pedro Gomez",14521225,1178751652)
    const conexion = new Conexion(12454525,"Fibertel")
    const conexion2 = new Conexion(98646321346,"Personal")


    describe('#setEncargado', function(){
        it('Devuelve el encargado', function(){
            centroPropio.setEncargado(encargado)
            const resultado = centroPropio.getEncargado()
            expect(resultado).to.eql( encargado )
        })
    })

    describe('#setEncargado', function(){
        it('Devuelve el primer encargado agregado', function(){
            centroPropio.setEncargado(encargado2)
            const resultado = centroPropio.getEncargado()
            expect(resultado).to.eql( encargado )
        })
    })

    describe('#setEncargado', function(){
        it('Devuelve el segundo encargado agregado, despues de eliminar el primero', function(){
            const encargadoEliminado = centroPropio.eliminarEncargado()
            centroPropio.setEncargado(encargado2)
            const resultado = centroPropio.getEncargado()
            expect(resultado).to.eql( encargado2 )
        })
    })

    describe('#setConexion', function(){
        it('Devuelve la conexion', function(){
            centroPropio.setConexion(conexion)
            const resultado = centroPropio.getConexion()
            expect(resultado).to.eql( conexion )
        })
    })

    describe('#setConexion', function(){
        it('Devuelve la primera conexion agregada', function(){
            centroPropio.setConexion(conexion2)
            const resultado = centroPropio.getConexion()
            expect(resultado).to.eql( conexion )
        })
    })

    describe('#setConexion', function(){
        it('Devuelve la primera conexion agregada, despues de eliminar la primera', function(){
            const conexionEliminado = centroPropio.eliminarConexion()
            centroPropio.setConexion(conexion2)
            const resultado = centroPropio.getConexion()
            expect(resultado).to.eql( conexion2 )
        })
    })

    
})