const Moment = require('moment')

class User {
	constructor(dbPool) {
        this.dbPool = dbPool
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