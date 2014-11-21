var Venue = require('../models/Venue');
var Tip = require('../models/Tip');


// For todays date;
Date.prototype.today = function () { 
    return (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+ this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

exports.venue = function(req, res) {
	Venue.findOne({name: 'Hotdog'}, function (err, currentVenue){
		console.log(currentVenue);
		res.render('venue', {venue: currentVenue});
	});
};

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
			res.redirect('/venue');
		});
	});
};

exports.postTip = function(req, res){
	var newTip = new Tip({
		name : 'Hotdog',
		email : req.body.email,
		date : new Date().today() + " @ " + new Date().timeNow(),
		like : req.body.like == 'on',
		tip : req.body.tip
	});
	console.log("email" + req.body.email);
	console.log("tip" + newTip);
	newTip.save(function (err, venue) {
		if(err) return console.log("error");
		req.flash('success', { msg: 'Tip Added.' });
		res.redirect('/venue');
	});
}

exports.go = function (req, res) {
  console.log(req.body)
  var select1 = req.body.select1
  var select2 = req.body.select2
  var select3 = req.body.select3
  Venue.find({ category: { "$in" : [select1]} }).sort({like: 'desc'}).exec(function (err, currentVenues){
  	console.log(currentVenues);
  	res.render('venue', {venue: currentVenues});
  });
}
