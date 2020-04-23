const Moment = require('moment')

class Login {
	constructor(dbPool) {
        this.dbPool = dbPool
    }

	async validate(login,senha,tipoUsuario){
		const resp = {
            message: null,
            idUser: 0
        }
        try {
			const query = 
				`SELECT id, password ` + 
				`FROM logali.user ` +
				`WHERE login = '${login}' ` + 
				`AND typeUserId = ${tipoUsuario}`
				
			const qry = await this.dbPool.query(query)
            if (qry.length > 0) {
                if (qry[0].password == senha) {
                    resp.message = true;
                    resp.idUser = qry[0].id;
                }
                else {
                    resp.message = 'Senha incorreta'
                }
            }
            else {
                resp.message = 'Usuário não encontrado'
            }
            return resp
        } catch (err) {
            throw new Error(`Erro ao validar usuário -> ${err}`)
        }
	
	}
}

module.exports = Login