const Moment = require('moment')


class Rating {
    constructor(dbPool) {
        this.dbPool = dbPool
    }

    async getAvgRate(ratedId){
        try{
            const select = `SELECT rateAVG ` +
            `FROM logali.user ` +
            `WHERE id = '${ratedId}' `

            const resp = await this.dbPool.query(select)

            if(resp >=0 && avgRate != null){
                console.log(resp)
                return resp
            } else{
                return 0;
            }
        }catch(err){
            throw new Error(`Erro ao selecionar a média do usuário -> ${err}`)
        }
        
    }

    async avgRate(ratedId, rate) {
        try {

            const update = `UPDATE logali.user ` +
                `SET rateAVG = ( (rateAVG + '${rate}' ) / 2) ` +
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




    async fisrtAVG(ratedId, rate) {
        try {
            const update = `UPDATE logali.user ` +
                `SET rateAVG = '${rate}' ` +
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






    async validateRater(raterId, ratedId, schedulingId) {
        const response = {
            isValid: false,
            rating: '',
            data: []
        }
        try {
            const searchRateQuery = `SELECT ` +
                `raterId, ratedId, schedulingId ` +
                `FROM logali.rating ` +
                `WHERE raterId = '${raterId}' ` +
                `AND ratedId = '${ratedId}' ` +
                `AND schedulingId = '${schedulingId}' `

            const searchRate = await this.dbPool.query(searchRateQuery)

            if(searchRate.length > 0){
                throw new Error(`Usuário já avaliado -> ${searchRateAlready.message}`)
            }else{
                response.isValid = true
                response.rate = searchRate.pop()
                return response
            }
        } catch (err) {
            throw new Error(`Erro ao pesquisar avaliador -> ${err}`)
        }
    }

    async avaliar(raterId, ratedId, schedulingId, rate, observation) {
        try {

            const query =
                `INSERT INTO logali.rating ` +
                `(raterId, ratedId, schedulingId, rate, observation, createdAt) VALUES ` +
                `(
                '${raterId}', 
                '${ratedId}', 
                '${schedulingId}',
                '${rate}',
                '${observation}', 
                '${Moment().format("YYYY-MM-DD HH:mm:ss")}' 
            )`
            const resp = await this.dbPool.query(query)
            return resp
        } catch (err) {
            throw new Error(`Erro ao inserir avaliação -> ${err}`)
        }

    }
}

module.exports = Rating