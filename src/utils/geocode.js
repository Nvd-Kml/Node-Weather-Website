const fetch = require('node-fetch')

const geocode = (address,callback) => {
    const url2 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoibml2ZWRrbWwiLCJhIjoiY2tpbGFweG0wMGh0NzJzbXc0Mm54dmdxMSJ9.8S_Pi-ZONqYTeIlGIdXwDg&limit=1`

fetch(url2)
    .then((res) => res.json())
    .then((body) => {
        if(body.features.length === 0)
            callback("Please enter valid Location for god's sake..SMH", undefined)
        else {
            const Longitude = body.features[0].center[0]
            const Latitude = body.features[0].center[1]
            const PlaceName = body.features[0].place_name
            callback(undefined,{ Longitude, Latitude, PlaceName})
        }
    })
    .catch(err => callback("Netilek connect cheyy..ooof",undefined))

}

module.exports = geocode