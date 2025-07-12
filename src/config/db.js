const Sequelize = require('sequelize');

const MSSQL_HOST = process.env.MSSQL_HOST;
const MSSQL_USER = process.env.MSSQL_USER;
const MSSQL_PASSWORD = process.env.MSSQL_PASSWORD;
const MSSQL_DB = process.env.MSSQL_DB;
const MSSQL_PORT = process.env.MSSQL_PORT;
const MSSQL_DIALECT = 'mssql';

const sequelize = new Sequelize(MSSQL_DB, MSSQL_USER, MSSQL_PASSWORD, {
    dialect: MSSQL_DIALECT,
       host: MSSQL_HOST,
       port: MSSQL_PORT
});

/*async function testeConnection() {
    try {
        await sequelize.authenticate()
        console.log('Conexão estabelecida com sucesso!')
    } catch (error) {
        console.error('Não foi possível se conectar ao banco de dados', error);
    }
    
}*/

//testeConnection();

module.exports = {sequelize};
