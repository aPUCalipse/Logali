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
        this.app.post(`${this.baseRoute}/searchEnd`, this.searchEnd.bind(this));
        this.app.delete(`${this.baseRoute}/delete/:idScheduling`, this.delete.bind(this));
        this.app.post(`${this.baseRoute}/select`, this.select.bind(this));
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
                res.status(400)
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
                const validatedParams = schedulingCtrl.valitadeParamsUpdate(
                    req.body.dateTime,
                    req.body.observation,
                    req.body.idUser,
                    req.body.id
                )

                if(validatedParams && validatedParams.isValid){
                    const resp = await schedulingCtrl.update(validatedParams.data)
                    
                    response.message = resp.message
                    response.data = resp
                    res.status(resp.statusCode)
                } else {
                    response.message = validatedParams.message
                    response.data = validatedParams.data
                    res.status(validatedParams.statusCode)
                }                  
            } else {
                response.message = "Os parametros não foram enviados"
                response.data = req.body
                res.status(400)
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
            const idScheduling = parseInt(req.params.id)
            if(!_.isNaN(idScheduling) && idScheduling > 0){
                const schedulingCtrl = new SchedulingCtrl(this.dbPool)
                const resp = await schedulingCtrl.getId(idScheduling)
                
                response.data = resp.scheduling
                response.message = resp.message

                res.status(resp.statusCode)
            } else {
                response.message = "Parametro id deve ser um numero e maior que zero"
                res.status(400)
            }
        } catch (err) {
            console.log(err)
            response.message = "Erro ao realizar pesquisa"
            res.status(500)
        } finally {
            console.log(response);
            res.send(response)
        }
    }

    async searchEnd(req, res) {
        const response = _.clone(this.response)
        try {
            if(req.body && req.body.userId){
                const schedulingCtrl = new SchedulingCtrl(this.dbPool)
                const resp = await schedulingCtrl.searchEnd(req.body.userId)

                response.data = resp.data
                response.message = resp.message
                res.status(resp.statusCode)                  
            } else {
                response.message = "É necessário enviar o id do usuario"
                res.status(400)                  
            }
        } catch (err) {
            console.log(err)
            response.message = "Erro ao realizar pesquisa"
            res.status(500)
        } finally {
            res.send(response)
        }
    }

    async select(req, res) {
        const response = _.clone(this.response)
        try {
            const schedulingCtrl = new SchedulingCtrl(this.dbPool)

            if (!_.isEmpty(req.body)) {         
                const params = schedulingCtrl.getDefultParams(
                    req.body.page,
                    req.body.pageSize,
                    req.body.idTypeScheduling,
                    req.body.idStatusScheduling,
                    req.body.idUser
                )

                if(params.isValid){
                    const resp = await schedulingCtrl.select(params.data)
                    response.message = "Seleção realizada com sucesso"
                    response.data = resp.data
                    res.status(200)
                } else {
                    response.message = params.message
                    response.data = params.data
                    res.status(params.statusCode)
                }
            } else {
                response.message = "Os parametros não foram enviados"
                response.data = req.body
                res.status(400)
            }
        } catch (err) {
            console.log(err)
            response.message = "Erro ao realizar seleção"
            res.status(500)
        } finally {
            console.log("resposta: " + response)
            res.send(response)
        }
    }

    async delete(req, res) {
        const response = _.clone(this.response)
        try {
            const schedulingCtrl = new SchedulingCtrl(this.dbPool)

            const idScheduling = parseInt(req.params.idScheduling)

            if (!_.isNaN(idScheduling) && idScheduling > 0) {
                const responseOfDelet = await schedulingCtrl.delete(idScheduling)

                response.message = responseOfDelet.message
                res.status(responseOfDelet.statusCode)
            }else{
                response.message = "O id do agendamento deve ser enviado"
                response.data = req.body
                res.status(404)
            }
        } catch (err) {
            console.log(err)
            response.message = "Erro ao realizar o cancelamento"
            res.status(500)
        }
         finally {
            res.send(response)
        }
    }
}

module.exports = SchedulingRouter