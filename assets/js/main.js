
//setting search variable for the API call to ticket master 
var search = '';
var url = "";
var rest = {};
//calling the API URL with the input value 
$("#search").on("click", function (event) {
	event.preventDefault();
	
	search = $("#location").val().trim();
	url = "http://app.ticketmaster.com/discovery/v2/events.json?city=" +
		search + "&apikey=IVeW1wnw1EgrDASBp2QqlmxszcLjjEKy";
	$.get(url).then(function (response) {
		success(response);
		$("#events").empty();
		$("#location").empty();
	});
});

async function success(response) {
	//adding the event to the DOM 
	for (var i = 0; i < response._embedded.events.length; i++) {
		var eventName = response._embedded.events[i].name;
		var buyTicket = response._embedded.events[i].url;
		var eventDate = response._embedded.events[i].dates.start.localDate;
		var eventPrice = response._embedded.events[i].priceRanges[0].min;
		var eventImage = response._embedded.events[i].images[0].url;
		var lng = response._embedded.events[i]._embedded.venues[0].location.longitude;
		var lat = response._embedded.events[i]._embedded.venues[0].location.latitude;
		var venue = response._embedded.events[i]._embedded.venues[0].name;
		var eventID = (eventName + eventDate).replace(/\s+/g,"-").toLowerCase().toString();
		eventID = eventID.replace(/[^\w\s]/gi, '');
		// $("#events").append("<div id=" + eventID + ">" + eventName + eventDate + eventPrice + "<img class='size' src=" + eventImage + "></div>");
		$("#events").append("<div id=" + eventID + ">" +"<br>"+"<br>"+"<img class='size' src=" + eventImage + ">"+"<br>"+ eventName +"<br>"+venue +"<br>"+ eventDate +" "+"Ticket prices: $"+" "+eventPrice +"<br>"+"<a class="+"redLink"+" href=" + buyTicket + ">" +"BuyTicket" +"</a>"+ "</div>");
		var queryURL = "https://gt-yelp-api.herokuapp.com/api/" + lat + "/" + lng;
		rest[eventName] = [];
		var res = await $.get(queryURL);
		for (var j = 1; j <= 5; j++) {
			var restaurant = res[j];
			var resName = res[j].name;
			var resURL = res[j].url;
			var number = j;
			var space = "<p>";
		
			var a = "#" + eventID;
			//a.replace(/\s+/g,"-").toLowerCase();
			//console.log(a);
			$(a).append("<a href=" + resURL + ">" + space + number + resName +"</a>");
			// $(a).append("<a href=" + buyTicket + ">" +"BuyTicket" +"</a>");
			
		};
		
	}

}


