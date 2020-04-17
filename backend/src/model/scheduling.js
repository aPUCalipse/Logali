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

    async delete(userId){
        try{
            const query =  `DELETE FROM logali.scheduling WHERE userId = ${userId}`
            
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
        id='1'
        try {
            const query =
                `UPDATE logali.scheduling ` +
                `SET typeSchedulingId= '${typeSchedulingId}',` + 
                `date = '${date}', ` +
                `time = '${time}', ` +
                `observation = '${observation}' ` +
                `WHERE id = '${id}' `
            console.log(query);
            const resp = await this.dbPool.query(query)
            console.log(resp)
            return resp
        } catch (err) {
            throw new Error(`Erro ao editar agendamento -> ${err}`)
        }
    }

    async searchEnd(userId){
        try {
            userId = '1';
            const address_idQuery =
                `SELECT * FROM logali.user WHERE id = '${userId}' ` 
            const resposte = await this.dbPool.query(address_idQuery)
            const teste = resposte.address_id
            console.log(resposte)
            const query = `SELECT * FROM logali.address WHERE id = '${teste}' `
            console.log(query);
            const resp = await this.dbPool.query(query)
            console.log(resp);
            return resp
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

    async select(userId){
        userId=1
        try {
            const query = `SELECT * FROM logali.scheduling WHERE 1=1 AND userId = '${userId}'`
            const resp = await this.dbPool.query(query)
            return resp;
        } catch (err) {
            throw new Error(`Erro ao selecionar agendamentos -> ${err}`)
        }
    }
}

module.exports = Scheduling