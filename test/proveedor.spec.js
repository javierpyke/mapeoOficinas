const expect = require('chai').expect

const Proveedor = require('../src/clases/proveedor.js')


describe('Proveedor', function(){
    const proveedor = new Proveedor('Personal SA','30-545215-9','0800-6556-5252')

    describe('#getRazonSocial', function(){
        it('Devuelve la razon social', function(){
            const resultado = proveedor.getRazonSocial()
            expect(resultado).to.eql( 'Personal SA' )
        })
    })

    describe('#setRazonSocial', function(){
        it('Devuelve la primer razon social cargada', function(){
            proveedor.setRazonSocial('Fibertel SA')
            const resultado = proveedor.getRazonSocial()
            expect(resultado).to.eql( 'Personal SA' )
        })
    })

    describe('#setRazonSocial', function(){
        it('Devuelve la segunda razon social cargada, despues de eliminar la primera', function(){
            const razonSocialEliminada = proveedor.eliminarRazonSocial()
            proveedor.setRazonSocial('Fibertel SA')
            const resultado = proveedor.getRazonSocial()
            expect(resultado).to.eql( 'Fibertel SA' )
        })
    })
    
})