const initApp = require('./app')

const run = async () => {
  const app = await initApp()
  app.listen(3001, () => console.log('App listening port 3001'))
}

run()
