const path = require('path')
const express = require('express') //load express
const hbs = require('hbs')
//const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//The var app = express() statement creates a new express application for you
const app = express()
const port = process.env.PORT || 3000

// the domain app.com will have one domain running on express server and 
// we have to configure the different route for eg app.com/help

//Define paths for Express config
const pathPublicFolder = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, "../template/views")
const partialsPath = path.join(__dirname, '../template/partials')

//integrate the handlebar template engine with express server and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
//to serve the static dirctory using path.join() we can use the app.use()
app.use(express.static(pathPublicFolder))

// set up the route for the Home page Handlebar template 
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        author: "Basavraj"
    })
})
// set up the route for the about page Handlebar template 
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        author: 'Basavraj'
    })
})
// set up the route for the help page Handlebar template 
app.get('/help', (req, res) => {
    res.render('help', {
        help_message: "For more help please contact me at devpuje.basavraj@gmail.com",
        title: "Help",
        author: "Basavraj"
    })
})


//app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'please provide the address'
        })
    }
    var address = req.query.address
    // using default value parameter in geocode {} to get the proper error
    geocode(address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "Provide the search term"
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('help_error', {
        error_message: "Help article not found"
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        error_message: "Page not found.."
    })
})

//to start the sever
app.listen(port, () => {
    console.log("Server is up on port " + port);
})

/*
//app.com
app.get('', (req, res) => {
    //when we visited the URL localhost:3000 it went to the express server
    //found the matching route in the root
    // process the request using the handler. Handler used res.send() to send the text response
    res.send("Hello Express")
})*/

/*
//app.com/help
app.get('/help', (req, res) => {
    res.send("<h1>For more help please subscribe</h1>")
})

//app.com/about
app.get('/about', (req, res) => {
    res.send("<h2>About</h2>")
})



*/