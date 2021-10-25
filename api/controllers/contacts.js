// model
// ok
const ContactModel = require('../models/Contact');
const PropertyModel = require('../models/Property');
const verifyToken = require('../utils/verifyToken');

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
        res.json(data)
      })
      .catch(error => {
        res.status(400).json(error)
      })
  })

  // update a contact
  app.put('/api/valid-contact', (req, res) => {
    const contactId = req.body._id
    ContactModel.findOneAndUpdate({ _id: contactId }, { $set: { pending: false } })
      .then(data => {
        res.send(data)
      })
      .catch(error => {
        res.status(500).json({message: 'Problem has occured while the server operation'})
    })
  })

  app.delete('/api/delete-contact/:id', (req, res) => {
    // find the property to check if the order is VALID OR NOT
    ContactModel.findById(req.params.id)
      .then((contact) => {
          // check if contact a valided order or not
        if (contact.pending) {
            /**
             * if Admin don't check contact =>
             * SET PROPERTY TO WAITING = FALSE and DELETE the CONTACT
             * THE PROPERTY RETURN ON SELLING (ACHAT)
             */
            PropertyModel.findOneAndUpdate({ _id: contact.property._id }, { $set: { waiting: false } }, function (error) {
              if (error) {
                console.log(error)
              }
            })
            // res.send({success: true})
          } else {
            /**
             * if Admin check contact =>
             * SET PROPERTY TO SOLDED and DELETE the CONTACT
             */
            PropertyModel.findOneAndUpdate({ _id: contact.property._id }, { $set: { sold: true } }, function (error) {
              if (error) {
                console.log(error)
              }
            })
            // res.send({message: 'solded'})
          }
      })
      .catch((err) => {
        console.log(err)
      });
      // if contact found
    // delete after
    ContactModel.remove({ _id: req.params.id }, (error, _) => {
      if (error) {
        res.status(400).send(error)
      }
      res.send({success: true})
    })
  })
}

module.exports = controller
