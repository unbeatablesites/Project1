

(function(load){
  var search = prompt("Type the name of a city ");
  var url= "http://app.ticketmaster.com/discovery/v2/events.json?city="+search+"&apikey=IVeW1wnw1EgrDASBp2QqlmxszcLjjEKy";

    $.get(url).done(function(response){
      console.log(response);
      success(response);
    });

      function success(response){


for (var i = 0; i < response._embedded.events.length; i++) {

            // var newB = $("<button>");
            var replace = $("<img class='size'>");
            var div = $("<div><button>View Info</div>");
            var newP = $("<p>");
            // var newpic = $("<img/>");
          
            
            newP.html(response._embedded.events[i].name +" - "+ response._embedded.events[i].dates.start.dateTime+" -  Tix start at: $"+response._embedded.events[i].priceRanges[0].min);
            replace.attr("src", response._embedded.events[i].images[0].url);
            replace.append(newP);
            div.append(newP);

            // console.log(response._embedded.events[i].images[6].url)
            // replace.append(newP,newB);



            $("#movies").append(replace,div);

        }

        // var output = document.getElementById('movies');


        // output.innerHTML = response._embedded.events[0].name;
        // output.innerHTML = response._embedded.events[1].name;



        // // for (var i = 0; i < 20; i++ ){

        //   var array = response._embedded.events.name
        //   // console.log(response._embedded.events.name);
        //   movies.innerHTML = response._embedded.events.name;

        //   var array = document.getElementById('movies');

        // };
        
         // var movie = $(response._embedded.events[0].name);

         // $("#movies").append("<div>"+ movie +"<div/>");

       //    var $showEvents = $('movies');

       // $('showEvents').append("<p>" + movie + "</p>");

      }
})();

