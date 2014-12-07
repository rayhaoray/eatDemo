var mongoose = require('mongoose');

var venueSchema = new mongoose.Schema({
  id: String,
  name: String,
  like: Number,
  score: Number,
  visit: Number,
  building: String,
  address: String,
  telephone: String,
  website: String,
  openhour: Object,
  opennow: String, 
  photo: String,
  map: String,
  category: Array
},
{
  collection: 'venues'
}
                                     );
module.exports = mongoose.model('Venue', venueSchema);
