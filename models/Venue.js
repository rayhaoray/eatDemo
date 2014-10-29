var mongoose = require('mongoose');

var venueSchema = new mongoose.Schema({
	name: String,
	tip: String
});

venueSchema.methods.speak = function(){
	var greet = this.name ? 'Venue name: ' + this.name : 'No name'
};

module.exports = mongoose.model('Venue', venueSchema);

