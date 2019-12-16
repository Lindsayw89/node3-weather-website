const request= require('request')



const forecast=(latitude, longitude, callback)=> {
    const url= 'https://api.darksky.net/forecast/a220b4be32f121279c0d88449df4e8de/' + latitude + ',' + longitude


request({url, json: true}, (error, {body})=>{
    if(error){
        callback('unable to connect to weather services', undefined)
    } else if(body.error) {
        callback('invalid location', undefined)
    } else {
        callback(undefined, 
            body.daily.data[0].summary + ' it is currently ' + body.currently.temperature + ' degrees and there is a ' + body.currently.precipProbability + '% chance of rain. The sun will set at ' + body.daily.data[0].sunsetTime)
    }
  })
}


module.exports = forecast