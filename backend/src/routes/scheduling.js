const _ = require('lodash')
const SchedulingCtrl = require("../controllers/schedulingCrtl")
const baseModuleRoute = "/scheduling"

class SchedulingRouter {
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
     *  userId, typeScheduling, dateTime, observation
     */
    async create(req, res) {
        const response = _.clone(this.response)
        try {
            const schedulingCtrl = new SchedulingCtrl(this.dbPool)

            if (!_.isEmpty(req.body)) {
                const validatedParams = schedulingCtrl.valitadeParamsCreate(
                    req.body.userId,
                    req.body.typeScheduling,
                    req.body.dateTime,
                    req.body.observation
                )

                if (validatedParams && validatedParams.isValid) {
                    const resp = await schedulingCtrl.create(validatedParams.data)

                    if (resp && resp.insertId) {
                        response.message = "Cadastro realizado com sucesso"
                        response.data = validatedParams.data
                        response.data.idScheduling = resp.insertId
                        res.status(200)
                    } else {
                        response.message = `Erro ao cadastrar agendamento -> ${resp.message}`
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
            response.message = "Erro ao realizar cadastro"
            res.status(500)
        } finally {
            res.send(response)
        }
    }
}

module.exports = SchedulingRouter