var Venue = require('../models/Venue');

exports.venue = function(req, res) {
	Venue.find({name: 'Hotdog'}, function (err, docs){
		res.render('venue', {venues: docs});
	});
};

exports.queryVenues = function(req, res){
	var venue = new Venue({
		name: "Hotdog",
		tip: "Nice"
	});
	venue.save(function (err, venue){
		if(err) return console.error(err);
		venue.speak();
	});
	Venue.find(function (err, venues){
		if(err) return console.error(err);
		console.log(venues);
	});
};
