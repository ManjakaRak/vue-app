// imort
const mongoose = require('mongoose')
//  schema
const Schema = mongoose.Schema

// create a contact schema from schema
const ContactSchema = new Schema({
  name: {type: String, required: true},
  lastName: {type: String, required: true},
  tel: {type: Number, required: true},
  email: { type: String, required: true },
  message: { type: String, required: false },
  property: {type: Object, required: true}
})

// create model from schema
const ContactModel = mongoose.model('Contact', ContactSchema)

module.exports = ContactModel
