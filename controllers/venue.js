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

exports.getVenue = function(req, res) {
	Venue.findOne({name: 'Hotdog'}, function (err, currentVenue){
		console.log(currentVenue);
		res.render('venue', {venue: currentVenue});
	});
};



exports.go = function (req, res) {
  console.log(req.body)
  if (req.body.venueId) {
    Venue.findById(req.body.venueId, function(err, venue) {
      console.log(28, venue)
      if (venue) {
        res.render('venue', {venue: [venue]})
      } else {
        // error handler
      }
    })
  } else {
    var select1 = req.body.select1
    var select2 = req.body.select2
    var select3 = req.body.select3
    Venue.find({ category: { "$in" : [select1]} }).sort({like: 'desc'}).exec(function (err, currentVenues){
    	console.log(currentVenues);
    	res.render('venue', {venue: currentVenues});
    });
  }
}
