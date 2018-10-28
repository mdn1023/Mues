$('#venueName').on('input',function(e){
  var venueName = document.getElementById("venueName");

  // Init a timeout variable to be used below
  var timeout = null;

  // Listen for keystroke events
  venueName.onkeyup = function (e) {

      // Clear the timeout if it has already been set.
      // This will prevent the previous task from executing
      // if it has been less than <MILLISECONDS>
      clearTimeout(timeout);

      // Make a new timeout set to go off in 800ms
      timeout = setTimeout(function () { 
        $("#venueName").attr("class", "form-control is-valid");
      }, 500);
  };

});

$('#startDate').on('input',function(e){
  $("#startDate").attr("class", "form-control is-valid");
});

$('#endDate').on('input',function(e){
  $("#endDate").attr("class", "form-control is-valid");
});