const Moment = require('moment')
const Register = require('../model/register')

class RegisterCtrl {
    constructor(dbPool) {
        this.register = new Register(dbPool)
    }

    valitadeParamsCreate(nome,login, senha, tipoUsuario, estado, cidade ,bairro, rua, cep, numero) {
        const validatedParams = {
            isValid: null,
            message: null,
            statusCode: null,
            data: {
                name: nome,
                login: login,
                password: senha,
                tipoUsuario: tipoUsuario,
                state: estado,
                city : cidade,
                neighborhood : bairro,
                street : rua,
                zipCode : cep,
                number : numero,
                CreatedAt :null
            }
        }

        const momentDateTime = Moment().format("YYYY-MM-DD HH:mm:ss")
        validatedParams.data.CreatedAt = momentDateTime

        if (!login) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro usuario está incorreto"
            validatedParams.statusCode = 400
        } else if (!nome) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro nome está incorreto"
            validatedParams.statusCode = 400
        } else if (!senha) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro senha está incorreto"
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
                const createdRegister = await this.register.create(register.name, register.login, register.password, register.tipoUsuario, register.state, register.city ,register.neighborhood, register.street, register.zipCode, register.number, register.CreatedAt)
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