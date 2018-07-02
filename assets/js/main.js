(function(){
var url= "http://app.ticketmaster.com/discovery/v2/events.json?city=atlanta&apikey=IVeW1wnw1EgrDASBp2QqlmxszcLjjEKy";

    $.get(url).done(function(response){
      console.log(response);
      success(response);
    });

      function success(response){


for (var i = 0; i < response._embedded.events.length; i++) {

            // var newB = $("<button>");
            var replace = $("<div><button>View Info</div>");
            var newP = $("<p>");
            
            newP.text(response._embedded.events[i].name);
            replace.append(newP);
            // replace.append(newP,newB);



            $("#movies").append(replace);

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


