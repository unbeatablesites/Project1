

(function(load){
  //setting search variable for the API call to ticket master 
  var search = '';
  var url= "";

  //calling the API URL with the input value 
  $("#search").on("click", function(event) {
    event.preventDefault();
    search = $("#location").val().trim();
    url= "http://app.ticketmaster.com/discovery/v2/events.json?city=" +
   search + "&apikey=IVeW1wnw1EgrDASBp2QqlmxszcLjjEKy";
    $.get(url).done(function(response){
      success(response);
    });
  });
      function success(response){
//adding the event to the DOM 
for (var i = 0; i < response._embedded.events.length; i++) {
            var replace = $("<img class='size'>");
            var div = $("<div><button>View Info</div>");
            var newP = $("<p>");
            newP.html(response._embedded.events[i].name +" - "+ response._embedded.events[i].dates.start.dateTime+" -  Tix start at: $"+response._embedded.events[i].priceRanges[0].min);
            replace.attr("src", response._embedded.events[i].images[0].url);
            replace.append(newP);
            div.append(newP);
			$("#events").append(replace,div);

			//yelp api call
			console.log(response);
			console.log(response._embedded.events[i]._embedded.venues[0].location.latitude);

			//store coordinates from ticketmaster
			var lng = response._embedded.events[i]._embedded.venues[0].location.longitude;
			var lat = response._embedded.events[i]._embedded.venues[0].location.longitude;

			var queryURL = "https://gt-yelp-api.herokuapp.com/api/" + lat + "/" + lng;
			$.get(queryURL).done(function(response){
				success(response);
				console.log(response);
			})

        }

  // Initialize Firebase - commenting out but not removing in case we need this later 
  // var config = {
  //   apiKey: "AIzaSyC14RU7IXMdMvaROiAcm8xCUBFWfjjVtcc",
  //   authDomain: "moment-f308e.firebaseapp.com",
  //   databaseURL: "https://moment-f308e.firebaseio.com",
  //   projectId: "moment-f308e",
  //   storageBucket: "moment-f308e.appspot.com",
  //   messagingSenderId: "164636985947"
  // };
  // firebase.initializeApp(config);


      }
})();

