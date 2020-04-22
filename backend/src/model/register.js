const Moment = require('moment')

class Register {
    constructor(dbPool) {
        this.dbPool = dbPool
    }

    async create(nome,login, senha, tipoUsuario, estado, cidade ,bairro, rua, cep, numero, complemento , geolocX, geolocY ,InseridoEm) {
        try {
            var address_id = 1;
            if(tipoUsuario === 1){
                const qryAddress =
                `INSERT INTO logali.address ` +
                `(geoLocX, geoLocY, state, city, neighborhood, street, zipCode, number, complement ,createdAt) VALUES ` +
                `(
                ${geolocX},
                ${geolocY},
                '${estado}', 
                '${cidade}', 
                '${bairro}', 
                '${rua}', 
                ${cep},
                ${numero},
                '${complemento}',
                '${InseridoEm}'
            )`
                const addressResp = await this.dbPool.query(qryAddress)
            
                address_id = addressResp.insertId;
            }
            const query =
                `INSERT INTO logali.user ` +
                `(name, login, typeUserId,password, createdAt, address_Id) VALUES ` +
                `(
                '${nome}', 
                '${login}',
                ${tipoUsuario},
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

    async hasSameLogin(login, tipoUsuario) {
        try {
            const query =
                `SELECT login ` +
                `FROM logali.user ` +
                `WHERE login = '${login}' ` +
                `AND typeUserId = ${tipoUsuario}`
            
                const resp = await this.dbPool.query(query)
            return resp.pop()
        } catch (err) {
            throw new Error(`Erro na validação de usuário-> ${err}`)
        }
    }
}

module.exports = Register