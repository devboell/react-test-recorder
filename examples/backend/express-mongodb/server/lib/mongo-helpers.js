const { spawn } = require('child_process')

const dump = async (uri, out) => new Promise((resolve, reject) => {
  const child = spawn('mongodump', ['--uri', uri, '--out', out])

  /*
  child.stdout.on('data', (data) => {
    console.log(`mongodump, stdout: ${data}`)
  })

  child.stderr.on('data', (data) => {
    console.log(`mongodump, stderr: ${data}`)
  })
  */

  child.on('close', code => (
    code !== 0
      ? reject(new Error(`mongodump, failed with code ${code}`))
      : resolve()
  ))
})

const restore = async (uri, dir) => new Promise((resolve, reject) => {
  const child = spawn('mongorestore', ['--uri', uri, '--dir', dir, '--drop'])

  /*
  child.stdout.on('data', (data) => {
    console.log(`mongorestore, stdout: ${data}`)
  })

  child.stderr.on('data', (data) => {
    console.log(`mongorestore, stderr: ${data}`)
  })
  */

  child.on('close', code => (
    code !== 0
      ? reject(new Error(`mongorestore, failed with code ${code}`))
      : resolve()
  ))
})

module.exports = {
  dump,
  restore,
}
