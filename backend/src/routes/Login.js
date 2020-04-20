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

	init() {
        this.app.post(`${this.baseRoute}`, this.create.bind(this))
    }
	
	/**
     * @params
     *  login, senha, tipoUsuario
     */
	 async create(req, res) {
        const response = _.clone(this.response)
        try {
            const loginCtrl = new LoginCtrl(this.dbPool)

            if (!_.isEmpty(req.body)) {
                const validatedParams = loginCtrl.valitadeParamsCreate(
                    req.body.login,
                    req.body.senha,
                    req.body.tipoUsuario
                )

                if (validatedParams && validatedParams.isValid) {
                    const resp = await registerCtrl.create(validatedParams.data)

                    if (resp && resp.insertId) {
                        response.message = "Cadastro realizado com sucesso"
                        response.data = validatedParams.data
                        response.data.idRegister = resp.insertId
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