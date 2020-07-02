const { MongoClient } = require('mongodb')

const movies = require('./movies')

const url = 'mongodb://localhost:27017'
const dbName = 'recorder-example'

const run = async () => {
  const client = await MongoClient.connect(url, {
    useUnifiedTopology: true,
  })
  const db = client.db(dbName)
  await db.dropDatabase()

  await db.collection('movies').insertMany(movies)

  client.close()
}

run()
