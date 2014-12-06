var User = require('../models/User')

module.exports = function () {
  return function(req, res, next) {
    var user = req.user
    if (user) {
      User.findById(user._id, function(err, foundUser) {
        if (foundUser) {
          return next()
        } else {
        }
      })
    } else {
      var url = req.originalUrl
      req.session.returnTo = url
      res.redirect('/login')
    }
  }
}
