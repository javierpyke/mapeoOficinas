const { MongoClient } = require('mongodb')

module.exports = class MongoDBDao {
  constructor(collection) {

        const url = 'url'
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
        await this.collection2.insertOne(objeto)
      }

      desconectar(){
        this.client.close()
      }
    
      async obtenerTodas() {
        /*const findResult = {}
        try{
            findResult = await collection.find().toArray();
        } catch(e){
            console.log("no")
        }*/
        const findResult = await this.collection2.find().toArray();
        return findResult;
      }
    }
