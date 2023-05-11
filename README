# Mapeo de oficinas

Se requiere hacer un sistema que lleve el control de los centros de toma del Registro Nacional de las Personas. Los centros pueden ser propios o pertenecientes a Anses, la única diferencia es que en los centros propios hay una conexión a internet con un proveedor (razón social, cuit, teléfono de soporte técnico y número de referencia del centro) varios centros pueden tener el mismo proveedor lo unico q cambiaria seria el numero de referencia. En el caso de que el centro pertenezca a Anses ellos proveerán la conexión, solo tendríamos el número de oficina de Anses al que corresponde.
Los centros tienen dirección, número de centro y un encargado (con nombre,dni,número de teléfono), dentro del centro hay puestos (cada uno tiene su número), estos pueden ser puestos de consulta o de toma de trámite. Para que un puesto de consulta esté habilitado se necesita que haya un monitor, una cpu, un teclado y un mouse (todos en condición funcionando). Para que un puesto de toma esté habilitado, además de contar con los equipos del puesto de consulta se necesita que estén un funcionamiento un lector de huellas, un pad de firmas y una cámara.
Todos equipos informáticos cuentan con marca, modelo y un estado (roto o funcionando), tanto los monitores, cpu, lector de huella, pad de firma y cámaras son productos inventariables es decir que cuentan con un número de inventario propio del renaper el cual es único e incremental sin importar de qué equipo se trate. EJ: Ingresan 10 monitores y serán el 1,2,3…10 si luego ingresan cámaras seguirá el inventario desde el 11.

* La aplicación tiene que tener tres tipos de soporte técnico:
    Nivel 1: Pueden listar los centros, ver los equipos y hacer cambios de equipos. Nivel 2: Lo mismo que un nivel 1 y agregar puestos.
    Nivel 3: Lo mismo que nivel 2 y crear nuevos centros.
* Cada puesto puede tener un solo equipo de cada tipo y un equipo solo puede estar en un puesto.
* Los puestos pueden pasar de ser de Consulta a puesto de Toma y viceversa (para ello habría que retirar los equipos que no sean necesario firma, camara, huella)
* Cada centro puede tener varios encargados y un encargado solo puede tener a cargo un centro. 
