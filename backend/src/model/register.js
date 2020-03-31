const Moment = require('moment')

class Register {
    constructor(dbPool) {
        this.dbPool = dbPool
    }

    async create(nome,login, senha, tipoUsuario, estado, cidade ,bairro, rua, cep, numero, complemento) {
        try {
            var address_id = null
            if(tipoUsuario == 'cliente'){
                const qryAddress =
                `INSERT INTO logali.address ` +
                `(Estado, Cidade, Bairro, Rua, CEP, Numero, Complemento, CreatedAt) VALUES ` +
                `(
                '${estado}', 
                '${cidade}', 
                '${bairro}', 
                '${rua}', 
                '${cep}',
                ${numero},
                '${complemento}',
                '${dateTime.format("YYYY-MM-DD HH:mm:ss")}'
            )`
            const addressResp = await this.dbPool.query(qryAddress)
            
            const qrySelAddress = 
            `SELECT MAX(id) `+
            `FROM logali.address`

            const idresp = await this.dbPool.query(qrySelAddress)
            address_id = idresp.pop()
        }
            
            const query =
                `INSERT INTO logali.user ` +
                `(name,login, password, createdAt, address_id) VALUES ` +
                `(
                '${nome}', 
                '${login}', 
                '${senha}', 
                '${dateTime.format("YYYY-MM-DD HH:mm:ss")}', 
                ${address_id}
            )`

            const resp = await this.dbPool.query(query)
            return resp
        } catch (err) {
            throw new Error(`Erro ao inserir usuário -> ${err}`)
        }
    }

    async hasSameLogin(login) {
        try {
            const query =
                `SELECT login ` +
                `FROM logali.user ` +
                `WHERE login = '${login}' `
            
                const resp = await this.dbPool.query(query)
            return resp.pop()
        } catch (err) {
            throw new Error(`Erro na validação de usuário-> ${err}`)
        }
    }
}

module.exports = Scheduling