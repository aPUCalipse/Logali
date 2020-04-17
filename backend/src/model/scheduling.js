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

    async delete(iD){
        try{
            const query =  `DELETE scheduling ` +
            `FROM logali.scheduling ` +
            `WHERE user.iD = userID ` +
            `AND sheduling.iD = '${iD}' `

            const resp = await this.dbPool.query(query)
            return resp
        } catch(err) {
            throw new Error(`Erro excluir agendamento -> ${err}`)
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

    async update(id, typeSchedulingId, date, time, observation) {
        
        try {
            const query =
                `UPDATE logali.scheduling ` +
                `SET typeSchedulingId= '${typeSchedulingId}',` + 
                `date = '${date}', ` +
                `time = '${time}', ` +
                `observation = '${observation}' ` +
                `WHERE id = '${id}' `
           

            const queryVerification =
                `SELECT workerId ` +
                `FROM logali.scheduling` +
                `WHERE id = '${id}' `
          

            if(workerId != null || id != 0){
                
                const resp = await this.dbPool.query(query)
                console.log(resp)
                return resp
            }else{
                return new Error(`Agendamento já aceito -> ${err}`)
            }
        } catch (err) {
            throw new Error(`Erro ao atualizar agendamento -> ${err}`)
        }
    }

    async validateUserId(userId){
        const response = [{isValid:false, user:''} ]
        try {
            const searchUserQuery = `SELECT * FROM logali.user WHERE id = '${userId}' ` 
            const searchUser = await this.dbPool.query(searchUserQuery)
            if(searchUser != '' && searchUser!= 'undefined'){
                response.isValid = true
                response.user = searchUser
            }
            console.log(response)
            return response
        } catch (err) {
            throw new Error(`Erro ao pesquisar endereço -> ${err}`)
        }
    }
    async searchEnd(addressId){
        try {
            const queryAddress = `SELECT * FROM logali.address WHERE id = '${addressId}' `
            const address = await this.dbPool.query(queryAddress)
            return address
        } catch (err) {
            throw new Error(`Erro ao pesquisar endereço -> ${err}`)
        }
    }

    async getId(id){
        id=0
        try {
            const query = `SELECT * FROM logali.scheduling WHERE id = '${id}' `
            const typeSchedulingId = query.typeSchedulingId
           
          
            const resp = await this.dbPool.query(query);
            
            const typeSchedulingQuery = `SELECT name FROM logali.typescheduling WHERE id = '${resp.typeSchedulingId}' `
            const typeScheduling = await this.dbPool.query(typeSchedulingQuery);
            resp.typeSchedulingId = typeScheduling;
            console.log(resp.RowDataPacket);
           
            return resp
        } catch (err) {
            throw new Error(`Erro ao pesquisar agendamento -> ${err}`)
        }
    }

    async selectSchedulesFromUser(userId){
        try {
            const query =
                `SELECT * ` +
                `FROM logali.scheduling ` +
                `WHERE 1=1 ` +
                `AND userId = '${userId}'`

            const resp = await this.dbPool.query(query)
            resp
        } catch (err) {
            throw new Error(`Erro ao selecionar agendamentos -> ${err}`)
        }
    }
}

module.exports = Scheduling