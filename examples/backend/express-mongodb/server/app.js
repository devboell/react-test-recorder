const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const { MongoClient } = require('mongodb')

const app = express()
app.use(bodyparser.json())
app.use(cors())

module.exports = async (MONGO_URL, DB_NAME) => {
  const url = MONGO_URL || 'mongodb://localhost:27017'
  const dbName = DB_NAME || 'recorder-example'

  const client = await MongoClient.connect(url, {
    useUnifiedTopology: true,
  })
  const db = client.db(dbName)

  app.get('/', (req, res) => res.send({ status: 'ok' }))

  app.get('/users', async (req, res) => {
    const users = await db.collection('users').find({}).toArray()
    res.send({ users })
  })

  return app
}
