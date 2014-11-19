var Venue = require('../models/Venue');
var Tip = require('../models/Tip');
var User = require('../models/User')

exports.getHistory = function(req, res) {
	Tip.find({email: 'zhenhao@gmail.com'}, function (err, allTips){
		console.log(allTips);
		res.render('history', {tips: allTips});
	});
};
