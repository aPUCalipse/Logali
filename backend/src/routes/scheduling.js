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
        this.app.post(`${this.baseRoute}/create`, this.create.bind(this));
        this.app.put(`${this.baseRoute}/update`, this.update.bind(this));
        this.app.get(`${this.baseRoute}/getId`, this.getId.bind(this));
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

    async update(req, res) {
        const response = _.clone(this.response)
        try {
            const schedulingCtrl = new SchedulingCtrl(this.dbPool)

            if (!_.isEmpty(req.body)) {
              
                const resp = await schedulingCtrl.update(req.body)
                response.message = "Agendamento editado com sucesso"
                response.data = req.body
                res.status(200)
                  
            } else {
                response.message = "Os parametros não foram enviados"
                response.data = req.body
                res.status(200)
            }
        } catch (err) {
            console.log(err)
            response.message = "Erro ao realizar edição"
            res.status(500)
        } finally {
            res.send(response)
        }
    }

    async getId(req, res) {
        const response = _.clone(this.response)
        try {
            const schedulingCtrl = new SchedulingCtrl(this.dbPool)
                const resp = await schedulingCtrl.getId(req.body)
                response.data = resp.message
                res.status(200)
                  
        } catch (err) {
            console.log(err)
            response.message = "Erro ao realizar pesquisa"
            res.status(500)
        } finally {
            console.log(response);
            res.send(response)
        }
    }
}

module.exports = SchedulingRouter