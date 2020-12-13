const fetch = require('node-fetch')
const geocode = require('./geocode.js')

const find_weather = (address,callback) => {

    geocode(address,(error,{Longitude, Latitude, PlaceName} = {}) => {
        if(error === undefined){
            const url1 = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=24&combinationMethod=aggregate&contentType=json&unitGroup=metric&locationMode=single&key=CNPVDDQGIQABQGUB8IWPDP3UH&dataElements=default&locations=${Latitude},${Longitude}`
            fetch(url1)
                .then((res) => res.json())
                .then((body) => {
                    callback(undefined, {
                        PlaceName,
                        Summary : body.location.values[0].conditions,
                        Max_Temp : body.location.values[0].maxt,
                        Curr_Temp :body.location.currentConditions.temp,
                        Precipitation : body.location.currentConditions.precip
                    })
                })
                .catch(err => callback("Netilek connect cheyy..ooof",undefined))
        }
        else {
            callback(error,undefined)
        } 
    })
}

module.exports = find_weather