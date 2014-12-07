var Venue = require('../models/Venue');
var Tip = require('../models/Tip');

exports.updateTip = function(req, res){
	Tip.find({name: 'Hotdog'}, function (err, tips){
		var tip = tips[0];
		if(req.body.tip != '')
			tip.tip = req.body.tip;
		if(req.body.like == 'on')
			tip.like = true;
		tip.save(function (err, venue) {
			if(err) return console.log("error");
			req.flash('success', { msg: 'Tip Updated.' });
			res.redirect('/detail');
		});
	});
};

exports.postTip = function(req, res){
	//var currentEmail;
	//TODO check not working
	if(req.body.email === 'undefined')
		currentEmail = "Anonymous";
	else
		currentEmail = req.body.email;	
	var newTip = new Tip({
		name : 'Hotdog',
		email : currentEmail,
		date : new Date().today() + " @ " + new Date().timeNow(),
		like : req.body.like == 'on',
		tip : req.body.tip
	});
	console.log("email: " + currentEmail);
	console.log("tip: " + newTip);
	newTip.save(function (err, venue) {
		if(err) return console.log("error");
		req.flash('success', { msg: 'Tip Added.' });
		res.redirect('/detail');
	});
}
