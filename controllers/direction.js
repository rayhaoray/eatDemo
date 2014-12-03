var Venue = require('../models/Venue')

exports.getDirection = function(req, res) {
  var venue_id = req.params['venue_id']
  Venue.findById(venue_id, function(err, venue) {
    res.render('direction', {
      title: 'Direction',
      address: venue.address
    });
  })
};
