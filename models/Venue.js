var mongoose = require('mongoose');

var venueSchema = new mongoose.Schema({
	name: String,
	tip: [],
	like: Number,
	unlike: Number,
	score: Number,
	visit: Number
})

venueSchema.methods.speak = function(){
	var greet = this.name ? 'Venue name: ' + this.name : 'No name'
}
module.exports = mongoose.model('Venue', venueSchema);

