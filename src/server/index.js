const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const { writeTest } = require('./write-test')

const run = async () => {
  const app = express()

  app.use(bodyParser.json())

  const configPath = `${process.cwd()}/recorder.config.js`
  let config = {}

  if (fs.existsSync(configPath)) {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    config = require(configPath)
    console.info('using config file', config)
  }

  const appUrl = config.appUrl || 'http://localhost:8080'
  const { resetDataStoreFile } = config

  const resetDataStorePath = `${process.cwd()}/${resetDataStoreFile}`

  let resetDataStore
  if (fs.existsSync(resetDataStorePath)) {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    resetDataStore = require(resetDataStorePath)
    console.info('using resetDataStore file', resetDataStorePath)
  }

  const getRootDir = () => config.rootDir || '.'

  const rootDir = `${process.cwd()}/${getRootDir()}`

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', appUrl)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    )
    next()
  })
  app.post('/start', async (req, res) => {
    console.log('resetting DS')
    await resetDataStore()
    console.log('finished resetting DS')
    res.sendStatus(200)
  })
  app.post('/recording', (req, res) => {
    // console.log('req.body', JSON.stringify(req.body, null, 2))
    writeTest(req.body, rootDir)
    res.sendStatus(200)
  })

  app.listen(2000, () => console.info('server listening, 2000'))
}

run()
