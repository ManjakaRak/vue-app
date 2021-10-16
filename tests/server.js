const express = require('express')
const app = express()

app.use(require('body-parser').json())
app.use(require('cors')())

app.post('/api', (req, res) => {
  // const data = {}
  // data.username = req.query.username
  // data.pass = req.query.pass
  res.send(req)
  console.log(req.body.username)
})

app.listen(7000, _ => {
  console.log('run ..')
})