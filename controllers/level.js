var express = require("express")
router = express.Router()
var Venue = require('../models/Venue')

exports.levelAllData = function (req, res) {
  res.send({
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
              American: {
                        1: ''
                      }
              Asian: {
                        2: ''
                      }
              Buffet: {
                        3: ''
                      }
              Burger: {
                        4: ''
                      },
              Fastfood: {
                        5: ''
                      },
              Italian: {
                        6: ''
                      }
              Pizza: {
                        7: ''
                      },
              Salad: {
                        8: ''
                      }
            },
      Lunch: {
              American: {
                        1: ''
                      }
              Asian: {
                        2: ''
                      }
              Buffet: {
                        3: ''
                      }
              Burger: {
                        4: ''
                      },
              Fastfood: {
                        5: ''
                      },
              Italian: {
                        6: ''
                      }
              Pizza: {
                        7: ''
                      },
              Salad: {
                        8: ''
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
