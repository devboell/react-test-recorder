const fs = require('fs')
const path = require('path')
const fileContents = require('./generateTestFile')

const writeTest = ({
  recording,
  fileName,
  locationPath,
  localStorage,
}) => {
  const contents = fileContents(recording, locationPath, localStorage)

  console.log('path.dirname', path.dirname(fileName))
  const dirname = path.dirname(fileName)
  fs.mkdirSync(dirname, { recursive: true })
  fs.writeFileSync(`./${fileName}.test.js`, contents)
}

module.exports = {
  writeTest,
  fileContents,
}
