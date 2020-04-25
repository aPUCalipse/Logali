const Login = require('../model/login')

class LoginCtrl {
    constructor(dbPool) {
        this.login = new Login(dbPool)
    }

    validateParamsLogin(login, senha, tipoUsuario) {
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
        }else {
            validatedParams.isValid = true
            validatedParams.statusCode = 200
        }

        return validatedParams
    }

    async VerifyLogin(login) {
        const response = {
            message: null,
            statusCode: 500,
            userID: 0
        }

        try {
            const userLogin = await this.login.validate(login.login, login.password, login.tipoUsuario);
            response.message = userLogin.message;
            if (userLogin.message === 'Senha incorreta') {
                response.statusCode = 400
            }
            else if (userLogin.message === 'Usuário não encontrado') {
                response.statusCode = 404
            }
            response.userID = userLogin.idUser
        }
        catch (err) {
            response.message = `Erro desconhecido ao fazer login -> ${err.toString()}`
        } finally {
            console.log(response)
            return response
        }
    }
}

module.exports = LoginCtrl