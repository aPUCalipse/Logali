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
        try {
            const query = `` +
                    `SELECT ` +

                    //dados do cliente
                    `s.userId 'idClient', ` +
                    `uc.name 'clientName', ` +

                    //dados do endereço do cliente
                    `ad.geoLocX,  ` +
                    `ad.geoLocY,  ` +
                    `ad.zipCode,  ` +
                    `ad.number,  ` +
                    `ad.street,  ` +
                    `ad.complement,  ` +
                    `ad.neighborhood,  ` +
                    `ad.city,  ` +
                    `ad.state, ` +

                    //dados do tipo de agendamento
                    `s.typeSchedulingId, ` +
                    `ts.name 'nametypeSchedulig', ` +

                    //dados do status do agedamento
                    `s.statusSchedulingId, ` +
                    `ss.name 'nameStatusScheduling', ` +

                    //dados do técnico
                    `s.workerId 'idWorker', ` +
                    `uw.name 'workerName', ` +

                    //dados do agendamento
                    `s.id 'schedulingId', ` +
                    `s.\`dateTime\`, ` +
                    `s.observation, ` +
                    `s.createdAt ` +
                `FROM logali.scheduling s ` +
                
                //join para coletar dados do cliente
                `join logali.user uc ` +
                `on uc.id = s.userId ` +
                
                //join para coletar dados do técnico se existir
                `left join logali.user uw ` +
                `on uw.id = s.workerId ` +
                
                //join para coletar dados do status do agendamento
                `join logali.statusscheduling ss ` +
                `on ss.id = s.statusSchedulingId ` +
                
                //join para coletar dados do tipo do agendamento
                `join logali.typescheduling ts ` +
                `on ts.id = s.typeSchedulingId ` +
                
                //join para coletar dados do endereço do cliente
                `join logali.address ad ` +
                `on ad.id = uc.addressId ` +
                
                `where s.id = ${id}`
          
            const resp = await this.dbPool.query(query);
           
            return resp.pop()
        } catch (err) {
            console.log(err)
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