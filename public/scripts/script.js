//this is a self invoking function, equals document.ready
(function(){

// this is to maintain the data and prevent naming confusion;
var events = {
	hotel: hotel,
	restaurant: restaurant,
	activity: activity
}

//this is the main event handler for all the events
function addEventItem(event_type, image, occurrence){

	// helper function to find the exact event_type
	function getEventById(obj, id) {
		for (var i = 0; i < obj.length; i++) {
			if(obj[i]._id===id) {
				return obj[i];
			}
		}
	}

	// dom elements to manipulate
	var event_handler = $('.' + event_type + '-selector' + '>.btn.btn-primary.btn-circle.pull-right');
	event_handler.on('click', function(){
		var parent = $(event_handler).parent();
		var id = $($(event_handler).siblings("select")[0]).val();
		var target_div = $('.panel-body.itinerary .my_' + event_type + ' .list-group');	
		var obj = getEventById(events[event_type], id);

		if(event_type !== 'hotel') {
			var duplicate_div = $('.panel-body.itinerary .my_' + event_type + ' .list-group #' + id);
		}		
		// event_type conditions
		switch(event_type) {
			case 'hotel': 
				if($(target_div.children()).length > occurrence) {
					$(target_div.children()[0]).remove();
					locations[0].setMap(null);
					locations = locations.slice(1);
				}
				addItineraryItem(target_div, obj, image);
				break;
			case 'restaurant': 
				if($(target_div.children()).length < occurrence && duplicate_div.length ===0) {
					addItineraryItem(target_div, obj, image);
				}
				break;
			case 'activity':
				if(duplicate_div.length ===0) {
					addItineraryItem(target_div, obj, image);
				}
				break;
		}
	});
};

//this is the event handler for all the itinerary items
function addItineraryItem(target, event, image){
	var itinerary_div = '<div class="itinerary-item" id="@ID@"></div>';
	var itinerary_span = '<span class="title">@NAME@</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>';

	target.append(itinerary_div.replace("@ID@", event._id));
	$("#@ID@.itinerary-item".replace("@ID@", event._id)).append(itinerary_span.replace("@NAME@", event.name)).on('click', function(){
		$(this).remove();
		locations[0].setMap(null);
		locations = locations.slice(1);
	});

	drawLocation(event.place[0].location, {icon: "/images/" + image});
};

//registering the 3 events
addEventItem('hotel','lodging_0star.png', 0);
addEventItem('restaurant','restaurant.png', 3);
addEventItem('activity','star-3.png');

}());

