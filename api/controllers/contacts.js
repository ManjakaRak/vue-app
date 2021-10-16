// model
const ContactModel = require('../models/Contact')

// create controller
const controller = (app) => {
  // get all contact
  app.get('/api/contacts', (_, res) => {
    const contacts = ContactModel.find({})
      .then(data => {
        res.send(data)
      })
      .catch(error => {
      res.send(error)
    })
  })
}

module.exports = controller