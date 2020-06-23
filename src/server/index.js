const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const { writeTest } = require('./write-test')

const app = express()

app.use(bodyParser.json())

const configPath = `${process.cwd()}/recorder.config.js`
let config = {}

if (fs.existsSync(configPath)) {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  config = require(configPath)
}

const appUrl = config.appUrl || 'http://localhost:8080'

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', appUrl)
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
