const express = require('express')
const app = express()
const port = 3000
const ProveedorServicios = require('../servicios/proveedorServicios.js')





app.listen(port, () => {
  console.log(`Nuestro server está funcionando bien en el port ${port}`)
})