const { fileContents } = require('../write-test')
const mockRecording = require('./mocks/signIn.json')

it('should ', () => {
  const received = fileContents(mockRecording)
  expect(received).toMatchSnapshot()
})
