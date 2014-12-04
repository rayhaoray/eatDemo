var express = require("express")
router = express.Router()
var Venue = require('../models/Venue')

//router
//  .route
//  .get('/all-data', function () {
//    res.render({
//      "4": [720, 1080]
//    })
//  })

exports.levelAllData = function (req, res) {
  res.send({
    //4: [720, 1080]
      Breakfast: { 
              burger: {
                        1: 'nice',
                        2: 'tip',
                        3: 'bad'
                      },
              pop: {
                        4: 'nice',
                        5: 'tip',
                        6: 'bad'
                      }
            },
      Coffee: { 
              Coffee: {
                        7: 'nice',
                      },
              Tea: {
                        9: 'nice',
                      },
              Sandwich: {
                        9: 'nice',
                      }
            },
      Dinner: {
              Fastfood: {
                        9: 'bad'
                      },  
              Burger: {
                        9: 'bad'
                      },
              Pizza: {
                        11: 'bad'
                      },
              Buffet: {
                        11: 'bad'
                      }
            },
      Lunch: { 
              Fastfood: {
                        9: 'bad'
                      },  
              Burger: {
                        9: 'bad'
                      },
              Pizza: {
                        11: 'bad'
                      },
              Buffet: {
                        11: 'bad'
                      }
            }
  })
}

exports.getLevel = function(req, res) {
  Venue.find({}, function (err, venues) {
    res.render('level', {
      title: 'Level',
      venues: venues
    });
  })
};
