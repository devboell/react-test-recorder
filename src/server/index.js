const express = require('express')
const bodyParser = require('body-parser')
const { writeTest } = require('./write-test')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
})

app.post('/recording', (req, res) => {
  // console.log('req.body', JSON.stringify(req.body, null, 2))
  writeTest(req.body)
  res.sendStatus(200)
})

app.listen(2000, () => console.log('server listening, 2000'))
