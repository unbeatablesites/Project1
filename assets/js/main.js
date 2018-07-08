$(document).ready(function () {

  //setting search variable for the API call to ticket master 
  var search = '';
  var url = "";
  //init calendar
  $("#my-calendar").zabuto_calendar({
    language: "en",
    year: 2018,
    month: 7,
    show_previous: false,
    show_next: 36,
    cell_border: true,
    today: true,
    show_days: true,
    weekstartson: 0,
    data: [{
      date: '2018-07-07',
      title: 'Frank is a ...',
      badge: 'false'
    }],
    action: function () {
      // get the selected date
      var date = $('#' + this.id).data('date');
    },
    nav_icon: {
      prev: '<i class="fa fa-chevron-circle-left"></i>',
      next: '<i class="fa fa-chevron-circle-right"></i>'
    }
  });


  //calling the API URL with the input value 
  $("#search").on("click", function (event) {
    event.preventDefault();
    search = $("#location").val().trim();
    url = "http://app.ticketmaster.com/discovery/v2/events.json?city=" +
      search + "&apikey=IVeW1wnw1EgrDASBp2QqlmxszcLjjEKy";
    $.get(url).done(function (response) {
      success(response);
    });
  });
  function success(response) {
    debugger;
    var dataArray = [];
    //adding the event to the DOM 
    for (var i = 0; i < response._embedded.events.length; i++) {

      //for each event in this loop, we want to do 2 things:
      //1. build a data object that looks like this:
      // {
      //   date: '2018-07-07',
      //   title: 'Frank is a ...',
      //   badge: 'false'
      // }
      //2. push that object to the "dataArray" array defined on line 45.


      var replace = $("<img class='size'>");
      var div = $("<div><button>View Info</div>");
      var newP = $("<p>");
      newP.html(response._embedded.events[i].name + " - " + response._embedded.events[i].dates.start.dateTime + " -  Tix start at: $" + response._embedded.events[i].priceRanges[0].min);
      replace.attr("src", response._embedded.events[i].images[0].url);
      replace.append(newP);
      div.append(newP);
      $("#events").prepend(replace, div);

      //yelp api call
      //console.log(response);
      console.log(response._embedded.events[i]._embedded.venues[0].location.latitude);

      //store coordinates from ticketmaster
      var lng = response._embedded.events[i]._embedded.venues[0].location.longitude;
      var lat = response._embedded.events[i]._embedded.venues[0].location.latitude;

      var queryURL = "https://gt-yelp-api.herokuapp.com/api/" + lat + "/" + lng;
      $.get(queryURL).then(function (response) {
        //success(response);
        console.log(response);
      })
    }
    //once the loop is over, we want to re-initialize the calendar, but with our new data array in the "data" property
    $("#my-calendar").zabuto_calendar({
      language: "en",
      year: 2018,
      month: 7,
      show_previous: false,
      show_next: 36,
      cell_border: true,
      today: true,
      show_days: true,
      weekstartson: 0,
      data: dataArray, //this is the array of calendar objects we built from the response
      action: function () {
        // get the selected date
        var date = $('#' + this.id).data('date');
      },
      nav_icon: {
        prev: '<i class="fa fa-chevron-circle-left"></i>',
        next: '<i class="fa fa-chevron-circle-right"></i>'
      }
    });
  
    function addPlaces() {
      $("#events").append(replace, div);
    }

    $("#Selcity").html("POPULAR UP COMING EVENTS" + " " + "in" + " " + search);
    $("#Selfood").html("POPULAR PLACES TO EAT" + " " + "in" + " " + search);
    $("#pPic").html(replace);

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


});
