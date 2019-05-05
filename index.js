const rp = require("request-promise");
// var events = require("./web/js/songkick_requests");

const apiKey = "6hVA2yrccxVrs88S";
var artistID = "8561929";
// var venue = "Merriweather Post Pavilion";
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

rp(options).then(data => {
    var json = JSON.parse(data);
    console.log(json);
    var venueID = json.resultsPage.id;
    var startDate = "2018-10-31";
    var endDate = "2018-11-25";

    var venueEventsURL = `https://api.songkick.com/api/3.0/venues/${venueID}/calendar.json?apikey=${apiKey}&min_date=${startDate}&max_date=${endDate}`;

    var newOption = {
        uri: venueEventsURL,
        headers: {
            'User-Agent': 'Mues',
            'Accept': 'application/json'
        },
    }

    rp(newOption).then(data => {
        var json = JSON.parse(data);

        console.log(json.resultsPage.results);
    })
}).catch(err => {
    console.log(err);
});

// events.getVenueID(venue, apiKey).then(data => {
//     events.searchEventsAtVenue(data, apiKey, "2018-10-29", "2018-11-30");
// }).catch(error => console.log(error));
