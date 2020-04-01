const express = require('express')
const bodyParser = require('body-parser')

const RouteService = require('./src/routes/index')
const DBService = require('./src/dataBase/MySQLService')
const pool = DBService.getPool()

const app = express()

app.all('*', function (req, res, next) {
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    }
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials)
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token")
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
    res.header()
    next()
})

app.use(bodyParser.json())

const routeService = new RouteService(app, pool)

routeService.init()

app.listen(8000, () => {
    console.log("Listening on http://localhost:8000/")
})