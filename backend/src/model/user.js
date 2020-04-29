const Moment = require('moment')

class User {
	constructor(dbPool) {
        this.dbPool = dbPool
    }

    async getById(id){
        try {
            const query = 
            `SELECT 
                u.id 'idUser',
                u.name 'userName',
                u.login,
                u.password,
                u.rateAVG,
                u.addressId,
                a.geoLocX,
                a.geoLocY,
                a.zipCode,
                a.number,
                a.street,
                a.complement,
                a.neighborhood,
                a.city,
                a.state,
                u.typeUserId,
                t.name 'typeUser'

            FROM logali.user u

                JOIN
                    logali.address a ON a.id = u.addressId

                JOIN
                   logali.typeuser t ON u.typeUserId = t.id

            where u.id = ${id}`
          
            const resp = await this.dbPool.query(query);
           
            return resp.pop()
        } catch (err) {
            console.log(err)
            throw new Error(`Erro ao pesquisar usuario -> ${err}`)
        }
    }
    async selectUser(id){
		const resp = {
            message: null,
            idUser: 0
        }
        try {
			const query = 
				`SELECT name, id` + 
				`FROM logali.user ` +
				`WHERE id = '${id}' `
				
			const qry = await this.dbPool.query(query)
            if (qry.length > 0) {
                    resp.message = true;
                }
                else {
                    resp.message = 'Usuário inexistente'
            }
            return resp
        } catch (err) {
            throw new Error(`Erro ao pesquisar usuário -> ${err}`)
        }
	
	}

}

module.exports = User;