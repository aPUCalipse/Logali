const Moment = require('moment')

class Login {
	constructor(dbPool) {
        this.dbPool = dbPool
    }

	async validate(login,senha,tipoUsuario){
		try {
			const query = 
				`SELECT senha ` + 
				`FROM logali.user ` +
				`WHERE login = '${login}' ` + 
				`AND typeUser = ${tipoUsuario}`
				
			const resp = await this.dbPool.query(query)
            console.log(resp);
			return resp === ${senha}
        } catch (err) {
            throw new Error(`Erro ao validar usuário -> ${err}`)
        }
	
	}
}

module.exports = Login