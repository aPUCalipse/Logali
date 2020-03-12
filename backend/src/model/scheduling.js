const Moment = require('moment')

class Scheduling {
    constructor(dbPool) {
        this.dbPool = dbPool
    }

    async create(userId, typeScheduling, dateTime, observation) {
        try {
            const query =
                `INSERT INTO logali.scheduling ` +
                `(userId, typeSchedulingId, statusSchedulingId, dateTime, observation, createdAt) VALUES ` +
                `(
                '${userId}', 
                '${typeScheduling}', 
                '1', 
                '${dateTime.format("YYYY-MM-DD HH:mm:ss")}', 
                '${observation}', 
                '${Moment().format("YYYY-MM-DD HH:mm:ss")}'
            )`

            const resp = await this.dbPool.query(query)
            return resp
        } catch (err) {
            throw new Error(`Erro ao inserir agendamento -> ${err}`)
        }
    }

    async hasSameScheduling(userId, typeScheduling, dateTime) {
        try {
            const query =
                `SELECT 1 ` +
                `FROM logali.scheduling ` +
                `WHERE 1=1 ` +
                `AND userId = '${userId}' ` +
                `AND typeSchedulingId = '${typeScheduling}' ` +
                `AND dateTime = '${dateTime.format("YYYY-MM-DD HH:mm:ss")}'`

            const resp = await this.dbPool.query(query)
            return resp.pop()
        } catch (err) {
            throw new Error(`Erro na validação de agendamento -> ${err}`)
        }
    }
}

module.exports = Scheduling