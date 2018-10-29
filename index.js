const rp = require("request-promise");
var events = require("./web/js/songkick_requests");

const apiKey = "6hVA2yrccxVrs88S";
var artistID = "8561929";
var venue = "Echostage";

var url = `https://api.songkick.com/api/3.0/artists/${artistID}/calendar.json?apikey=${apiKey}`;

var venueUrl = `https://api.songkick.com/api/3.0/search/venues.json?query=${venue}&apikey=${apiKey}`;

var options = {
    uri: venueUrl,
    headers: {
        'User-Agent': 'Mues',
        'Accept': 'application/json'
    },
}

// rp(options).then(data => {
//     var json = JSON.parse(data);
//     var venueList = json.resultsPage.results.venue;
//     for (i = 0; i < venueList.length; i++) {
//         console.log(venueList[i]);
//     }
// }).catch(err => {
//     console.log(err);
// });

events.getVenueID(venue, apiKey).then(data => {
    events.searchEventsAtVenue(data, apiKey, "2018-10-29", "2018-11-30");
}).catch(error => console.log(error));
