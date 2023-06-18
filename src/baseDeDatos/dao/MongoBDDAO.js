const { MongoClient } = require('mongodb')
const urlMongo = require('./claves')

module.exports = class MongoDBDao {
  constructor(collection) {
        const url = urlMongo
        this.client = new MongoClient(url)

        // Database Name
        this.dbName = 'mapeoDeOficinas';
        this.collection = collection;
      }
    
      async conectar() {
        try {
          await this.client.connect()
          this.db = this.client.db(this.dbName)
          this.collection2 = this.db.collection(this.collection)
        } catch (e) {
          console.log("No se pudo conectar a MongoDB")
        }
      }

      async agregar(objeto){
        console.log(objeto)
        await this.collection2.insertOne(objeto)
      }

      desconectar(){
        this.client.close()
      }
    
      async obtenerTodos(tipoDeEquipo) {
        /*const findResult = {}
        try{
            findResult = await collection.find().toArray();
        } catch(e){
            console.log("no")
        }*/
        const findResult = await this.collection2.find({'tipoDeEquipo':tipoDeEquipo}).toArray();
        return findResult;
      }

      async obtener(filtro) {
        /*const findResult = {}
        try{
            findResult = await collection.find().toArray();
        } catch(e){
            console.log("no")
        }*/
        const findResult = await this.collection2.find(filtro).toArray();
        return findResult[0];
      }

      async obtenerInventario(){
        const ultimoEquipo = await this.collection2.find().sort({$natural:-1}).limit(1).toArray();
        return ultimoEquipo[0].inventario + 1
      }

      async actualizar(llave,objeto){
        await this.collection2.updateOne(llave,{$set:objeto})
      }
    }

