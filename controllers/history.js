var Venue = require('../models/Venue');
var Tip = require('../models/Tip');
var User = require('../models/User')

exports.getHistory = function(req, res) {
	Tip.find({email: 'zhenhao@gmail.com'}, function (err, allTips){
		console.log(allTips);
		res.render('history', {tips: allTips});
	});
};

exports.postDeleteTip = function(req, res, next) {
	//TODO get tip _id
	console.log(req.body);
  Tip.remove({ _id: req.body.tip._id }, function(err) {
    if (err) return next(err);
    req.flash('info', { msg: 'Tip has been deleted.' });
  });
};
