const mongoose = require('mongoose')
const Schema = mongoose.Schema

const favoriteSchema = new Schema({
  Title:{ type: String,  default:"" },
  Year:{ type: String,  default:"" },
  Type: { type: String,  default:"" },
  Poster:{ type: String,  default:"" },
});

module.exports = mongoose.model('Favorite', favoriteSchema);