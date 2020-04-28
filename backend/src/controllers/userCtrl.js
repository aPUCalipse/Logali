const Moment = require('moment')
const _ = require("lodash")
const User = require('../model/user')

class userCtrl {
    constructor(dbPool) {
        this.user = new User(dbPool)
    }

    async selectUser(userId) {
        const response = {
            data:[],
            message: null,
            statusCode: 500
        }

        try {
            const user = await this.user.selectUser(userId) 

            if(user){  
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

module.exports = userCtrl