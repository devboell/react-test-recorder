const fs = require('fs')
const path = require('path')
const fileContents = require('./generateTestFile')

const writeTest = (
  { recording, filePath, locationPath, localStorage, description },
  rootDir,
) => {
  const contents = fileContents(recording, locationPath, localStorage)

  // console.log('path.dirname', path.dirname(filePath))
  // const dirname = path.dirname(filePath)
  const rootPath = `${rootDir}/${filePath}`
  fs.mkdirSync(rootPath, { recursive: true })
  fs.writeFileSync(`${rootPath}/index.test.js`, contents)
  fs.writeFileSync(
    `${rootPath}/recording.json`,
    JSON.stringify(recording, null, 2),
  )
  fs.writeFileSync(`${rootPath}/description.txt`, description)
}

module.exports = {
  writeTest,
  fileContents,
}
