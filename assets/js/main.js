

  //setting search variable for the API call to ticket master 
  var search = '';
  var url= "";
  var rest = [];
  //calling the API URL with the input value 
  $("#search").on("click", function(event) {
    event.preventDefault();
    search = $("#location").val().trim();
    url= "http://app.ticketmaster.com/discovery/v2/events.json?city=" +
   search + "&apikey=IVeW1wnw1EgrDASBp2QqlmxszcLjjEKy";
    $.get(url).then(function(response){
	  success(response);
    });
  });

      function success(response){
	//adding the event to the DOM 
		for (var i = 0; i < response._embedded.events.length; i++) {
			var eventName = response._embedded.events[i].name;
			var eventDate = response._embedded.events[i].dates.start.dateTime;
			var eventPrice = response._embedded.events[i].priceRanges[0].min;
			var eventImage = response._embedded.events[i].images[0].url;
			var lng = response._embedded.events[i]._embedded.venues[0].location.longitude;
			var lat = response._embedded.events[i]._embedded.venues[0].location.latitude;
			$("#events").append("<div data-value='" + i + ">" +  eventName + eventDate + eventPrice + "<img class='size' src=" + eventImage + "></div>");
			var queryURL = "https://gt-yelp-api.herokuapp.com/api/" + lat + "/" + lng;
			var a = $("#events").data('value')
			console.log(a)
				$.get(queryURL).then(function (res){
					for (var j = 1; j < 5; j ++) {	
					var resName = res[j].name;
					// rest.push(resName);
					console.log(eventName)
					// var dataVal = $(this).attr("data-value")
					// console.log(dataVal)
					while (eventName == ("data-value").val()) {
						("<p>" + resName + "</p>")
					}
					};
				});

			
	  }
	}

