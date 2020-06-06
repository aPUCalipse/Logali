const _ = require('lodash')
const ChatCtrl = require("../controllers/chatCtrl")
const baseModuleRoute = "/chat"

class ChatRouter {
    constructor(app, appBaseRoute, dbPool) {
        this.app = app
        this.dbPool = dbPool
        this.baseRoute = appBaseRoute + baseModuleRoute

        this.response = {
            message: null,
            data: {}
        }
    }

    init() {
        this.app.post(`${this.baseRoute}/getMessages`, this.getMessages.bind(this))
    }

    async getMessages(req, res) {
        const response = _.clone(this.response)
        try {
            const chatCtrl = new ChatCtrl(this.dbPool)

            if (!_.isEmpty(req.body)) {
                const validatedParams = ChatCtrl.validateParamsGet(
                    req.body.senderId,
                    req.body.recieverId
                )

                if (validatedParams && validatedParams.isValid) {
                    const resp = await chatCtrl.getMessages(validatedParams.data)

                    if (resp) {
                        response.message = "Cadastro realizado com sucesso"
                        response.data = validatedParams.data
                        response.data.idRegister = resp.insertId
                        res.status(200)
                    } else {
                        response.message = `Erro ao recuperar mensagens -> ${resp.message}`
                        response.data = validatedParams.data
                        res.status(resp.statusCode)
                    }
                } else {
                    response.message = validatedParams.message
                    response.data = validatedParams.data
                    res.status(validatedParams.statusCode)
                }
            } else {
                response.message = "Os parametros n�o foram enviados"
                response.data = req.body
                res.status(201)
            }
        } catch (err) {
            console.log(err)
            response.message = "Erro ao recuperar mensagens " + err
            res.status(500)
        } finally {
            res.send(response)
        }
    }
}

module.exports = ChatRouter