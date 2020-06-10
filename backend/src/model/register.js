const Moment = require('moment')

class Register {
    constructor(dbPool) {
        this.dbPool = dbPool
    }

    async create(nome, login, senha, tipoUsuario, estado, cidade, bairro, rua, cep, numero, complemento, geolocX, geolocY, InseridoEm) {
        try {
            var qryAddress =
                `INSERT INTO logali.address ` +
                `(geoLocX, geoLocY, state, city, neighborhood, street, zipCode, number, complement ,createdAt) VALUES ` +
                `(` +
                `${geolocX}, ` +
                `${geolocY}, ` +
                `'${estado}', ` +
                `'${cidade}', ` +
                `'${bairro}', ` +
                `'${rua}', ` +
                `'${cep}', ` +
                `'${numero}', ` +
                `'${complemento}', ` +
                `'${InseridoEm}' ` +
                `)`
            var addressResp = await this.dbPool.query(qryAddress)

            const address_id = addressResp.insertId;
            var query =
                `INSERT INTO logali.user ` +
                `(name, login, typeUserId,password, createdAt, addressId) VALUES ` +
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
            console.log(err)
            throw new Error(`Erro ao inserir usuário -> ${err}`)
        }
    }


    async update(userId, nome, login, senha, estado, cidade, bairro, rua, cep, numero, complemento, geolocX, geolocY) {

        try {
            var querySelect =
                `SELECT addressId ` +
                `FROM logali.user ` +
                `WHERE id = ${userId}`

            var respQuerySelect = await this.dbPool.query(query)

            var now = Moment().format("YYYY-MM-DD HH:mm:ss")
            var query_address =
                `UPDATE logali.address ` +
                `SET ` +
                `geoLocX = ${geolocX}, ` +
                `geoLocY = ${geolocY}, ` +
                `zipCode = ${cep}, ` +
                `number = ${numero}, ` +
                `street = '${rua}', ` +
                `complement = '${complemento}', ` +
                `neighborhood = '${bairro}', ` +
                `cidade = '${cidade}', ` +
                `state = '${estado}', ` +
                `updatedAt = ${now} ` +
                `join user ` +
                `on user.id = ${userId} ` +
                `WHERE ` +
                `address.id = ${respQuerySelect[0].addressId}`;

            var query = await this.dbPool.query(query_address)

            var query_user =
                `UPDATE logali.user ` +
                `SET ` +
                `name = '${nome}', ` +
                `login = '${login}', ` +
                `password = '${senha}', ` +
                `updatedAt = ${now}, ` +
                `WHERE ` +
                `user.id = ${userId}`;

            var resp = await this.dbPool.query(query_user);

            return resp;
        } catch (err) {
            throw new Error(`Erro ao atualizar usuário -> ${err}`)
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