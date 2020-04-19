const Moment = require('moment')
const _ = require("lodash")
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
    async searchEnd(userId) {
        const response = {
            data:[],
            message: null,
            statusCode: 500
        }

        try {
            const responseIsValid = await this.scheduling.validateUserId(userId) 

            console.log(responseIsValid)
            
            if(responseIsValid.isValid){  
                const address = await this.scheduling.searchEnd(responseIsValid.user.addressId)
                if(!_.isEmpty(address)) {
                    response.message = 'Endereço encontrado com sucesso'
                    response.data = address
                    response.statusCode = 200
                } else {
                    response.message = 'Endereço não encontrado.'
                    response.data = address
                    response.statusCode = 404
                }
            } else {
                response.message="O id do usuário não foi encontrado"
            }
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

    valitadeParamsUpdate(dateTime, observation, idUser, id) {
        const validatedParams = {
            isValid: null,
            message: null,
            statusCode: null,
            data: {
                dateTime: null,
                observation: observation,
                idUser: idUser, 
                id: id
            }
        }

        const momentDateTime = Moment(dateTime, "DD/MM/YYYY HH:mm:ss")
        validatedParams.data.dateTime = momentDateTime

        if (typeof dateTime === 'undefined' || !momentDateTime.isValid()) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro data e hora está incorreto"
            validatedParams.statusCode = 400
        } else if (!idUser) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro id do usuario deve ser enviados"
            validatedParams.statusCode = 400
        } else if (!id) {
            validatedParams.isValid = false
            validatedParams.message = "O parametro id do agendamento deve ser enviados"
            validatedParams.statusCode = 400
        } else {
            validatedParams.isValid = true
            validatedParams.statusCode = 200
        }

        return validatedParams
    }
    
    async update(scheduling) {
        const response = {
            message: null,
            statusCode: 500
        }

        try {
            const hasScheluding = await this.scheduling.getSchedulingByIdAndIdUser(scheduling.id, scheduling.idUser)
            console.log(hasScheluding.workerId)
            if(hasScheluding && !_.isEmpty(hasScheluding)){
                if(hasScheluding.workerId === null){
                    await this.scheduling.update(scheduling.id, scheduling.dateTime, scheduling.observation)
                    response.message = 'Agendamento editado com sucesso'
                    response.statusCode = 200
                } else {
                    response.message = 'Esse agendamento não pode mais ser alterado pois um técnico já aceitou ele'
                    response.statusCode = 400
                }
            } else {
                response.message = 'Não foi encontrado o agendamento indicado para o seu usuario'
                response.statusCode = 404
            }
        }
        catch (err) {
            response.message = `Erro desconhecido ao atualizar agendamento -> ${err.toString()}`
        } finally {
            return response
        }
    }

    async delete(idScheduling) {
        const response = {
            message: null,
            statusCode: 500
        }

        try {
            await this.scheduling.delete(idScheduling)
            response.message = "Agendamento excluido com sucesso"
            response.statusCode = 200
        }
        catch (err) {
            response.message = `Erro desconhecido ao cancelar agendamento --> ${err.toString()}`
        } finally {
            return response
        }
    }

    
}

module.exports = SchedulingCtrl