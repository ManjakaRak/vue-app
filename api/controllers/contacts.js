// model
const ContactModel = require('../models/Contact')
const PropertyModel = require('../models/Property')

// create controller
const controller = (app) => {
  // get all contact
  app.get('/api/contacts', (_, res) => {
    ContactModel.find({})
      .then(data => {
        res.send(data)
      })
      .catch(error => {
        res.send(error)
      })
  })

  // add a new contact
  app.post('/api/contact/add', (req, res) => {
    // change waiting to true => the property is not avable now
    PropertyModel.findOneAndUpdate({ name: req.body.property.name }, { $set: { waiting: true } }, function (error) {
      if (error) {
        console.log(error)
      }
    })
    const newContact = new ContactModel({
      name: req.body.name,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      message: req.body.message,
      property: req.body.property,
      pending: true
    })

    newContact.save()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(error => {
        res.status(400).json(error)
      })
  })
}

module.exports = controller
