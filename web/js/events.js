$(document).ready(function(){
    $('#searchFields').on('submit', function(e){
        var venueName = $("#venueName").val();
        var startDate = $("#startDate").val();
        var endDate = $("#endDate").val();

        // e.preventDefault();

        if (venueName) {
            window.localStorage.setItem("venueName", venueName);
        }
        if (startDate) {
            window.localStorage.setItem("startDate", startDate);
        }
        if (endDate) {
            window.localStorage.setItem("endDate", endDate);
        }
    });
});