const Moment = require('moment')


class rating {
    constructor(dbPool) {
        this.dbPool = dbPool
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
                `WHERE raterId = '${raterId} ' ` +
                `AND ratedId = ${ratedId}`

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