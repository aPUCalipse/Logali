const Moment = require('moment')
const Rating = require('../model/rating')

class RatingCtrl {
    constructor(dbPool) {
        this.rating = new Rating(dbPool)
    }

    valitadeParamsRating(raterId, ratedId, rate, observation, schedulingId ) {

        const validatedParams = {
            isValid: null,
            message: null,
            statusCode: null,
            data: {
                raterId: raterId,
                ratedId: ratedId,
                schedulingId: schedulingId,
                rate: rate,
                observation: observation
            }
        }

        if(!raterId){
            validatedParams.isValid = false
            validatedParams.message = "O parametro id do usuário avaliador está incorreto"
            validatedParams.statusCode = 400
        } else if(!ratedId){
            validatedParams.isValid = false
            validatedParams.message = "O parametro id do usuário avaliado está incorreto"
            validatedParams.statusCode = 400
        } else if(rate < 0 || rate == null){
            validatedParams.isValid = false
            validatedParams.message = "O parametro nota da avaliação está incorreto"
            validatedParams.statusCode = 400
        } else if(rate < 0 || rate > 5){
            validatedParams.isValid = false
            validatedParams.message = "O parametro nota da avaliação deve estar entre 0 e 5"
            validatedParams.statusCode = 400
        } else if(!schedulingId){
            validatedParams.isValid = false
            validatedParams.message = "O parametro do id agendamento está incorreto"
            validatedParams.statusCode = 400
        } else {
            validatedParams.isValid = true
            validatedParams.statusCode = 200
        }
        return validatedParams;
    }


    async avaliacao(rating){
        const response = {
            data: {},
            message: null,
            statusCode: 500
        }

        try{
            const ratersID = await this.rating.validateRater(
                rating.data.raterId,
                rating.data.ratedId,
                rating.data.schedulingId
            )
            
            if(ratersID && ratersID.isValid){
                let historyQtd = await this.rating.getHistoryQtd(rating.data.ratedId)

                await this.rating.avaliar(
                    rating.data.raterId,
                    rating.data.ratedId,
                    rating.data.schedulingId,
                    rating.data.rate,
                    rating.data.observation
                )

                response.message = 'Usuário avaliado com sucesso'
                response.statusCode = 200                

                let getAVG = await this.rating.getAvgRate(rating.data.ratedId)

                let newRate = null

                if(historyQtd && historyQtd.length !== 0){
                    newRate = (getAVG.rateAVG + rating.data.rate) / 2
                } else {
                    newRate = rating.data.rate
                }

                await this.rating.avgRate(
                    rating.data.ratedId,
                    newRate
                );
            }
        }catch(err){
            response.message = `Erro desconhecido ao realizar a avaliação  -> ${err.toString()}`
        }finally {
            return response
        }
     }    
}
module.exports = RatingCtrl