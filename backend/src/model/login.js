const Moment = require('moment')

class Login {
	constructor(dbPool) {
        this.dbPool = dbPool
    }

	async validate(login,senha,tipoUsuario){
		try {
			const query = 
				`SELECT password ` + 
				`FROM logali.user ` +
				`WHERE login = '${login}' ` + 
				`AND typeUserId = ${tipoUsuario}`
				
			const resp = await this.dbPool.query(query)
            if (resp.length > 0) {
                if (resp[0].password == senha) {
                    return true;
                }
                else {
                    return 'Senha incorreta'
                }
            }
            else {
                return 'Usuário não encontrado'
            }
        } catch (err) {
            throw new Error(`Erro ao validar usuário -> ${err}`)
        }
	
	}
}

module.exports = Login