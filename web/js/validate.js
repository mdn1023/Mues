var $myInput = $('#venueName').on('change', anotherFunction);

var anotherFunction = function() {
  $myInput.val('Another value');
  $myInput.trigger('change');
};