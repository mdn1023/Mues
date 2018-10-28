const rp = require("request-promise");

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

rp(options).then(data => {
    var upcomingEvents = JSON.parse(data).resultsPage.results.event;
    console.log(upcomingEvents[0]);
}).catch(err => {
    console.log(err);
});
