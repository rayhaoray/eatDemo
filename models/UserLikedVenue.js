var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId

var userLikedVenueSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  venue: {
    type: ObjectId,
    ref: 'Venue'
  },
  like: Boolean
}, {
  collection: 'userlikedvenues'
})

module.exports = mongoose.model('UserLikedVenue', userLikedVenueSchema)
