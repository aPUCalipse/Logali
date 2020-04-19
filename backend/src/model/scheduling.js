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

    async delete(idScheduling){
        try{
            const query =  `DELETE ` +
            `FROM logali.scheduling ` +
            `where id = '${idScheduling}' `


            const resp = await this.dbPool.query(query)
            if(resp && resp.affectedRows >= 1){
                return resp
            } else {
                throw new Error(`O id Enviado não existe no banco`)
            }
        } catch(err) {
            console.log(err)
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

    async getSchedulingByIdAndIdUser(id, idUser) {
        try {
            const query =
                `SELECT `+
                    `workerId ` +
                `FROM logali.scheduling ` +
                `WHERE 1=1 ` +
                `AND id = '${id}' ` +
                `AND userId = '${idUser}'`
          
            const resp = await this.dbPool.query(query)

            return resp.pop()
        } catch (err) {
            throw new Error(`Erro ao atualizar agendamento -> ${err}`)
        }
    }
    
    async update(id, dateTime, observation) {
        try {
            const query =
                `UPDATE logali.scheduling ` +
                `SET ` +
                    `dateTime = '${dateTime.format("YYYY-MM-DD HH:mm:ss")}' ` +
                    ((observation) ? `, observation = '${observation}' ` : ` `)+
                `WHERE id = '${id}' `          

                console.log(query)

            const resp = await this.dbPool.query(query)
            
            if(resp && resp.affectedRows >= 1){
                return resp
            } else {
                throw new Error(`O id Enviado não existe no banco`)
            }
        } catch (err) {
            throw new Error(`Erro ao atualizar agendamento -> ${err}`)
        }
    }

    async validateUserId(userId){
        const response = {
            isValid: false, 
            user:''
        }

        try {   
            const searchUserQuery = `SELECT * FROM logali.user WHERE id = '${userId}' ` 

            const searchUser = await this.dbPool.query(searchUserQuery)
            
            if(searchUser.length > 0){
                response.isValid = true
                response.user = searchUser.pop()
            }

            return response
        } catch (err) {
            throw new Error(`Erro ao pesquisar endereço -> ${err}`)
        }
    }
    
    async searchEnd(addressId){
        try {
            const queryAddress = `SELECT * FROM logali.address WHERE id = '${addressId}' `
            const address = await this.dbPool.query(queryAddress)

            return address.pop()
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

    async select(page, pageSize, idTypeScheduling, idStatusScheduling, idUser){
        try {
            let query = `` +
                    `SELECT ` +

                    `s.userId 'idClient', ` +
                    `uc.name 'clientName', ` +

                    `s.typeSchedulingId, ` +
                    `ts.name 'nametypeSchedulig', ` +

                    `s.statusSchedulingId, ` +
                    `ss.name 'nameStatusScheduling', ` +

                    `s.workerId 'idWorker', ` +
                    `uw.name 'workerName', ` +

                    `s.id 'schedulingId', ` +
                    `s.\`dateTime\`, ` +
                    `s.observation, ` +
                    `s.createdAt ` +
                    `FROM logali.scheduling s ` +
                
                    `join logali.user uc ` +
                    `on uc.id = s.userId ` +
                
                    `left join logali.user uw ` +
                    `on uw.id = s.workerId ` +
                
                    `join logali.statusscheduling ss ` +
                    `on ss.id = s.statusSchedulingId ` +
                
                    `join logali.typescheduling ts ` +
                    `on ts.id = s.typeSchedulingId ` +
                
                    `join logali.address ad ` +
                    `on ad.id = uc.addressId ` +
                
                    `where 1=1 `+
                    `and uc.id = ${idUser} `

                    if(idTypeScheduling){
                        query += `and s.typeSchedulingId = ${idTypeScheduling} `
                    }

                    if(idStatusScheduling){
                        query += `and s.statusSchedulingId = ${idStatusScheduling} `
                    }

                    query += `limit ${this.getPageByPaginatio(page, pageSize)}`

                console.log(query)

            const resp = await this.dbPool.query(query)

            // console.log(resp)
            console.log(resp.length)

            return resp;
        } catch (err) {
            throw new Error(`Erro ao selecionar agendamentos -> ${err}`)
        }
    }

    getPageByPaginatio(page, pageSize){
        const init = (page*pageSize)-pageSize
        const end = pageSize

        return `${init},${end}`
        
    }
}

module.exports = Scheduling