const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '..', 'public'))


const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')

// Define paths for Express config, public directory to serve
app.use(express.static(path.join(__dirname, '..', 'public')))

// HBS looks for files in ./views by default, but can be changed as follows
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

app.set('views', viewsPath)



// // multiple routes:
// app.com
// app.com/help
// app.com/about

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'James Steele'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Dynamic',
        name: 'James A. Steele III'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Dynamic',
        name: 'James'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            // this could've been written as: return res.send({ error })
            return res.send({
                error: 'A geocoding error was returned: ' + error
            })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: 'A forecast retrieval error was returned: ' + error
                })
            }

            res.send({
                // this could've just been written as: location,
                location: location,
                forecast: forecastData.description,
                temperature: forecastData.temperature,
                feelsLike: forecastData.feelsLike
            })
            
        })
    })
    // res.send({
    //     temperature: 17,
    //     unit: 'celsius',
    //     location: 'Timaru, NZ',
    //     forecast: 'cloudy',
    //     address: req.query.address
    // })
})

// testing query strings
app.get('/products', (req, res) => {
    if (!req.query.search) {
        // Using return here will stop the function if the condition isn't met
        // This avoid an error below because you can't send two responses
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Four, oh four!',
        message: 'The requested help page cannot be found.',
        name: 'James'
    })
})

// This needs to go last b/c Express serves teh first match it finds
app.get('*', (ren, res) => {
    res.render('404', {
        title: 'Four, oh four!',
        message: 'The requested page cannot be found.',
        name: 'James'
    })
})

app.listen(port, () => {
    console.log('Server is up port ' + port)
})