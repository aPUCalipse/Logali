const Moment = require('moment')


class rating {
    constructor(dbPool) {
        this.dbPool = dbPool
    }



    avgRate(ratedId, rate) {
        try {
            const update = `UPDATE logali.user ` +
                `SET rateAVG = ( (rateAVG + ${rate}) / 2) ` +
                `WHERE id = '${ratedId}' `

            console.log(update)

            const resp = await this.dbPool.query(update)

            if (resp && resp.affectedRows >= 1) {
                console.log(resp)
                return resp
            } else {
                throw new Error(`O id Enviado não existe no banco`)
            }
        } catch (err) {
            throw new Error(`Erro ao atualizar a média -> ${err}`)
        }
    }


    validateRater(raterId, ratedId, schedulingId) {
        const response = {
            isValid: false,
            rating: ''
        }
        try {
            const searchRateQuery = `SELECT ` +
                `raterId, ratedId, schedulingId ` +
                `FROM logali.rating ` +
                `WHERE raterId = '${raterId}' ` +
                `AND ratedId = '${ratedId}' ` +
                `AND schedulingId = '${schedulingId}' `

            const searchRate = await this.dbPool.query(searchRateQuery)
            if (searchRate.length > 0) {
                const searchAlreadyRaterQuery = `SELECT ` +
                    `rate ` +
                    `FROM logali.rating ` +
                    `WHERE raterId = '${raterId}' ` +
                    `AND ratedId = '${ratedId}' ` +
                    `AND schedulingId = '${schedulingId}' `

                    const searchRateAlready = await this.dbPool.query(searchAlreadyRaterQuery)    
                if (searchRateAlready.length > 0) {
                    throw new Error(`Usuário já avaliado -> ${searchAlreadyRater.message}`)
                } else {
                     response.isValid = true
                     response.rate = searchRate.pop()
                    return response
                }
            }
            return response
        } catch (err) {
            throw new Error(`Erro ao pesquisar avaliador -> ${err}`)
        }
    }

    async avaliar(raterId, ratedId, schedulingId, rate, observation) {
        try {
            const query =
                `INSERT INTO logali.rating ` +
                `(raterId, ratedId, schedulingId, rate, observation, createdAt) VALUES ` +
                `( +
                '${raterId} ', 
                '${ratedId} ', 
                '${schedulingId} ',
                '${rate} ',
                '${observation} ', 
                '${Moment().format("YYYY-MM-DD HH:mm:ss")}'
            )`
            const resp = await this.dbPool.query(query)
            return resp
        } catch (err) {
            throw new Error(`Erro ao inserir avaliação -> ${err}`)
        }

    }
}