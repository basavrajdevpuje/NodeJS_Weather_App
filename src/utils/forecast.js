const request = require('request');


// getting weather forecast using callback function

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=44dec4c6b9d8048dab8554389f515516&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m';
    const option = {
        url,  // object's property shorthand
        json: true,
        method: 'GET'
    }

    request(option, (error, { body }) => {
        //body is an object which contains all these values.So we destructured the body object 
        if (error) {
            callback("Unable to connect to the Weather API!", undefined);
        }
        else if (body.error) {
            callback(body.error.info, undefined);
        }
        else {
            callback(undefined, "Today is " + body.current.weather_descriptions[0] + " day. Its " + body.current.temperature + " degree(s) outside. It feels like " + body.current.feelslike + " degree(s) out." + " And there is " + body.current.precip + " % chance of rain.");
        }
    })
}

module.exports = forecast;

// getting weather forecast without using callback function

/*
    const url_weatherstack = 'http://api.weatherstack.com/current?access_key=44dec4c6b9d8048dab8554389f515516&query=&units=f';

    const option_weatherstack = {
        url: url_weatherstack,
        method: 'GET',
        json: true
    }
    request(option_weatherstack, (error, response) => {

    if (error) {
        console.log("Unable to connect to the api..");
    }
    else if (response.body.error) {
        console.log(response.body.error.info);
    }
    else {
        if (response.body.current.temperature === response.body.current.feelslike) {
            console.log("Today is " + response.body.current.weather_descriptions[0].toLowerCase() + " day. Its " + response.body.current.temperature + " fahrenheit outside.And its feels same like " + response.body.current.feelslike + " fahrenheit out." + " And there is " + response.body.current.precip + "% chance of rain.");
        }
        else {
            console.log("Today is " + response.body.current.weather_descriptions[0].toLowerCase() + " day. Its " + response.body.current.temperature + " fahrenheit outside.But it feels like " + response.body.current.feelslike + " fahrenheit out." + " And there is " + response.body.current.precip + " % chance of rain.");
        }
    }
})*/