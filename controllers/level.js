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
