const Moment = require('moment')
const Login = require('../model/login')

class LoginCtrl {
    constructor(dbPool) {
        this.login = new Login(dbPool)
    }

    valitadeParamsCreate(login, senha, tipoUsuario) {
        const validatedParams = {
            isValid: null,
            message: null,
            statusCode: null,
            data: {
                login: login,
                password: senha,
                tipoUsuario: tipoUsuario
            }
        }

        const momentDateTime = Moment().format("YYYY-MM-DD HH:mm:ss")
        validatedParams.data.CreatedAt = momentDateTime

        if (!login) {
            validatedParams.isValid = false
            validatedParams.message = "O parâmetro Login está incorreto"
            validatedParams.statusCode = 400
        } else if (!senha) {
            validatedParams.isValid = false
            validatedParams.message = "O parâmetro senha está incorreto"
            validatedParams.statusCode = 400
        } else if (!tipoUsuario) {
            validatedParams.isValid = false
            validatedParams.message = "O parâmetro tipo de usuário está incorreto"
            validatedParams.statusCode = 400
        else {
            validatedParams.isValid = true
            validatedParams.statusCode = 200
        }

        return validatedParams
    }

    async create(login) {
        const response = {
            insertId: null,
            message: null,
            statusCode: 500
        }

        try {
				const createdLogin = await this.login.validate(login.login, login.password, login.tipoUsuario)
                response.insertId = createdLogin.insertId
                response.message = createdLogin.message
        }
        catch (err) {
            response.message = `Erro desconhecido ao fazer login -> ${err.toString()}`
        } finally {
            return response
        }
    }
}

module.exports = LoginCtrl