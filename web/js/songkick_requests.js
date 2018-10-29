var rp = require("request-promise");

// const venueName = window.localStorage.getItem("venueName");
// const startDate = window.localStorage.getItem("startDate");
// const endDate = window.localStorage.getItem("endDate");

const apiKey = "6hVA2yrccxVrs88S";

async function getVenueID(venueName, apiKey) {
    var venueSearchURL = `https://api.songkick.com/api/3.0/search/venues.json?query=${venueName}&apikey=${apiKey}`;

    var options = { 
        uri: venueSearchURL
    };

    return rp(options).then(data => {
        var json = JSON.parse(data);
        var venueList = json.resultsPage.results.venue;
        for (i = 0; i < venueList.length; i++) {
            if (venueList[i].displayName == venueName) {
                return venueList[i].id;
            }
        }
    }).catch(error => {
        console.log(error);
    });
}

async function searchEventsAtVenue(venueID, apiKey, startDate, endDate) {
    var venueEventsURL = `https://api.songkick.com/api/3.0/venues/${venueID}/calendar.json`;

    var options = {
        uri: venueEventsURL,
        qs: {
            apikey: apiKey,
            min_date: startDate,
            max_dateL: endDate
        }
    }

    return rp(options).then(data => {
        var json = JSON.parse(data);
        var events = json.resultsPage.results.event;
        console.log(events);
        return events;
    }).then(error => {
        console.log(error);
    });
}

module.exports = {
    getVenueID: getVenueID,
    searchEventsAtVenue: searchEventsAtVenue
}