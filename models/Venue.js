var mongoose = require('mongoose');

var venueSchema = new mongoose.Schema({
	id: String,
	name: String,
	like: Number,
	score: Number,
	visit: Number,
	address: String,
	telephone: String,
	website: String,
	photo: String,
	category: Array
},
{
	collection: 'venues'
}
);

module.exports = mongoose.model('Venue', venueSchema);

