//this is a self invoking function, equals document.ready
(function(){

	var days = [];

	function Day(){
		this.hotel = [];
		this.restaurant = [];
		this.activity = []; 
	}

	Day.prototype.remove = function(event_type, id){
		//var day = this;
		
		this[event_type].forEach((function(event, index){
			if (event._id===id) {
				this[event_type].splice(index,1);
			}
		}).bind(this));	
	}

	Day.prototype.toggle = function(){
		var keys = Object.keys(this);

		keys.forEach((function(event_type){
			console.log('EVENTTYPE', event_type);
			for (var i =0; i < this[event_type].length; i++) {

				//console.log('this item', this[event_type][i].dom_ref);
				console.log('$#$#$#',this[event_type][i]);
				if(this[event_type][i]) {
					this[event_type][i].dom_ref.toggleClass('disabled');
				}
			}
				
		}).bind(this));
	}
	days.push(new Day());
	// //set the id for the day class
	$('span#day-title>span').attr('id', '0');

	var currentDayId = parseInt($('span#day-title>span').attr('id'));

	$('.day-buttons>#create-day').on('click', function (){
		var buttonHtml = '<button class="btn btn-circle day-btn">@dayNum@</button>\n';

		$(this).before(buttonHtml.replace('@dayNum@', currentDayId + 2));

		$(this).prev().on('click', function(){
			if(days[currentDayId]!==this) {
				days[currentDayId].toggle();
			}
		});
	});

	$('.day-buttons>.current-day').on('click', function(){
		if(days[currentDayId]!==days[0]) {
			days[currentDayId].toggle();
		};
	});

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
			console.log('!!!!');
			var parent = $(event_handler).parent();
			var id = $($(event_handler).siblings("select")[0]).val();
			var target_div = $('.panel-body.itinerary .my_' + event_type + ' .list-group');	
			var obj = getEventById(events[event_type], id);

			if(event_type !== 'hotel') {
				var duplicate_div = $('.panel-body.itinerary .my_' + event_type + ' .list-group #' + id);
			}		
			var createItem=false;
			// event_type conditions
			switch(event_type) {
				case 'hotel': 
					if($(target_div.children()).length > occurrence) {
						$(target_div.children()[0]).remove();
						locations[0].setMap(null);
						locations = locations.slice(1);
					}
					//addItineraryItem(target_div, obj, image, event_type);
					createItem=true;
					break;
				case 'restaurant': 
					if($(target_div.children()).length < occurrence && duplicate_div.length ===0) {
						//addItineraryItem(target_div, obj, image, event_type);
						createItem=true;
					}
					break;
				case 'activity':
					if(duplicate_div.length ===0) {
						// addItineraryItem(target_div, obj, image, event_type);
						createItem=true;
					}
					break;
				default:
					return;
			}
			if(createItem){
				addItineraryItem(target_div, obj, image, event_type);
				//console.log($('span#day-title>span').attr('id'));
				days[currentDayId][event_type].push(obj);
				//console.log(days);
			}
		});
	};

	//this is the event handler for all the itinerary items
	function addItineraryItem(target, event, image, event_type){
		var itinerary_div = '<div class="itinerary-item" id="@ID@"></div>';
		var itinerary_span = '<span class="title">@NAME@</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>';

		itinerary_div = itinerary_div.replace("@ID@", event._id);
		target.append(itinerary_div);
		event.dom_ref=$('#' + event._id + '.itinerary-item');
		console.log('!!!!!@#@',event);
		$("#@ID@.itinerary-item".replace("@ID@", event._id)).append(itinerary_span.replace("@NAME@", event.name)).on('click', function(){
		//	console.log('click')
		//	
			$(this).off('click');
			$(this).remove();
			//trigger the day removal
			//console.log('BEFORE',days[currentDayId]);
			
			days[currentDayId].remove(event_type, event._id);

			console.log(days[currentDayId]);
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

