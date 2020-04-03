const express = require('express')

const app = express()

app.post('/recording', (req, res) => {
  console.log(req.body)
  res.sendStatus(200)
})

app.listen(2000, () => console.log('server listening'))
