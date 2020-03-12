const MysqlService = require('../dataBase/MySQLService')
const chai = require('chai')
const assert = chai.assert

async function testConnection() {
    try {
        const con = await MysqlService.getPool()
    } catch (e) {
        console.log(e)
        assert.fail()
    }
}

describe('DataBase Tests', () => {
    it('test connection', testConnection)
})