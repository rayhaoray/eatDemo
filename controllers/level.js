var express = require("express")
router = express.Router()

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
      fast: { 
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
      slow: { 
              burger1: {
                        7: 'nice',
                        8: 'tip',
                        9: 'bad'
                      },
              pop1: {
                        9: 'nice',
                        10: 'tip',
                        11: 'bad'
                      }
            }
  })
}

exports.level = function(req, res) {
  res.render('level', {
    title: 'Level'
  });
};
