var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId

var userRatedVenueSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  venue: {
    type: ObjectId,
    ref: 'Venue'
  },
  rate: Number
}, {
  collection: 'userratedvenues'
})

module.exports = mongoose.model('UserRatedVenue', userRatedVenueSchema)
