var User = require('../models/User')

module.exports = function () {
  return function(req, res, next) {
    var user = req.user
    console.log(user)
    if (user) {
      User.findById(user._id, function(err, foundUser) {
        if (foundUser) {
          return next()
        }
      })
    }
    res.redirect('/login')
  }
}
