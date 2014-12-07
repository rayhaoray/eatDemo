module.exports = function () {
  return function(req, res, next) {
    console.log("req" + req.head)
    console.log(res.statusCode)
    if(res.statusCode < 400){
      return next()
    }
    else {
      res.redirect('/login')
    }
  }
}
