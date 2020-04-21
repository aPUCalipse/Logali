const Moment = require('moment')


class rating {
    constructor(dbPool) {
        this.dbPool = dbPool
    }



    validateAVG(raterId, ratedId, rate) {
        const response = {
            isValid: false,
            rating: ''
        }
        try {
            const searchRateUserQuery = `SELECT ` +
                `raterId, ratedId, rate` +
                `FROM logali.rating ` +
                `WHERE raterId = '${raterId}' ` +
                `AND ratedId = '${ratedId}' ` +
                `AND rate = '${rate}' `

            const searchQuery = await this.dbPool.query(searchRateUserQuery)
            if (searchRateUserQuery.length > 0) {
                response.isValid = true
                response.rating = searchQuery.pop()
                //response.rate = searchQuery.pop()
            }
            return response
        } catch (err) {
            throw new Error(`Erro ao calcular a média -> ${err}`)
        }
    }

    avgRate(raterId, ratedId, rate){
        try{
            //---------------------------------------------------------//

            //Já está com a nota Avaliada passada como parâmetro

            // //busca no database a nota avaliada
            // const query = `SELECT ` +
            // `rate ` +
            // `FROM logali.rating ` +
            // `WHERE  raterId = '${raterId}' ` +
            // `AND ratedId = '${ratedId}`

            //---------------------------------------------------------//


            //armazena a nota recebida na variavel
            const storageRate = rate;
            
            console.log(storageRate)

            //busca no database a nota atual do usuario que foi avaliado
            const userQuery = `SELECT ` +
            `rateAVG ` +
            `FROM logali.user ` +
            `WHERE  id = '${ratedId}' `

            console.log(userQuery)

            //calcula a média
            storageRate = ( (StorageRate + userQuery) / 2 )  

            console.log(storageRate)

            const update = `UPDATE logali.user ` +
            `SET ` +
            `rateAVG = '${storageRate}' ` +
            `WHERE id = '${ratedId}' `
            
            console.log(update) 

            const resp = await this.dbPool.query(update)

            if(resp && resp.affectedRows >= 1){
                console.log(resp)
                return resp
            }else{
                throw new Error(`O id Enviado não existe no banco`)
            }
        }catch(err){
            throw new Error(`Erro ao atualizar a média -> ${err}`)
        }
    }


validateRater(raterId, ratedId) {
    const response = {
        isValid: false,
        rating: ''
    }
    try {
        const searchRateQuery = `SELECT ` +
            `raterId, ratedId ` +
            `FROM logali.rating ` +
            `WHERE raterId = '${raterId}' ` +
            `AND ratedId = '${ratedId}' `

        const searchRate = await this.dbPool.query(searchRateQuery)
        if (searchRateQuery.length > 0) {
            response.isValid = true
            response.rate = searchRate.pop()
        }
        return response
    } catch (err) {
        throw new Error(`Erro ao pesquisar avaliador -> ${err}`)
    }
}

async rate(raterId, ratedId, rate, observation, schedulingId) {
    try {
        const query =
            `INSERT INTO logali.rating ` +
            `(raterId, ratedId, rate, observation, schedulingId) VALUES ` +
            `( +
                '${raterId} ', 
                '${ratedId} ', 
                '${rate} ', 
                '${observation} ', 
                '${schedulingId} ' 
            )`
        const resp = await this.dbPool.query(query)
        return resp
    } catch (err) {
        throw new Error(`Erro ao inserir avaliação -> ${err}`)
    }

}
}