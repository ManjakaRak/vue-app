// modeling mongoose schema
// instance a mongoose Schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  name: {type: String, required: true},
  construction_date: {type: Date, required: true},
  surface: {type: Number, required: true},
  location: {type: String, required: true},
  water: {type: Boolean, required: true},
  electricity: {type: Boolean, required: true},
  climatization: {type: Boolean, required: true},
  room: {type: Number, required: true},
  stair: {type: Number, required: true},
  category: {type: String, required: true}
})

const PostModel = mongoose.model('Post', PostSchema)

// export PostModel
module.exports = PostModel
