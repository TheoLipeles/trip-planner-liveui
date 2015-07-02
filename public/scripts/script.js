
var $addHotelBtn = $(".hotel-selector .btn");

$addHotelBtn.on("click", function() {
//	$addHotelBtn.css("background", "#000");
	// $(this).css("background", "#000");

	// console.log("done");

	console.log(JSON.stringify($(".hotel-selector select").val()));

});