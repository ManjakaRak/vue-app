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
    const property = req.body.property
    property.waiting = true
    // change waiting to true => the property is not avable now
    const newContact = new ContactModel({
      name: req.body.name,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      message: req.body.message,
      property: property,
      pending: true
    })
    newContact.save()
    .then(data => {
        PropertyModel.findOneAndUpdate({ name: req.body.property.name }, { $set: { waiting: true } }, function (error) {
          if (error) {
            console.log(error)
          }
        })
        res.status(200).json(data)
      })
      .catch(error => {
        res.status(400).json(error)
      })
  })
}

module.exports = controller
