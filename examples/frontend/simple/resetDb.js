const { spawn } = require('child_process')

const uri = 'mongodb://localhost:27017/recorder-example'
const dir = './dump'

module.exports = async () =>
  new Promise((resolve, reject) => {
    const child = spawn('mongorestore', [
      '--uri',
      uri,
      '--dir',
      dir,
      '--drop',
    ])

    /*
  child.stdout.on('data', (data) => {
    console.log(`mongorestore, stdout: ${data}`)
  })

  child.stderr.on('data', (data) => {
    console.log(`mongorestore, stderr: ${data}`)
  })
  */

    child.on('close', (code) =>
      code !== 0
        ? reject(new Error(`mongorestore, failed with code ${code}`))
        : resolve(),
    )
  })
