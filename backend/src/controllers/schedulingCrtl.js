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
    async searchEnd(userId) {
        const response = {
            data:[],
            message: null,
            statusCode: 500
        }

        try {
            const responseIsValid = await this.scheduling.validateUserId(userId) 

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

    getDefultParams(page, pageSize, idTypeScheduling, idStatusScheduling, idUser) {
        const validatedParams = {
            isValid: true,
            message: null,
            statusCode: null,
            data: {
                page: null,
                pageSize: null,
                idTypeScheduling: null,
                idStatusScheduling: null,
                idUser: null
            }
        }

        if(!page){
            validatedParams.data.page = 1
        } else {
            const numberPage = parseInt(page)
            if(!_.isNaN(numberPage)){
                validatedParams.data.page = numberPage
            } else {
                validatedParams.data.page = 1
            }
        }

        if(!pageSize){
            validatedParams.data.pageSize = 10
        } else {
            const numberPageSize = parseInt(pageSize)
            if(!_.isNaN(numberPageSize)){
                validatedParams.data.pageSize = numberPageSize
            } else {
                validatedParams.data.pageSize = 10
            }
        }

        if(!idTypeScheduling){
            validatedParams.data.idTypeScheduling = null
        } else {
            const numberIdTypeScheduling = parseInt(idTypeScheduling)
            if(!_.isNaN(numberIdTypeScheduling)){
                validatedParams.data.idTypeScheduling = numberIdTypeScheduling
            } else {
                validatedParams.data.idTypeScheduling = null
            }
        }

        if(!idStatusScheduling){
            validatedParams.data.idStatusScheduling = null
        } else {
            const numberIdStatusScheduling = parseInt(idStatusScheduling)
            if(!_.isNaN(numberIdStatusScheduling)){
                validatedParams.data.idStatusScheduling = numberIdStatusScheduling
            } else {
                validatedParams.data.idStatusScheduling = null
            }
        }

        if(!idUser){
            validatedParams.isValid = false
            validatedParams.message = "O parametro id do usuario deve ser enviado e deve ser maior que zero"
            validatedParams.statusCode = 400
        } else {
            const numberIdUser = parseInt(idUser)
            if(!_.isNaN(numberIdUser)){
                validatedParams.data.idUser = numberIdUser
            } else {
                validatedParams.isValid = false
                validatedParams.message = "O parametro id do usuario deve ser enviado e deve ser maior que zero"
                validatedParams.statusCode = 400
            }
        }

        return validatedParams
    }

    async select(filter) {
        const response = {
            data: null,
            message: null,
            statusCode: 500,
        }

        try {
            const selectedSchedules = await this.scheduling.select(
                filter.page,
                filter.pageSize,
                filter.idTypeScheduling,
                filter.idStatusScheduling,
                filter.idUser
            )
            
            response.data = selectedSchedules
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