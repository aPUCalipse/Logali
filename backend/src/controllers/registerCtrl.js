const Moment = require('moment')
const Register = require('../model/register')

class RegisterCtrl {
    constructor(dbPool) {
        this.register = new Register(dbPool)
    }

    valitadeParamsCreate(nome,login, senha, tipoUsuario, estado, cidade ,bairro, rua, cep, numero, complemento) {
        const validatedParams = {
            isValid: null,
            message: null,
            statusCode: null,
            data: {
                name: nome,
                login: login,
                password: senha,
                tipoUsuario: tipoUsuario,
                estado = null,
                cidade = null,
                bairro = null,
                rua = null,
                CEP = null,
                numero = null,
                complemento = null
            }
        }

        const momentDateTime = Moment(dateTime, "DD/MM/YYYY HH:mm:ss")
        validatedParams.data.dateTime = momentDateTime

        if (!userId) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro usuario está incorreto"
            validatedParams.statusCode = 400
        } else if (!typeRegister) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro tipo de usuário"
            validatedParams.statusCode = 400
        } else if (!momentDateTime.isValid()) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro data está incorreto"
            validatedParams.statusCode = 400
        } else {
            validatedParams.isValid = true
            validatedParams.statusCode = 200
        }

        return validatedParams
    }

    async create(register) {
        const response = {
            insertId: null,
            message: null,
            statusCode: 500
        }

        try {
            const hasSameRegister = await this.register.hasSameLogin(register.login)
            if (hasSameRegister) {
                response.message = "Já existe um usuário com esse login"
                response.statusCode = 406
            } else {
                const createdRegister = await this.register.create(register.nome, register.login, register.senha, register.tipoUsuario, register.estado, register.cidade ,register.bairro, register.rua, register.cep, register.numero, register.complemento)
                response.insertId = createdRegister.insertId
                response.message = createdRegister.message
            }
        }
        catch (err) {
            response.message = `Erro desconhecido ao criar usuário -> ${err.toString()}`
        } finally {
            return response
        }
    }
}

module.exports = RegisterCtrl