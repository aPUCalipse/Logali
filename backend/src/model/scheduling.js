const Moment = require('moment')

class Scheduling {
    constructor(dbPool) {
        this.dbPool = dbPool
    }

    async create(userId, typeScheduling, dateTime, observation) {
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
    }
}

module.exports = Scheduling