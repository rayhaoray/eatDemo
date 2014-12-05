var Venue = require('../models/Venue');
var Tip = require('../models/Tip');
var UserLikedVenue = require('../models/UserLikedVenue')


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
  var user_id = req.user._id
  Venue.findById(venue_id, function(err, venue) {
    Tip.find({venue: venue._id}).populate('user').exec(function(err, tips) {
      UserLikedVenue.find({user: user_id, venue: venue_id}, function(err, userLikedVenue) {
        var like = null;
        if (userLikedVenue) {
          like = userLikedVenue.like ? 'checked' : ''
        } else {
          like = ''
        }
        res.render('detail', {
          venue: venue,
          tips: tips,
          //userLikedVenue: userLikedVenue
          like: like
        })
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
  console.log(req.body)
  //var userLikedVenue = new UserLikedVenue({
  //  user: user_id,
  //  venue: venue_id,
  //  like: req.body.like == 'on'
  //})

  var newTip = new Tip({
    venue: venue_id,
    user: user_id,
    date : new Date().today() + " @ " + new Date().timeNow(),
    content : req.body.tip
  });

  newTip.save(function (err, tip) {
    if(err) return console.log("error");
    req.flash('success', { msg: 'Tip Added.' });
    Venue.findById(venue_id, function(err, venue) {
      res.redirect('/venue/' + venue_id)
    })
  });

  //userLikedVenue.save(function (err, userLikedVenue) {
  //  if(err) return console.log("error");
  //})
}

exports.postLike = function(req, res) {
  var venue_id = req.params['venue_id']
  var user_id = req.user._id

  console.log('like?', req.body.like)

  UserLikedVenue.find({user: user_id, venue: venue_id}, function(err, userLikedVenue) {
    console.log(userLikedVenue)
    if (userLikedVenue.length !== 0) {
      userLikedVenue = userLikedVenue[0]
      userLikedVenue.like = req.body.like
    } else {
      userLikedVenue = new UserLikedVenue({
        user: user_id,
        venue: venue_id,
        like: req.body.like
      })
    }
    userLikedVenue.save(function (err, userLikedVenue) {
      UserLikedVenue.find({venue: venue_id, like: true}, function(err, likes) {
        console.log('likes', likes)
        res.send({
          likes: likes.length
        })
      })
    })
  })
}
