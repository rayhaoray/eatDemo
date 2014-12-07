var Venue = require('../models/Venue');
var Tip = require('../models/Tip');
var UserLikedVenue = require('../models/UserLikedVenue')
var UserRatedVenue = require('../models/UserRatedVenue')


// For todays date;
Date.prototype.today = function () { 
  return (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+ this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
  return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

exports.show = function(req, res) {
  var venue_id = req.params['venue_id']
  var user_id = req.user._id
  Venue.findById(venue_id, function(err, venue) {
    Tip.find({venue: venue._id}).populate('user').exec(function(err, tips) {
      UserLikedVenue.find({user: user_id, venue: venue_id}, function(err, userLikedVenue) {
        UserLikedVenue.find({venue: venue_id, like: true}, function(err, likes) {
          UserRatedVenue.find({venue: venue_id}, function(err, rates){
            UserRatedVenue.find({venue: venue_id, user: user_id}, function(err, rate) {
              var rateScore = null

              if (rate.length == 0) {
                rateScore = '0'
              } else {
                rateScore = rate[0].rate
              }

              var average = null
              var sum = null
              if (rates.length !== 0) {
                sum = rates.map(function(rate){
                  return rate.rate
                }).reduce(function(previousValue, currentValue, index, array) {
                  return previousValue + currentValue;
                })
              } else {
                sum = 0
              }
              var len = rates.length
              if (len == 0) {
                average = 'N/A'
              } else {
                average = sum/len
              } 

              var like = null;
              if (userLikedVenue.length > 0) {
                like = userLikedVenue[0].like
              } else {
                like = false
              }
              res.render('detail', {
                venue: venue,
                tips: tips,
                like: like,
                likes: likes.length,
                rate: rateScore,
                average: average
              })

            })

          })
        })
      })
    })
  })
}

exports.go = function (req, res) {
  if (req.body.venueId) {
    Venue.findById(req.body.venueId, function(err, venue) {
      if (venue) {
        var allVenues = [];
        allVenues.push(venue);
        Venue.find({category: {"$in" : [venue.category[0]]}}).sort('-like').exec(function (err, currentVenues){
          var i;
          for(i=0; i<3; i++){
            if(currentVenues[i].id != allVenues[0].id){
              allVenues.push(currentVenues[i]);
            }
          }
          res.render('venue', {venue: allVenues})
        })
      } else {
        // error handler
      }
    })
  } else {
    var select1 = req.body.select1
    var select2 = req.body.select2
    var select3 = req.body.select3

    if(select2 == 'Select One')
      select2 = select1

    switch(req.body.select3) {
      case 'Sort by Name':
        Venue.find({category: { "$in" : [select1]} } && { category: { "$in" : [select2]} }).sort('name').exec(function (err, currentVenues){
        res.render('venue', {venue: currentVenues});
      });
      break;
      case 'Sort by Score':
        Venue.find({category: { "$in" : [select1]} } && { category: { "$in" : [select2]} }).sort('-score').exec(function (err, currentVenues){
        res.render('venue', {venue: currentVenues});
      });
      break;
      default:
        Venue.find({category: { "$in" : [select1]} } && { category: { "$in" : [select2]} }).sort('-like').exec(function (err, currentVenues){
        res.render('venue', {venue: currentVenues});
      }); 
    }
  }
}

exports.postTip = function(req, res){
  var venue_id = req.params['venue_id']
  var user_id = req.user._id

  var newTip = new Tip({
    venue: venue_id,
    user: user_id,
    date : new Date().today() + ' ' + new Date().timeNow(),
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

exports.postLike = function(req, res) {
  var venue_id = req.params['venue_id']
  var user_id = req.user._id


  UserLikedVenue.find({user: user_id, venue: venue_id}, function(err, userLikedVenue) {
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
        Venue.findById(venue_id, function (err, currentVenue){
          if(currentVenue)
            currentVenue.like = likes.length
          currentVenue.save(function (err, currentVenue){
            console.log(currentVenue.like)
          })
        })
        res.send({
          likes: likes.length
        })
      })
    })
  })
}

exports.postRating = function(req, res) {
  var venue_id = req.params['venue_id']
  var user_id = req.user._id
  UserRatedVenue.find({user: user_id, venue: venue_id}, function(err, userRatedVenue) {
    if (userRatedVenue.length !== 0) {
      userRatedVenue = userRatedVenue[0]
      //userLikedVenue.like = req.body.like
      userRatedVenue.rate = req.body.rate
    } else {
      userRatedVenue = new UserRatedVenue({
        user: user_id,
        venue: venue_id,
        rate: req.body.rate
      })
    }
    userRatedVenue.save(function (err, userRatedVenue) {
      UserRatedVenue.find({venue: venue_id}, function (err, rates) {
        var average = null

        var sum = null
        if (rates.length !== 0) {
          sum = rates.map(function(rate){
            return rate.rate
          }).reduce(function(previousValue, currentValue, index, array) {
            return previousValue + currentValue;
          })
        } else {
          sum = 0
        }

        var len = rates.length
        if (len == 0) {
          average = 'N/A'
        } else {
          average = sum/len
        }

        Venue.findById(venue_id, function (err, currentVenue){
          if(currentVenue)
            currentVenue.score = average 
          currentVenue.save(function (err, currentVenue){
          })
        }) 

        res.send({
          rate: req.body.rate,
          average: average,
          element: '<div id="rating" data-average="' + req.body.rate + '">'
        })

      })
    })
  })
}
