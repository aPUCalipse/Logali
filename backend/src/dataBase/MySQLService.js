const MYSQL = require('mysql')
const util = require('util')

function getPool() {
  const connection = MYSQL.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'logali'
  });

  connection.query = util.promisify(connection.query).bind(connection)
  return connection
}

module.exports = {
  getPool: getPool
}