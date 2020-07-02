const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const { MongoClient, ObjectId } = require('mongodb')

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

  app.get('/movies', async (req, res) => {
    const movies = await db.collection('movies').find({}).toArray()
    res.send({ movies })
  })

  app.put('/movies/:id', async (req, res) => {
    const movie = await db.collection('movies').updateOne(
      {
        _id: ObjectId(req.params.id),
      },
      { $set: req.body },
    )

    res.send({ movie })
  })

  return app
}
