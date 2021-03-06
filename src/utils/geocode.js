
const request= require('request')



//---------------------------------below video 36 --------------------------

const geocode= (address, callback)=>{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibGluZHNheXciLCJhIjoiY2szcml6aGl6MDV6YzNvcWd1NzRkbWxlayJ9.aDzXLiNP1D6_sIHeykOtGA&limit=1'

    request({url, json:true}, (error, {body})=>{
    if (error){
        callback('unable to connect to location services')
    } else if(body.features.length==0){
           callback('unable to find location. Try another search', undefined)

      } else{
          callback(undefined, {
              latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
          })
      }
    }) 
   }
   module.exports = geocode