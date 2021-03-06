// server for api rest
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routers/index')
const path = require('path')
const serveStatic = require('serve-static')
// instance express
const app = express()

// server static
app.use('/', serveStatic(path.join(__dirname, '../dist')))

// controllers
const contactController = require('./controllers/contacts')
const propertyController = require('./controllers/properties')

// use
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// connect to MongoDB
mongoose.connect('mongodb://localhost/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(_ => {
  console.log('Connection to db has made successfully')
}).catch(err => {
  console.log(err)
})

app.use(router)

// PORT
const PORT = process.env.PORT || 5000

// fetch data from controllers
propertyController(app)
contactController(app)
// securityController(app)

// run server
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})
