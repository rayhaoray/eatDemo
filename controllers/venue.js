var Venue = require('../models/Venue');

exports.venue = function(req, res) {
	Venue.findOne({name: 'Hotdog'}, function (err, currentVenue){
		console.log(currentVenue);
		res.render('venue', {venue: currentVenue});
	});
};

exports.postVenue = function(req, res){
	Venue.find({name: 'Hotdog'}, function (err, venues){
		var venue = venues[0];
		if(req.body.tip != '')
			venue.tip.push(req.body.tip);
		if(req.body.like == 'on')
			venue.like++;
		if(req.body.unlike == 'on')
			venue.unlike++;
		venue.save(function (err, venue) {
			if(err) return console.log("error");
			req.flash('success', { msg: 'Venue Updated.' });
			res.redirect('/venue');
		});
	});
};
