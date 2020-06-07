const express = require('express')
const bodyParser = require('body-parser')
const http = require("http")
var socketIo = require('socket.io');

const RouteService = require('./src/routes/index')
const DBService = require('./src/dataBase/MySQLService')
const chatCtrl = require('./src/controllers/chatCtrl')
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

io.on("connection", async (socket) => {
    console.log("New client connected")

    socket.on('Message', async (dadosMensagem) => {
        try {
            const senderId = parseInt(dadosMensagem.sender)
            const recieverId = parseInt(dadosMensagem.reciever)
            if ((!_.isNaN(senderId) && numberIdScheduling > 0) && (!_.isNaN(recieverId) && numberIdWorker > 0)) {
                if (dadosMensagem.mensagem !== '' && dadosMensagem.mensagem) {
                    const resp = await chatCtrl.saveMessage(senderId, recieverId, mensagem)
                    if (resp.statusCode == 200)
                        io.sockets.emit('Message', dadosMensagem)
                }
                else {
                    const erro = { mensagem: "A mensagem n�o pode estar vazia", sender: senderId }
                    io.sockets.emit('ErroEnvio', erro)
                }
            } else {
                const erro = { mensagem: 'O id do agendamento e do t�cnico devem ser n�meros maiores que zero', sender: senderId }
                io.sockets.emit('ErroEnvio', erro)
            }
        } catch (err) {
            const erro = { mensagem: 'Erro ao salvar mensagem', sender: senderId }
            io.sockets.emit('ErroEnvio', erro)
        }

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