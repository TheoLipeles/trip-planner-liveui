var router = require('express').Router();

var models = require('../models');
var bluebird = require('bluebird');

router.get('/', function(req, res, next){
	var hotelPromise = models.Hotel.find({}).exec();
	var restaurantPromise = models.Restaurant.find({}).exec()
	var thingsToDoPromise = models.ThingToDo.find({}).exec();
	bluebird.join(hotelPromise, restaurantPromise, thingsToDoPromise)
	.spread(function(a,b,c){
		res.status(200).render('index', {
			event_type:{
				hotel: a,
				restaurant: b,
				activity: c
			}
	});
	},function(err){
		next();
	});
})

module.exports = router;