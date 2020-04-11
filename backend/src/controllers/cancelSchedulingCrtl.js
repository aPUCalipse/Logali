const Moment = require('moment')
const Scheduling = require('../model/scheduling')

class cancelScheduling {
    construtor(dbPoll){
        this.cancelScheduling = new cancelScheduling(dbPool)
    }


    async delete(scheduling){
        const response = {
            insertId = null,
            message: null,
            statusCode: 500
        }

        try{
            const cancelSchedule = await this.scheduling.delete(scheduling.userId)
            response.deleteId = cancelSchedule.deleteId
            response.message = cancelSchedule.message
        }
        catch (err) {
            response.message = `Erro desconhecido ao cancelar agendamento --> ${err.toString()}`
        }finally {
            return response
        }
    }
}

module.exports = cancelScheduling