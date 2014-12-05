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

exports.show = function(req, res) {
  var venue_id = req.params['venue_id']
  Venue.findById(venue_id, function(err, venue) {
    Tip.find({venue: venue._id}).populate('user').exec(function(err, tips) {
      console.log(tips)
      res.render('detail', {
        venue: venue,
        tips: tips
      })
    })
  })
}

exports.go = function (req, res) {
  if (req.body.venueId) {
    Venue.findById(req.body.venueId, function(err, venue) {
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
      res.render('venue', {venue: currentVenues});
    });
  }
}

exports.postTip = function(req, res){
  var venue_id = req.params['venue_id']
  var user_id = req.user._id
  //if(req.body.email === 'undefined') {
  //  currentEmail = "Anonymous";
  //} else {
  //  currentEmail = req.body.email;	
  //}
  var newTip = new Tip({
    venue: venue_id,
    user: user_id,
    date : new Date().today() + " @ " + new Date().timeNow(),
    like : req.body.like == 'on',
    content : req.body.tip
  });
  newTip.save(function (err, tip) {
    if(err) return console.log("error");
    req.flash('success', { msg: 'Tip Added.' });
    Venue.findById(venue_id, function(err, venue) {
      res.redirect('/venue/' + venue_id)
    })
  });
}
