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
                rate: rate,
                observation: observation,
                schedulingId: schedulingId
            }
        }

        if(!raterId){
            validatedParams.isValid = false
            validatedParams.message = "O parametro do tipo Avaliação id do usuário avaliador está incorreto"
            validatedParams.statusCode = 400
        } else if(!ratedId){
            validatedParams.isValid = false
            validatedParams.message = "O parametro do tipo Avaliação id do usuário avaliado está incorreto"
            validatedParams.statusCode = 400
        } else if(rate <= 0 || rate == null){
            validatedParams.isValid = false
            validatedParams.message = "O parametro do tipo Avaliação nota da avaliação está incorreto"
            validatedParams.statusCode = 400
        } else if(!schedulingId){
            validatedParams.isValid = false
            validatedParams.message = "O parametro do tipo Avaliação do agendamento está incorreto"
            validatedParams.statusCode = 400
        }
        return validatedParams;
    }


    async avaliacao(rating){
        const response = {
            raterId,
            data: null,
            message: null,
            statusCode: 500
        }

        try{
            const ratersID = await this.rating.validateRater(rating.rateraterId, rating.ratedId, rating.schedulingId)
            if(validadeRater.isValid){
                if(ratersID >= 0 || ratersID != null){
                    const ratedUser = await this.rating.avaliar(rating.raterId, rating.ratedId, rating.rate, rating.observation, rating.schedulingId)
                    response.message = 'Usuário avaliado com sucesso'
                    response.data = ratedUser
                    response.statusCode = 200
                }else {
                    response.message = 'Usuário não encontrado.'
                    response.data = ratedUser
                    response.statusCode = 404
                }
                
                //Calculo da Média
                if(avgRate >=0 & avgRate != null){
                    const calculeAVG = await this.rating.avgRate(rating.ratedId, rating.rate)
                    response.message = 'Média atualizada com sucesso'
                    response.data = calculeAVG
                    response.statusCode = 200
                }else{
                    response.message = 'Parâmetro média incorreto.'
                        response.data = calculeAVG
                        response.statusCode = 404
                }
            }
        }catch(err){
            response.message = `Erro desconhecido ao realizar a avaliação  -> ${err.toString()}`
        }finally {
            return response
        }
    }    
}
module.exports = RatingCtrl