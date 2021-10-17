// import model(s)
const PropertyModel = require('../models/Property')

/**
 * @param app: express()
 */
const controller = app => {
  // get all properties
  app.get('/api/properties', (req, res) => {
    PropertyModel.find({})
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.send(err)
      })
  })
  // fetch one specific property
  app.get('/api/property/:id', (req, res) => {
    // PropertyModel.findOne({'_id': req.params.id}) OR
    PropertyModel.findById(req.params.id)
      .then(data => {
        res.send(data)
      })
      .catch(error => {
        res.send(error)
      })
  })
  // post property
  app.post('/api/property/add', (req, res) => {
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
