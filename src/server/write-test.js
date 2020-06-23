const fs = require('fs')
const fileContents = require('./generateTestFile')

const writeTest = ({
  recording,
  fileName,
  locationPath,
  localStorage,
}) => {
  const contents = fileContents(recording, locationPath, localStorage)
  fs.writeFileSync(
    `./src/recorded-tests/${fileName}.test.js`,
    contents,
  )
}

module.exports = {
  writeTest,
  fileContents,
}
