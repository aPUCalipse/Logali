const _ = require('lodash')
const UserCtrl = require("../controllers/userCtrl")
const baseModuleRoute = "/user"

class userRouter {
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
        this.app.post(`${this.baseRoute}/selectUser`, this.selectUser.bind(this))
    }

    async selectUser(userId) {
        const response = {
            data: [],
            message: null,
            statusCode: 500
        }

        try {
            const user = new UserCtrl(this.dbPool)
            const response = await user.selectUser(userId)

            if (response) {
                response.message = 'Usuário encontrado com sucesso'
                response.data = user
                response.statusCode = 200
            } else {
                response.message = 'Usuário não encontrado.'
                response.statusCode = 404
            }
        }

        catch (err) {
            response.message = `Erro desconhecido ao pesquisar -> ${err.toString()}`
        } finally {
            return response
        }
    }

}

module.exports = userRouter