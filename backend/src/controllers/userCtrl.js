const Moment = require('moment')
const User = require('../model/user')

class UserCtrl {
    constructor(dbPool) {
        this.user = new User(dbPool)
    }

    async getUserById(id){
        const response = {
            message: null,
            statusCode: 500,
            data: {}
        }

        try {
            const user = await this.user.getById(id)
            if(user){
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

module.exports = UserCtrl