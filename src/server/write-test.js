const fs = require('fs')
const path = require('path')
const fileContents = require('./generateTestFile')

const writeTest = ({
  recording,
  filePath,
  locationPath,
  localStorage,
}) => {
  const contents = fileContents(recording, locationPath, localStorage)

  console.log('path.dirname', path.dirname(filePath))
  const dirname = path.dirname(filePath)
  fs.mkdirSync(dirname, { recursive: true })
  fs.writeFileSync(`./${filePath}.test.js`, contents)
}

module.exports = {
  writeTest,
  fileContents,
}
