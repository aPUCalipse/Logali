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

    async getSimplifyedById(id){
        try {
            const query = `` +
                `SELECT *   ` +
                `FROM logali.scheduling s ` +
                `where s.id = ${id}`
          
            const resp = await this.dbPool.query(query);
           
            return resp.pop()
        } catch (err) {
            console.log(err)
            throw new Error(`Erro ao pesquisar agendamento -> ${err}`)
        }
    }

    async cancelAcept(id){
        try {
            const query = `` +
                `UPDATE logali.scheduling ` +
                `SET workerId = null ` +
                `where id = ${id}`
          
            const resp = await this.dbPool.query(query);
           
            return resp
        } catch (err) {
            console.log(err)
            throw new Error(`Erro ao pesquisar agendamento -> ${err}`)
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
            const resp = await this.dbPool.query(query)
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

    async updateWorkerId(WorkerId, id) {
        try {
            const query =
                `UPDATE logali.scheduling ` +
                `SET ` +
                    `WorkerId = '${WorkerId}' ` +
                `WHERE id = '${id}' `          

                console.log(query)

            const resp = await this.dbPool.query(query)
            
            if(resp && resp.affectedRows >= 1){
                return resp
            } else {
                throw new Error(`Não foi possível atualizar o agendamento. Provavelmente ele foi excluído ou não existe.`)
            }
        } catch (err) {
            throw new Error(`Erro ao atualizar agendamento -> ${err}`)
        }
    }
}

module.exports = Scheduling