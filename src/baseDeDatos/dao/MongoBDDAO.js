const { MongoClient } = require('mongodb')
const urlMongo = require('./claves')

module.exports = class MongoDBDao {
  constructor(collection) {
        const url = urlMongo
        this.client = new MongoClient(url)

        // Database Name
        this.dbName = 'mapeoDeOficinas';
        this.collectionName = collection;
      }
    
      async conectar() {
        try {
          await this.client.connect()
          this.db = this.client.db(this.dbName)
          this.collection = this.db.collection(this.collectionName)
        } catch (e) {
          console.log("No se pudo conectar a MongoDB")
        }
      }

      async agregar(objeto){
        await this.collection.insertOne(objeto)
      }

      desconectar(){
        this.client.close()
      }
    
      async obtenerTodos(filtro) {
        const findResult = await this.collection.find(filtro).toArray();
        return findResult;
      }

      async obtener(filtro) {
        const findResult = await this.collection.find(filtro).toArray();
        return findResult[0];
      }

      async obtenerInventario(){
        const ultimoEquipo = await this.collection.find().sort({$natural:-1}).limit(1).toArray();
        return ultimoEquipo[0].inventario + 1
      }

      async actualizar(llave,objeto){
        await this.collection.updateOne(llave,{$set:objeto})
      }
    }

