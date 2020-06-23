const { MongoClient } = require('mongodb')

const users = require('./users')

const url = 'mongodb://localhost:27017'
const dbName = 'recorder-example'

const run = async () => {
  const client = await MongoClient.connect(url, {
    useUnifiedTopology: true,
  })
  const db = client.db(dbName)
  await db.dropDatabase()

  await db.collection('users').insertMany(users)

  client.close()
}

run()
