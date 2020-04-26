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
        }else {
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
                
                if(ratersID >= 0 || ratersID != null){

                    const ratedUser = await this.rating.avaliar(
                        rating.data.raterId,
                        rating.data.ratedId,
                        rating.data.schedulingId,
                        rating.data.rate,
                        rating.data.observation
                        )

                    response.message = 'Usuário avaliado com sucesso'
                    response.data = ratedUser
                    response.statusCode = 200
                }else {
                    response.message = 'Usuário não encontrado.'
                    response.data = ratedUser
                    response.statusCode = 404
                }
                

                //---> CALCULO DA MÉDIA <---

                //pega média atual
                var getAVG = await this.rating.getAvgRate(rating.data.ratedId)
              
                //Se o usuário já estiver sido avaliado antes
                var calculeAVG =null;
                if(getAVG > 0 && getAVG != null)
                {
                    calculeAVG = await this.rating.avgRate(
                        rating.data.ratedId,
                        rating.data.rate
                        );
                        
                    response.message = 'Média atualizada com sucesso'
                    response.data = calculeAVG
                    response.statusCode = 200
                }
                else{
                    response.message = 'Parâmetro média incorreto.'
                    response.data = calculeAVG
                    response.statusCode = 404
                }


                //Se for a primeira avaliação do usuário 
                var  calculeFisrtAVG = null;
                if(getAVG == 0){
                    calculeFisrtAVG = await this.rating.fisrtAVG(
                        rating.data.ratedId,
                        rating.data.rate
                    )
                    response.message = "Usuário avaliado com sucesso"
                    response.data = calculeFisrtAVG
                    response.statusCode = 200
                }else{
                    response.message = 'Parâmetro média incorreto.'
                    response.data = calculeFisrtAVG
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