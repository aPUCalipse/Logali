const Moment = require('moment')

class Register {
    constructor(dbPool) {
        this.dbPool = dbPool
    }

    async create(sender, reciever, message) {
        try {
            const InseridoEm = Moment().format("YYYY-MM-DD HH:mm:ss");
            const query =
                `INSERT INTO logali.messages ` +
                `(senderId, recieverId, message,createdAt) VALUES ` +
                `(
                ${sender}, 
                ${reciever},
                '${message}',
                '${InseridoEm}'
            )`

            const resp = await this.dbPool.query(query)
            return resp
        } catch (err) {
            throw new Error(`Erro ao gravar mensagem -> ${err}`)
        }
    }

    async getMessages(idLogged, idOther) {
        try {
            const query =
                `SELECT user.name, logado.name, message ` +
                `FROM messages ` +
                `INNER JOIN users user on user.id = messages.recieverId ` +
                `INNER JOIN users logado on logado.id = messages.senderId ` +
                `WHERE (senderId = ${idLogged} AND recieverId = ${idOther}) `+
                `OR (senderId = ${idOther} AND recieverId = ${idLogged}) ` +
                `ORDER BY id`
            )`

            const resp = await this.dbPool.query(query)
            return resp
        } catch (err) {
            throw new Error(`Erro ao recuperar mensagens -> ${err}`)
        }
    }
}