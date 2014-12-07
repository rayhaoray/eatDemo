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
              Coffee: {
                        1: '',
                      },
              Tea: {
                        2: '',
                      },
              Sandwich: {
                        3: '',
              }
            },
      Coffee: { 
              Coffee: {
                        1: '',
                      },
              Tea: {
                        2: '',
                      },
              Sandwich: {
                        3: '',
                      }
            },
      Dinner: {
              Fastfood: {
                        1: ''
                      },  
              Burger: {
                        2: ''
                      },
              Pizza: {
                        3: ''
                      },
              Buffet: {
                        4: ''
                      }
            },
      Lunch: { 
              Fastfood: {
                        1: ''
                      },  
              Burger: {
                        2: ''
                      },
              Pizza: {
                        3: ''
                      },
              Buffet: {
                        4: ''
                      }
            }
  })
}

exports.getLevel = function(req, res) {
  Venue.find({}).sort('name').exec(function (err, venues) {
    res.render('level', {
      title: 'Level',
      venues: venues
    });
  })
};
