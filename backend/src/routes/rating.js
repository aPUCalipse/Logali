const _ = require('lodash')
const RatingCtrl = require("../controllers/ratingCtrl")
const baseModuleRoute = "/avaliar"

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

    init(){
        this.app.post(`${this.baseRoute}/rate`, this.rate.bind(this))
    }


    async rate(req, res){
        const response = _.clone(this.response)

        try{
            const ratingCtrl = new RatingCtrl(this.dbPool)

            if(!_.isEmpty(req.body)){
                const validatedParams = ratingCtrl.valitadeParamsRating(
                    raterId, 
                    ratedId, 
                    rate, 
                    observation, 
                    schedulingId 
                )
                
                if(validatedParams && validatedParams.isEmpty){
                    const resp = await ratingCtrl.rating(validatedParams.data)

                    response.message = "Avaliação realizada com sucesso"
                    response.data = resp
                    res.status(200)
                }else {
                    response.message = params.message
                    response.data = params.data
                    res.status(params.statusCode)
                }
            }else {
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