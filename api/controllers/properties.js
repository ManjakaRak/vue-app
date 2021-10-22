// import model(s)
const PropertyModel = require('../models/Property')
const verifyToken = require('../utils/verifyToken')
/**
 * @param app: express()
 */
const controller = app => {
  // GET ALL PROPERTIES for ADMIN
  app.get('/api/admin/properties',verifyToken, (_, res) => {
    PropertyModel.find({})
      .then(response => {
        res.json(response)
      })
      .catch(err => {
        res.status(500).json({message: 'Cant\'fetch properties'})
      })
  })
  // get avalable properties
  app.get('/api/properties', (req, res) => {
    PropertyModel.find({waiting: false})
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res.send(err)
      })
  })
  // fetch one specific NON WAITING property
  app.get('/api/property/:id', (req, res) => {
    // PropertyModel.findOne({'_id': req.params.id}) OR
    PropertyModel.findOne({_id: req.params.id, waiting: false})
      .then(data => {
        if (data) {
          res.status(200).send(data)
        } else {
          res.status(400).send(data)
        }
      })
      .catch(error => {
        res.send(error)
      })
  })
  // fetch one specific property for admin
  app.get('/api/admin/property/:id', (req, res) => {
    // PropertyModel.findOne({'_id': req.params.id}) OR
    PropertyModel.findOne({_id: req.params.id})
      .then(data => {
        if (data) {
          res.status(200).send(data)
        } else {
          res.status(400).send(data)
        }
      })
      .catch(error => {
        res.send(error)
      })
  })
  app.get('/api/propertyAdd', verifyToken, (req, res) => {
    res.json({ message: 'create property' })
  })
  // post property
  app.post('/api/property/add',verifyToken, (req, res) => {
    // creae new model from PostModel
    const newProperty = new PropertyModel({
      name: req.body.name,
      construction_date: req.body.construction_date,
      surface: req.body.surface,
      price: req.body.price,
      location: req.body.location,
      water: req.body.water,
      electricity: req.body.electricity,
      climatization: req.body.climatization,
      room: req.body.room,
      stair: req.body.stair,
      category: req.body.category,
      sold: false,
      waiting: false
    })
  // create admin add-property route
  
    newProperty.save()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(error => {
        res.status(400).json(error)
      })
    })
}
module.exports = controller
