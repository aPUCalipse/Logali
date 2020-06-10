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
  if (connection) {
    console.log('Opa');
  }
  return connection
}

module.exports = {
  getPool: getPool
}