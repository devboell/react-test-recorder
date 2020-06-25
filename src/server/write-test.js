const fs = require('fs')
const path = require('path')
const fileContents = require('./generateTestFile')

const writeTest = ({
  recording,
  filePath,
  locationPath,
  localStorage,
  description,
}) => {
  const contents = fileContents(recording, locationPath, localStorage)

  // console.log('path.dirname', path.dirname(filePath))
  // const dirname = path.dirname(filePath)
  fs.mkdirSync(filePath, { recursive: true })
  fs.writeFileSync(`./${filePath}/index.test.js`, contents)
  fs.writeFileSync(
    `./${filePath}/recording.json`,
    JSON.stringify(recording, null, 2),
  )
  fs.writeFileSync(`./${filePath}/description.txt`, description)
}

module.exports = {
  writeTest,
  fileContents,
}
