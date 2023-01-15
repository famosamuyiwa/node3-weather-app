const express = require("express")
const utils = require("./utils/utils.js")
const path  = require("path")
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views locaion
app.set("view engine", "hbs")
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static direcory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title : "Weather App",
        name : "Famosa Genius"
    })
})

app.get('/about', (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Famosa Brains"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "Haha you genius",
        title: "Help",
        name: "Famosa"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "must supply address"})
    }
    
  
    address = req.query.address
    utils.geoCode(address, (error, {latitude, longitude, location} ={}) => {
        if(error){
            return res.send({
                error
            })
        }

        utils.forecast(latitude, longitude, (error, {forecast, humidity} = {}) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                address,
                location,
                forecast,
                humidity
            })
        })
    })
})

app.get("/products", (req,res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products:{

        }
    })
})

app.get('/help/*', (req,res) => {
    res.render("404", {
        title: "404",
        name: "Famosa",
        errorMessage: "Help article not found." 
    })
})

app.get("*", (req,res) => {
    res.render("404", {
        title: "404",
        name: "Famosa",
        errorMessage: "Page not found"
    })
})

app.listen(port, () => {
    console.log("Server running on port "+ port)
}) 