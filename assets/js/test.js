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
    data: dataArray,
    action: function () {
      // get the selected date
      var date = $('#' + this.id).data('date');
    },
    nav_icon: {
      prev: '<i class="fa fa-chevron-circle-left"></i>',
      next: '<i class="fa fa-chevron-circle-right"></i>'
    }
  });

  var dataArray = [];

  // add events to the calendar
  $.each(response._embedded.events[i], function(){
    $("#my-calendar").data({
      date: response._embedded.events[i].dates.start.dateTime,
      title:response._embedded.events[i].name,
      badge: false
    })
  })
  // push the data
  dataArray.push();




  // HTML <div id="my-calendar"></div>