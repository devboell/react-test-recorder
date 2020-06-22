const fs = require('fs')
const fileContents = require('./generateTestFile')

const writeTest = ({ recording, fileName }) => {
  const contents = fileContents(recording)
  fs.writeFileSync(
    `./src/recorded-tests/${fileName}.test.js`,
    contents,
  )
}

module.exports = {
  writeTest,
  fileContents,
}
