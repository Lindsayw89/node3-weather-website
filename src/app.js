
const path = require('path')
const express = require('express')
const hbs =require('hbs')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')


const app = express()
const port =process.env.PORT || 3000

// defining paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath =path.join(__dirname, '../templates/views')
const partialsPath= path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup  static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather Render',
        name: 'Lindsay Wilson'
    })
})
app. get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        name:  'Lindsay Wilson'
    })
})
app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help page',
        message:'This is the page that will answer any questions you might have!',
        name: 'Lindsay Wilson'
    })
})




app.get('/weather', (req, res)=>{
    if(!req.query.address) {
        return res.send({
            error: 'you must enter a city'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={})=> {
        if(error){
            return res.send({error})
        }

            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }
        
               res.send({
                   forecast: forecastData, location, 
                   address: req.query.address
               })
              })
        })

})



app.get('/products', (req, res)=>{
    if(!req.query.search){
         return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        ErrMessage: 'help article not found'
    })
})
app.get('*',(req, res)=>{
    res.render('404', {
        title: '404',
        name:'Lindsay',
        ErrMessage: 'page not found'
    })
})

app.listen(port, ()=> {
    console.log('server is up on port ' + port)
})