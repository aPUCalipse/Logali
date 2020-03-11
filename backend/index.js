const express = require('express')
const RouteService = require('./src/routes/index')

const app = express()

const routeService = new RouteService(app)

routeService.init()

app.listen(8000, ()=>{
    console.log("Listening on http://localhost:8000")
})