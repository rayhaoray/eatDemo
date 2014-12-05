var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId

var tipSchema = new mongoose.Schema({
  id: String,
  venue_id: ObjectId,
  user_id: ObjectId,
  like: Boolean,
  score: Number,
  date: String,
  tip: String
},
{
  collection: 'tips'
});

module.exports = mongoose.model('Tip', tipSchema);

