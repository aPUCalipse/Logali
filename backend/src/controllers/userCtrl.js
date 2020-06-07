const Moment = require('moment')
const _ = require("lodash")
const User = require('../model/user')

class userCtrl {
    constructor(dbPool) {
        this.user = new User(dbPool)
    }

    async selectUser(userId) {
        const response = {
            data: [],
            message: null,
            statusCode: 500
        }

        try {
            const user = await this.user.selectUser(userId)

            if (user) {
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
    async getUserById(id) {
        const response = {
            message: null,
            statusCode: 500,
            data: {}
        }

        try {
            const user = await this.user.getById(id)
            if (user) {
                response.message = "Usuario coletado com sucesso"
                response.statusCode = 200
                response.data = user
            } else {
                response.message = "O usuario demandado não existe"
                response.statusCode = 404
            }
        }
        catch (err) {
            response.message = `Erro desconhecido ao coletar usuario --> ${err.toString()}`
        } finally {
            return response
        }
    }
}

module.exports = userCtrl