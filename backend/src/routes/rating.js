const _ = require('lodash')
const RatingCtrl = require("../controllers/ratingCtrl")
const baseModuleRoute = "/rating"

class RatingRouter {
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
        this.app.post(`${this.baseRoute}/avaliar`, this.avaliar.bind(this))
    }


    async avaliar(req, res) {

        const response = _.clone(this.response)

        try {
            const ratingCtrl = new RatingCtrl(this.dbPool)

            if (!_.isEmpty(req.body)) {
                const validatedParams = ratingCtrl.valitadeParamsRating(
                    req.body.raterId,
                    req.body.ratedId,
                    req.body.rate,
                    req.body.observation,
                    req.body.schedulingId
                )

                 

                if(validatedParams && validatedParams.isValid) {
                    
                    const resp = await ratingCtrl.avaliacao(validatedParams)
                    response.message = resp.message
                    response.data = resp.data
                    
                   
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
            response.message = "Erro ao realizar avaliação " + err
            res.status(500)
        } finally {
            console.log("resposta: " + response)
            res.send(response)
        }
    }
}

module.exports = RatingRouter