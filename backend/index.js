const express = require('express')
const bodyParser = require('body-parser')
const http = require("http")
var socketIo = require('socket.io');

const RouteService = require('./src/routes/index')
const DBService = require('./src/dataBase/MySQLService')
const pool = DBService.getPool()

const app = express()

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Origin", req.headers.origin)
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token")
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
    res.header()
    next()
})

app.use(bodyParser.json())
const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
    console.log("New client connected")

    socket.on('Message', (dadosMensagem) => {

        io.sockets.emit('Message', dadosMensagem)
    })

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

const routeService = new RouteService(app, pool)

routeService.init()

server.listen(8000, () => {
    console.log("Listening on http://localhost:8000/")
})