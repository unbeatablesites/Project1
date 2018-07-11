
//setting search variable for the API call to ticket master 
var search = '';
var url = "";
var rest = {};
//calling the API URL with the input value 
$("#search").on("click", function (event) {
	event.preventDefault();
	search = $("#location").val().trim();
	if (search === "") {
		
		$("#location").val("");
		$("#section-label").html("<h1>I don't understand</h1>")
		$("#events-label").html("<h1>Please enter a valid city</h1>")
		
	}
	else {
		url = "https://app.ticketmaster.com/discovery/v2/events.json?city=" +
			search + "&apikey=IVeW1wnw1EgrDASBp2QqlmxszcLjjEKy";
		$.get(url).then(function (response) {
			success(response);
		
		});
	}
});
async function success(response) {
	//validate user input
	if (($.isNumeric(search)) && (search.length >= 5)) {
		window.stop();
		$("#events").empty();
		$("#location").val("");
		$("#section-label").html("<h1>I don't understand</h1>")
		$("#events-label").html("<h2></h2>")
		$("#events").append("<h1>Five Star Moments does not accept zip codes at this time</h1>")
	}
	else if (response._embedded === undefined) {
		window.stop();
		$("#events").empty();
		$("#location").val("");
		$("#section-label").html("<h1>I don't understand</h1>")
		$("#events-label").html("<h2></h2>")
		$("#events").append("<h1>Please enter a valid city</h1>");
	}
	else {
		window.stop();
		$("#events").empty();
		$("#location").val("");
		$("#section-label").html("<h1>Upcoming events in</h1>")
		$("#events-label").html("<h2> " + search + "</h2>");
		//adding the event to the DOM 
		for (var i = 0; i < response._embedded.events.length; i++) {
			var eventName = response._embedded.events[i].name;
			var buyTicket = response._embedded.events[i].url;
			var eventDate = response._embedded.events[i].dates.start.localDate;
			if (response._embedded.events[i].priceRanges === undefined){
				var eventPrice = "Tickets sold by third party";
			}
			else {
				var eventPrice = "Tickets starting at: $ " + response._embedded.events[i].priceRanges[0].min;
			}
			var eventImage = response._embedded.events[i].images[0].url;
			var lng = response._embedded.events[i]._embedded.venues[0].location.longitude;
			var lat = response._embedded.events[i]._embedded.venues[0].location.latitude;
			var venue = response._embedded.events[i]._embedded.venues[0].name;
			var eventID = (eventName + eventDate + [i]).replace(/\s+/g,"-").toLowerCase().toString();
			eventID = eventID.replace(/[^\w\s]/gi, '');
			$("#events").append("<div class='row mx-auto'><div class='col-lg-6 col-sm-12'><img class='size' src=" + eventImage + "></div><div class='col-lg-6 col-sm-12' id=" + eventID + ">"+ "<h1>" + eventName + "</h1>" + "<br>" + venue +"<br>"+ eventDate + " " + eventPrice +"<br>"+"<a class="+"redLink"+" href=" + buyTicket + ">" +"BuyTicket" +"</a>"+ "<h1>Restaurants Nearby</h1>" + "</div></div>");
			
			var queryURL = "https://gt-yelp-api.herokuapp.com/api/" + lat + "/" + lng;
			rest[eventName] = [];
			var res = await $.get(queryURL);
			for (var j = 1; j <= 5; j++) {
				var restaurant = res[j];
				var resName = res[j].name;
				var resURL = res[j].url;
				var space = "<p>";
				var a = "#" + eventID;
				a.replace(/\s+/g,"-").toLowerCase()  
				$(a).append("<p><a href=" + resURL + ">" + resName +"</a></p>");     
			};
		}

	}

}	

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAzCJ1xHFQKflQB7B88p2-kStszJX3WJ8o",
    authDomain: "five-star-moments.firebaseapp.com",
    databaseURL: "https://five-star-moments.firebaseio.com",
    projectId: "five-star-moments",
    storageBucket: "five-star-moments.appspot.com",
    messagingSenderId: "602816166347"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$("#submit-button").on("click", function(event) {
	event.preventDefault();
	var contactName = $("#name").val().trim();
	var contactEmail = $("#email").val().trim();
	var contactMessage = $("#message").val().trim();


	  var newContact = {
		  name: contactName,
		  email: contactEmail,
		  message: contactMessage
	  };
	  database.ref().push(newContact);
	  $("#name").val("");
	  $("#email").val("");
	  $("#message").val("");
	
});

  