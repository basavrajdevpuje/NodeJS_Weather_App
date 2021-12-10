const request = require('request');

// getting geocode using callback function

const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmFzYXZyYWoiLCJhIjoiY2t0bGZycmczMDFsYjJ1czgwZ3lhM3ptbSJ9.r3pGobqZNJP5r9vrYd8zKA&limit=1';
    const option = {
        url,  // object's property shorthand
        json: true,
        method: 'GET'
    }

    request(option, (error, { body }) => {
        if (error) {
            callback("Unable to connect to API!", undefined);
        }
        else if (body.features.length === 0) {
            callback("Unable to find the location. Try another location", undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;


// getting geocode without using callback function
/*
const url_geocode = 'http://api.mapbox.com/geocoding/v5/mapbox.places/Offenburg.json?access_token=pk.eyJ1IjoiYmFzYXZyYWoiLCJhIjoiY2t0bGZycmczMDFsYjJ1czgwZ3lhM3ptbSJ9.r3pGobqZNJP5r9vrYd8zKA&limit=1';

const option_mapbox = {
    url: url_geocode,
    json: true,
    method: 'GET'
}
request(option_mapbox, (error, response) => {

    if (error) {
        console.log("Unable to connect to Weather API!");
    }
    else if (response.body.features.length === 0) {
        console.log("Unable to find the loacation. Try the new location.");
    }
    else {
        console.log("The Latitude is " + response.body.features[0].center[1] + " and Longitude is " + response.body.features[0].center[0]);
    }
});*/