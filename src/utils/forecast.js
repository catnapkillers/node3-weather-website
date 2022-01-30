const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fad28a2d28c1c6b5dd2441814f941cc2&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            // console.log(body)
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike,
                observationTime: body.current.observation_time,
                pressure: body.current.pressure,
                humidity: body.current.humidity,
                visibilitiy: body.current.visibilitiy
            })
        }
    })
}

module.exports = forecast