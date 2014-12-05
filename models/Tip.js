var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId

var tipSchema = new mongoose.Schema({
  id: String,
  //venue_id: ObjectId,
  //user_id: ObjectId,
  venue: {
    type: ObjectId,
    ref: 'Venue'
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  like: Boolean,
  score: Number,
  date: String,
  content: String
},
{
  collection: 'tips'
});

module.exports = mongoose.model('Tip', tipSchema);

