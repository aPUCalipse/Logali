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

    async getId(id) {
        const response = {
            message: null,
            scheduling: {},
            statusCode: 500
        }

        try {
            const scheduling = await this.scheduling.getId(id)
            if(scheduling && typeof scheduling !== undefined){
                response.scheduling = scheduling
                response.statusCode = 200
            } else {
                response.statusCode = 404
                response.message = `Erro desconhecido ao pesquisar agendamento  -> Agendamento de id ${id} não encontrado em nossa base`
            }
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

    async selectSchedulesFromUser(userId) {
        const response = {
            insertId: null,
            message: null,
            statusCode: 500
        }
        try {
                const createdSchedule = await this.scheduling.selectSchedulesFromUser(userId)
                response.message = createdSchedule
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