const _ = require('lodash')
const RegisterCtrl = require("../controllers/registerCtrl")
const baseModuleRoute = "/register"

class RegisterRouter {
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
        this.app.post(`${this.baseRoute}/create`, this.create.bind(this))
    }

    /**
     * @params
     *  nome,login, senha, tipoUsuario, estado, cidade ,bairro, rua, cep, numero, complemento ,geolocX, geolocY
     */
    async create(req, res) {
        const response = _.clone(this.response)
        try {
            const registerCtrl = new RegisterCtrl(this.dbPool)

            if (!_.isEmpty(req.body)) {
                const validatedParams = registerCtrl.valitadeParamsCreate(
                    req.body.nome,
                    req.body.login,
                    req.body.senha,
                    req.body.tipoUsuario,
                    req.body.estado,
                    req.body.cidade,
                    req.body.bairro,
                    req.body.rua,
                    req.body.cep,
                    req.body.numero,
                    req.body.complemento,
                    req.body.geolocX,
                    req.body.geolocY
                )

                //response.data = validatedParams.data;
                //response.message = "ok";
                //res.send(response);

                if (validatedParams && validatedParams.isValid) {
                    const resp = await registerCtrl.create(validatedParams.data)

                    if (resp && resp.insertId) {
                        response.message = "Cadastro realizado com sucesso"
                        response.data = validatedParams.data
                        response.data.idRegister = resp.insertId
                        res.status(200)
                    } else {
                        response.message = `Erro ao cadastrar usuário -> ${resp.message}`
                        response.data = validatedParams.data
                        res.status(resp.statusCode)
                    }
                } else {
                    response.message = validatedParams.message
                    response.data = validatedParams.data
                    res.status(validatedParams.statusCode)
                }
        } catch (err) {
            console.log(err)
            response.message = "Erro ao realizar cadastro " + err
            res.status(500)
        } finally {
            res.send(response)
        }
    }
}

module.exports = RegisterRouter