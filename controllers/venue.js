var Venue = require('../models/Venue');

exports.venue = function(req, res) {
	Venue.find({name: 'Hotdog'}, function (err, docs){
		res.render('venue', {venues: docs});
	});
};

exports.postVenue = function(req, res){
	Venue.find({name: 'Hotdog'}, function (err, venues){
		var venue = venues[0];
		venue.tip = req.body.tip;
		console.log(venue.tip)	;
		venue.save(function (err, venue) {
			if(err) return console.log("error");
			req.flash('success', { msg: 'Venue Added.' });
			res.redirect('/venue');
		});
	});
};
