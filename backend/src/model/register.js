const Moment = require('moment')

class Register {
    constructor(dbPool) {
        this.dbPool = dbPool
    }

    async create(nome,login, senha, tipoUsuario, estado, cidade ,bairro, rua, cep, numero, InseridoEm) {
        try {
            var address_id = 1
            if(tipoUsuario === 'cliente'){
                const qryAddress =
                `INSERT INTO logali.address ` +
                `(state, city, neighborhood, street, zipCode, number, CreatedAt) VALUES ` +
                `(
                '${estado}', 
                '${cidade}', 
                '${bairro}', 
                '${rua}', 
                ${cep},
                ${numero},
                '${InseridoEm}'
            )`
            const addressResp = await this.dbPool.query(qryAddress)
            
            address_id = addressResp.insertId;

        }
            
            const query =
                `INSERT INTO logali.user ` +
                `(name,login, password, createdAt, address_id) VALUES ` +
                `(
                '${nome}', 
                '${login}', 
                '${senha}', 
                '${InseridoEm}', 
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

module.exports = Register