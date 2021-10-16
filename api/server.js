// server for api rest
// import
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

// controllers
const contactController = require('./controllers/contacts')
const propertyController = require('./controllers/properties')
// const router = express.Router()

// instance express
const app = express()

// use
app.use(cors())
app.use(bodyParser.json())

// connect to MongoDB
mongoose.connect('mongodb://localhost/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(_ => {
  console.log('Connection to db has made successfully')
}).catch(err => {
  console.log(err.stack)
})

// config api routes (endpoints)
app.get('/api', (_, res) => {
  res.json({message: 'API initialized'})
})
// app.get('/', router)

// PORT
const PORT = process.env.PORT || 5000

// fetch data from controllers
propertyController(app)
contactController(app)

// run server
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})
