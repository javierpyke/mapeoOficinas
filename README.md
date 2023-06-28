# Mapeo de oficinas

Se requiere hacer un sistema que lleve el control de los centros de toma del Registro Nacional de las Personas. Los CENTROS tienen un ENCARGADO, una CONEXION y PUESTOS.

Todos equipos informáticos cuentan con marca, modelo y un inventario propio del renaper el cual es único e incremental sin importar de qué equipo se trate. EJ: Ingresan 10 monitores y serán el 1,2,3…10 si luego ingresan cámaras seguirá el inventario desde el 11.

#Para crear CENTRO se necesita numero de centro, direccion, ENCARGADO (que este en la base de datos) y CONEXION (que este en la base de datos).
* Un CENTRO puede tener solo un ENCARGADO y un ENCARGADO puede tener a cargo varios CENTROS
* Un CENTRO tiene una CONEXION y una CONEXION puede estar en varios CENTROS
* Un CENTRO tiene varios PUESTOS
    * Un PUESTO para poder habilitarse necesita tener un TECLADO, un MOUSE, una CPU Y un MONITOR. Si un PUESTO esta HABILITADO y se le quita algun EQUIPO para a estar NO HABILITADO
    * Un PUESTO puede tener un solo EQUIPO de cada tipo y un EQUIPO puede estar en un solo PUESTO
* Para poder habilitar un CENTRO tiene que tener al menos algun PUESTO HABILITADO, un ENCARGADO y una CONEXION. Si el CENTRO esta HABILITADO y se le quita algun requisito pasa a estar NO HABILITADO.


#Para crear un EQUIPO (TECLADO, MOUSE, CPU, MONITOR) se necesita marca y modelo y se le asignara automaticamente un numero de inventario.

#Para crear un ENCARGADO se necesita nombre, dni y telefono.

#Para crear una CONEXION se necesita un numero de referencia y un PROVEEDOR (que este en la base de datos)
*  Una CONEXION tiene un PROVEEDOR y un PROVEEDOR puede estar en varias CONEXIONES.

Para crear un PROVEEDOR se necesita razon social, cuit y telefono de soporte.




