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
        const response = {
            insertId: null,
            message: null,
            statusCode: 500
        }

        try {
            const hasSameScheduling = await this.scheduling.hasSameScheduling(scheduling.userId, scheduling.typeScheduling, scheduling.dateTime)
            if (hasSameScheduling) {
                response.message = "Já existe um agendamento do mesmo tipo para esse mesmo horário"
                response.statusCode = 406
            } else {
                const createdSchedule = await this.scheduling.create(scheduling.userId, scheduling.typeScheduling, scheduling.dateTime, scheduling.observation)
                response.insertId = createdSchedule.insertId
                response.message = createdSchedule.message
            }
        }
        catch (err) {
            response.message = `Erro desconhecido ao criar agendamento  -> ${err.toString()}`
        } finally {
            return response
        }
    }

    async getId(scheduling) {
        const response = {
            insertId: null,
            message: null,
            statusCode: 500
        }

        try {
                const createdSchedule = await this.scheduling.getId(scheduling.Id)
                response.message = createdSchedule
            }
        catch (err) {
            response.message = `Erro desconhecido ao pesquisar agendamento  -> ${err.toString()}`
        } finally {
            return response
        }
    }
    async searchEnd(scheduling) {
        const response = {
            insertId: null,
            message: null,
            statusCode: 500
        }

        try {
                const createdSchedule = await this.scheduling.searchEnd(scheduling.userId)
                response.message = createdSchedule
            }
        catch (err) {
            response.message = `Erro desconhecido ao pesquisar endereço  -> ${err.toString()}`
        } finally {
            return response
        }
    }

    async select(userId) {

        const response = {
            insertId: null,
            message: null,
            statusCode: userId === null ? 400 : 500,
        }
        try {
                const selectedSchedule = await this.scheduling.select(userId)
                response.message = selectedSchedule
                response.statusCode = 200
            }
        catch (err) {
            response.message = `Erro desconhecido ao pesquisar agendamentos  -> ${err.toString()}`
        } finally {
            return response
        }
    }

    async update(scheduling) {
        const response = {
            insertId: null,
            message: null,
            statusCode: 500
        }

        try {
            console.log("ola")    
            const createdSchedule = await this.scheduling.update(scheduling.Id, scheduling.typeScheduling, scheduling.date,  scheduling.time, scheduling.observation)
                console.log("passei aqui");
                response.insertId = createdSchedule.insertId
                response.message = createdSchedule.message
        }
        catch (err) {
            response.message = `Erro desconhecido ao criar agendamento  -> ${err.toString()}`
        } finally {
            return response
        }
    }

    
}

module.exports = SchedulingCtrl