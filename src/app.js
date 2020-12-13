const path = require('path')
const express = require('express')
const hbs = require('hbs')
const find_weather = require('./utils/findweather')

const app = express()

//Definining paths for express
const pubpath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and viewpath
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialpath)

//Setup static directory to server
app.use(express.static(pubpath))

app.get('', (req, res) =>{
    res.render('index',{
        title: 'Main Page',
        name: 'Ok'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ok'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Ok',
        message: 'Ok for helpppp..'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: "Provide Address"
        })
    }
    find_weather(req.query.address,(error,data) => {
        if(error){
            return res.send({ error })
        }
        res.send(data)
    })
}) 

app.get('/product', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "Search Term 4 god's sake"
        })
    }

    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 'HELP ERROR',
        message: "Help illa mwonee",
        name: 'Ok'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404 ERROR',
        message: "Page not found",
        name: 'Ok'
    })
})

app.listen(3000, () => {
    console.log("Server Started Boy!!")
})