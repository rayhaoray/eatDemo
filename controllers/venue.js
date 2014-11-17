var Venue = require('../models/Venue');
var Tip = require('../models/Tip');

exports.venue = function(req, res) {
	Venue.findOne({name: 'Hotdog'}, function (err, currentVenue){
		console.log(currentVenue);
		res.render('venue', {venue: currentVenue});
	});
};

exports.postVenue = function(req, res){
	Tip.find({name: 'Hotdog'}, function (err, tips){
		var tip = tips[0];
		if(req.body.tip != '')
			tip.tip = req.body.tip;
		if(req.body.like == 'on')
			tip.like = true;
		tip.save(function (err, venue) {
			if(err) return console.log("error");
			req.flash('success', { msg: 'Tip Updated.' });
			res.redirect('/venue');
		});
	});
};
