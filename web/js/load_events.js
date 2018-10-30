$(document).ajaxStart(function(){
    $.LoadingOverlay("show");
});
$(document).ajaxStop(function(){
    $.LoadingOverlay("hide");
});

$(document).ready(function(){
    const apiKey = "6hVA2yrccxVrs88S";

    var venueName = window.localStorage.getItem("venueName");
    var startDate = window.localStorage.getItem("startDate");
    var endDate = window.localStorage.getItem("endDate");
    var eventsTable = $("#tableBody");
    var jumboTable = $("#jumboTable");

    var venueSearchURL = `https://api.songkick.com/api/3.0/search/venues.json?query=${venueName}&apikey=${apiKey}`;

    $.ajax({
        url: venueSearchURL,
        type: "GET", 
        success: function (data) {
            console.log(data);
            var venueList = data.resultsPage.results.venue;
            for (i = 0; i < venueList.length; i++) {
                if (venueList[i].displayName == venueName) {
                    var venueID = venueList[i].id;
                    console.log(venueID);

                    var venueEventsURL = `https://api.songkick.com/api/3.0/venues/${venueID}/calendar.json?apikey=${apiKey}&min_date=${startDate}&max_date=${endDate}`;
                    $.get(venueEventsURL, function(data, status) {
                        var events = data.resultsPage.results.event;
                        console.log(events);

                        for (i = 0; i < events.length; i++) {
                            var event = events[i].displayName;
                            var date = events[i].start.date;
                            var time = events[i].start.time;
                            var link = events[i].uri;
                            var splitString = " at " + venueName;

                            var formattedDate = new Date(date).toLocaleDateString(undefined, {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })
        
                            var event = event.split(splitString)[0];
                            var number = i + 1;

                            if (time != null) {
                                time = time.split(":");
                                var hours = Number(time[0]);
                                var minutes = Number(time[1]);

                                var timeValue;

                                if (hours > 0 && hours <= 12) {
                                    timeValue= "" + hours;
                                } else if (hours > 12) {
                                    timeValue= "" + (hours - 12);
                                } else if (hours == 0) {
                                    timeValue= "12";
                                }
                                
                                timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
                                timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM
                            } else {
                                time = "N/A";
                            }

                            jumboTable.removeAttr("style");
                            eventsTable.append(
                                `<tr>` +
                                    `<td class="text-center">${number}</td>` +
                                    `<td class="text-center"><a href="${link}" target="_blank">${event}</a></td>` +
                                    `<td class="text-center">${venueName}</td>` +
                                    `<td class="text-center">${formattedDate}</td>` +
                                    `<td class="text-center">${timeValue}</td>` +
                                    `<td class="text-center">` + 
                                        `<button type="button" class="btn btn-secondary">Listen</button>` + 
                                    `</td>` +
                                `</tr>`
                            );
                        }
                    });
                }
            }
        },
        error: function (error) {
            console.log(error);
        }
    })

    $('body').show();
});