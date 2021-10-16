// modeling mongoose schema
// instance a mongoose Schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PropertySchema = new Schema({
  name: { type: String, required: true },
  price: {type: Number, required: true},
  construction_date: {type: Date, required: true},
  surface: {type: Number, required: true},
  location: {type: String, required: true},
  water: {type: Boolean, required: true},
  electricity: {type: Boolean, required: true},
  climatization: {type: Boolean, required: true},
  room: {type: Number, required: true},
  stair: {type: Number, required: true},
  category: { type: String, required: true },
  sold: { type: Boolean, required: true },
  waiting: { type: Boolean, required: true }
})

const PropertyModel = mongoose.model('Property', PropertySchema)

// export PropertyModel
module.exports = PropertyModel
