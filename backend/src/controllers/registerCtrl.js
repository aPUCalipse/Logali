const Moment = require('moment')
const Register = require('../model/register')

class RegisterCtrl {
    constructor(dbPool) {
        this.register = new Register(dbPool)
    }

    valitadeParamsCreate(nome, login, senha, tipoUsuario, estado, cidade, bairro, rua, cep, numero, complemento ,geolocX, geolocY) {
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
                number: numero,
                complement : complemento,
                geoLocX: geolocX,
                geoLocY: geolocY,
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
        } else if (!tipoUsuario) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro tipo de usuário está incorreto"
            validatedParams.statusCode = 400
        } else if (!estado && tipoUsuario !== 2) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro estado está incorreto"
            validatedParams.statusCode = 400
        } else if (!cidade && tipoUsuario !== 2) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro cidade está incorreto"
            validatedParams.statusCode = 400
        } else if (!bairro && tipoUsuario !== 2) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro bairro está incorreto"
            validatedParams.statusCode = 400
        } else if (!rua && tipoUsuario !== 2) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro rua está incorreto"
            validatedParams.statusCode = 400
        } else if (!cep && tipoUsuario !== 2) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro cep está incorreto"
            validatedParams.statusCode = 400
        } else if (!numero && tipoUsuario !== 2) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro número está incorreto"
            validatedParams.statusCode = 400
        } else if (!geolocX && tipoUsuario !== 2) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro Geolocalização do eixo X está incorreto"
            validatedParams.statusCode = 400
        } else if (!geolocY && tipoUsuario !== 2) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro Geolocalização do eixo Y está incorreto"
            validatedParams.statusCode = 400
        }
            // Complemento pode ser um parâmetro vazio e n sera validado.
        else {
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
            const hasSameRegister = await this.register.hasSameLogin(register.login, register.tipoUsuario)
            if (hasSameRegister) {
                response.message = "Já existe um usuário com esse login"
                response.statusCode = 406
            } else {
                const createdRegister = await this.register.create(register.name, register.login, register.password, register.tipoUsuario, register.state, register.city, register.neighborhood, register.street, register.zipCode, register.number, register.complement, register.geoLocX, register.geoLocY, register.CreatedAt)
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


    valitadeParamsUpdate(userId, nome, login, senha, tipoUsuario, estado, cidade, bairro, rua, cep, numero, complemento, geolocX, geolocY) {
        const validatedParams = {
            isValid: null,
            message: null,
            statusCode: null,
            data: {
                id: userId,
                name: nome,
                login: login,
                password: senha,
                tipoUsuario: tipoUsuario,
                state: estado,
                city: cidade,
                neighborhood: bairro,
                street: rua,
                zipCode: cep,
                number: numero,
                complement: complemento,
                geoLocX: geolocX,
                geoLocY: geolocY
            }
        }

        if (!login) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro usuario está incorreto"
            validatedParams.statusCode = 400
        } else if (!userId) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro id está incorreto"
            validatedParams.statusCode = 400
        }else if (!nome) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro nome está incorreto"
            validatedParams.statusCode = 400
        } else if (!senha) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro senha está incorreto"
            validatedParams.statusCode = 400
        } else if (!tipoUsuario) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro tipo de usuário está incorreto"
            validatedParams.statusCode = 400
        } else if (!estado && tipoUsuario !== 2) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro estado está incorreto"
            validatedParams.statusCode = 400
        } else if (!cidade && tipoUsuario !== 2) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro cidade está incorreto"
            validatedParams.statusCode = 400
        } else if (!bairro && tipoUsuario !== 2) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro bairro está incorreto"
            validatedParams.statusCode = 400
        } else if (!rua && tipoUsuario !== 2) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro rua está incorreto"
            validatedParams.statusCode = 400
        } else if (!cep && tipoUsuario !== 2) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro cep está incorreto"
            validatedParams.statusCode = 400
        } else if (!numero && tipoUsuario !== 2) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro número está incorreto"
            validatedParams.statusCode = 400
        } else if (!geolocX && tipoUsuario !== 2) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro Geolocalização do eixo X está incorreto"
            validatedParams.statusCode = 400
        } else if (!geolocY && tipoUsuario !== 2) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro Geolocalização do eixo Y está incorreto"
            validatedParams.statusCode = 400
        }
        else {
            validatedParams.isValid = true
            validatedParams.statusCode = 200
        }

        return validatedParams
    }

    async update(updater) {
        const response = {
            insertId: null,
            message: null,
            statusCode: 500
        }

        try {
            const updaterRegister = await this.register.updater(updater.userId, updater.name, updater.login, updater.password, updater.state, updater.city, updater.neighborhood, updater.street, updater.zipCode, updater.number, updater.complement, updater.geoLocX, updater.geoLocY, updater.updatedAt)
            response.insertId = updaterRegister.insertId
            response.message = updaterRegister.message
        } catch (err) {
            response.message = `Erro desconhecido ao atualizar usuário -> ${err.toString()}`
        } finally {
            return response
        }
    }
}

module.exports = RegisterCtrl