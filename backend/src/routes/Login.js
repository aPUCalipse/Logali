const _ = require('lodash')
const LoginCtrl = require("../controllers/loginCtrl")
const baseModuleRoute = "/login"

class LoginRouter {
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
        this.app.post(`${this.baseRoute}`, this.login.bind(this))
    }
	
	/**
     * @params
     *  login, senha, tipoUsuario
     */
	 async login(req, res) {
        const response = _.clone(this.response)
        try {
            const loginCtrl = new LoginCtrl(this.dbPool)

            if (!_.isEmpty(req.body)) {
                const validatedParams = loginCtrl.validateParamsLogin(
                    req.body.login,
                    req.body.senha,
                    req.body.tipoUsuario
                )

                if (validatedParams && validatedParams.isValid) {
                    const resp = await loginCtrl.VerifyLogin(validatedParams.data)

                    if (resp && resp.message === true) {
                        response.message = "Login realizado com sucesso"
                        response.data = validatedParams.data
                        response.data.idUser = resp.idUser
                        res.status(200)
                    } else {
                        response.message = `Erro ao realizar login -> ${resp.message}`
                        response.data = validatedParams.data
                        res.status(resp.statusCode)
                    }
                } else {
                    response.message = validatedParams.message
                    response.data = validatedParams.data
                    res.status(validatedParams.statusCode)
                }
            } else {
                response.message = "Os parametros não foram enviados"
                response.data = req.body
                res.status(200)
            }
        } catch (err) {
            console.log(err)
            response.message = "Erro ao realizar login " + err
            res.status(500)
        } finally {
            res.send(response)
        }
    }
}

module.exports = LoginRouter