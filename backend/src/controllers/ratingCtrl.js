const Moment = require('moment')
const Rating = require('../model/rating')

class Rating {
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
            validatedParams.message = "O parametro raterId está incorreto"
            validatedParams.statusCode = 400
        } else if(!ratedId){
            validatedParams.isValid = false
            validatedParams.message = "O parametro ratedId está incorreto"
            validatedParams.statusCode = 400
        } else if(rate <= 0 || rate == null){
            validatedParams.isValid = false
            validatedParams.message = "O parametro rate está incorreto"
            validatedParams.statusCode = 400
        } else if(!schedulingId){
            validatedParams.isValid = false
            validatedParams.message = "O parametro schedulingId está incorreto"
            validatedParams.statusCode = 400
        }
        return validatedParams;
    }


    async rating(rating){
        const response = {
            raterId,
            data: null,
            message: null,
            statusCode: 500
        }

        try{
            const ratersID = await this.rating.validateRater(rateraterId, ratedId)
            if(validadeRater.isValid){
                if(ratersID >= 0 || ratersID != null){
                    const ratedUser = await this.rating.rate(raterId, ratedId, rate, observation, schedulingId)
                    response.message = 'Usuário avaliado com sucesso'
                    response.data = ratersID
                    response.statusCode = 200
                }else {
                    response.message = 'Usuário não encontrado.'
                    response.data = ratersID
                    response.statusCode = 404
                }
            }

            //Calculo da Média
            const avgRate = await this.rating.validateAVG(raterId,ratedId, rate)
            if(avgRate >=0 & avgRate != null){
                const calculeAVG = await this.rating.avgRate(raterId, ratedId, rate)
                response.message = 'Média atualizada com sucesso'
                response.data = calculeAVG
                response.statusCode = 200
            }else{
                response.message = 'Parâmetro média incorreto.'
                    response.data = calculeAVG
                    response.statusCode = 404
            }

        }catch(err){
            response.message = `Erro desconhecido ao realizar a avaliação  -> ${err.toString()}`
        }finally {
            return response
        }
    }    
}
module.exports = RatingCtrl