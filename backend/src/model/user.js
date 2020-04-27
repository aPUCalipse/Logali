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

}

module.exports = User