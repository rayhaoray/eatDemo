var mongoose = require('mongoose');

var tipSchema = new mongoose.Schema({
	id: String,
	name: String,
	email: String,
	like: Boolean,
	score: Number,
	date: String,
	tip: String
},
{
	collection: 'tips'
});

module.exports = mongoose.model('Tip', tipSchema);

