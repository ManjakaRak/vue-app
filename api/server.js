// import
const express = require('express')
const bodyParser = require('body-parser')

// server
const app = express()

// configuration
// bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// route
app.get('/', (req, res) => {
  res.status(200).send('ok')
})

// launch server
app.listen(5000, _ => {
  console.log('server is running on 5000')
})