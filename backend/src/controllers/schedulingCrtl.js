const Moment = require('moment')
const Scheduling = require('../model/scheduling')

class SchedulingCtrl {
    constructor(dbPool) {
        this.scheduling = new Scheduling(dbPool)
    }

    valitadeParamsCreate(userId, typeScheduling, dateTime, observation) {
        const validatedParams = {
            isValid: null,
            message: null,
            statusCode: null,
            data: {
                userId: userId,
                typeScheduling: typeScheduling,
                dateTime: null,
                observation: observation
            }
        }

        const momentDateTime = Moment(dateTime, "DD/MM/YYYY HH:mm:ss")
        validatedParams.data.dateTime = momentDateTime

        if (!userId) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro usuario está incorreto"
            validatedParams.statusCode = 400
        } else if (!typeScheduling) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro tipo de agendamento está incorreto"
            validatedParams.statusCode = 400
        } else if (!momentDateTime.isValid()) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro data está incorreto"
            validatedParams.statusCode = 400
        } else {
            validatedParams.isValid = true
            validatedParams.statusCode = 200
        }

        return validatedParams
    }

    async create(scheduling) {
        return await this.scheduling.create(scheduling.userId, scheduling.typeScheduling, scheduling.dateTime, scheduling.observation)
    }
}

module.exports = SchedulingCtrl