
// var $addHotelBtn = $(".hotel-selector .btn");
// var $myHotel = $(".panel-body .my_hotel .list-group");

var itinerary_div = '<div class="itinerary-item" id="@ID@"></div>';
var itinerary_span = '<span class="title">@NAME@</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>';


// $addHotelBtn.on("click", function() {
// //	$addHotelBtn.css("background", "#000");
// 	// $(this).css("background", "#000");


// 	var hotel_id = $(".hotel-selector select").val();

// 	$.each(all_hotels, function(i) {
// 		var hotel = all_hotels[i];
// 		if (hotel._id === hotel_id) {
// 			if ($myHotel.children().length > 0) {
				//$($($myHotel.children()[0]).attr("id", hotel_id).children()[0]).html(hotel.name);
// 			} else {
// 				$myHotel.append(itinerary_div.replace("@HOTEL_ID@", hotel_id));
// 				$("#@HOTEL_ID@.itinerary-item".replace("@HOTEL_ID@", hotel_id)).append(itinerary_span.replace("@HOTEL_NAME@", hotel.name));
// 			}
// 		}
// 	});

// });

function getObjectById(obj,id) {
	for (var i = 0; i < obj.length; i++) {
		if(obj[i]._id===id) {
			return obj[i];
		}
	}
}

function addItem(target, id, name, obj, image){
		target.append(itinerary_div.replace("@ID@", id));
		$("#@ID@.itinerary-item".replace("@ID@", id)).append(itinerary_span.replace("@NAME@", name));
		drawLocation(obj.place[0].location, {icon: "/images/" + image});
}


$(".btn.btn-primary.btn-circle.pull-right").on("click", function() {
	var parent = $(this).parent();
	var id = $($(this).siblings("select")[0]).val();
	var target;
	var name;
	var new_s;
	var obj;
	if(parent.hasClass('hotel-selector')){
		target = $('.panel-body.itinerary .my_hotel .list-group');
		obj = getObjectById(all_hotels, id);
		name = obj.name;
		if($(target.children()).length > 0) {
			$($(target.children()[0]).attr("id", id).children()[0]).html(name);
		} else {
			addItem(target, id, name, obj, "lodging_0star.png");
		}
	} else if(parent.hasClass('restaurant-selector')){
		target = $('.panel-body.itinerary .my_restaurants .list-group');
		new_s = $('.panel-body.itinerary .my_restaurants .list-group #' + id);
		if($(target.children()).length <3 && new_s.length ===0) {
			obj = getObjectById(all_restaurants, id);
			name =obj.name;
			addItem(target, id, name, obj, "restaurant.png");
		}
	} else if(parent.hasClass('thing-selector')){
		target = $('.panel-body.itinerary .my_things .list-group');
		new_s = $('.panel-body.itinerary .my_things .list-group #' + id);
		if(new_s.length ===0) {
			obj = getObjectById(all_things_to_do, id);
			name = obj.name;
			addItem(target, id, name, obj, "star-3.png");
		}
	}
	$(".btn.remove").on("click", function() {
		var parent = $(this).parent();
		parent.remove();
		console.log(locations, locations[0]);
		locations[0].setMap(null);
		locations = locations.slice(1);
	});
});



	    // drawLocation(hotelLocation, {
		    //     icon: '/images/lodging_0star.png'
		    // });
		    // restaurantLocations.forEach(function (loc) {
		    //     drawLocation(loc, {
		    //         icon: '/images/restaurant.png'
		    //     });
		    // });
		    // thingToDoLocations.forEach(function (loc) {
		    //     drawLocation(loc, {
		    //         icon: '/images/star-3.png'
		    //     });
		    // });







