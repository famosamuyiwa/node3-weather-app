const request = require('request')


const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYmFyYWt1ZGE5OTkiLCJhIjoiY2xjMDZobXZ0MG1mODNwbXphd2FtNzY3aCJ9.erq6YPfiJ7zUHWaZBOnYaw&limit=1"
    
    if(!address){
        return console.log ("It's empty bitch")
    }

    request({url, json:true}, (error, {body} = {}) => {
        if(error){
            callback("Failed to establish a connection.", undefined)
        }
        else if(body.features.length === 0 ){
            callback("No result found for '"+address+"'", undefined)
        }
        else{
          
            res = {
                longitude: body.features[0].center[1] ,
                latitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, res)
        }
    })
}

const forecast = (lat, long, callback) => {
    url = `http://api.weatherstack.com/current?access_key=5a228900e39fae9313e5f573f74897c8&query=${long},${lat}`
    
    request({url, json:true}, (error, {body} = {}) => {
        if(error){
            callback("Failed to establish a connection", undefined)
        }
        else if(body.success === false){
            callback("Invalid coordinates", undefined)
        }
        else{

            res = {
                name : body.location.name,
                forecast: body.current.weather_descriptions[0]
            }
            callback(undefined, res)
        }
    })
}

module.exports = {
    geoCode : geoCode,
    forecast : forecast
}