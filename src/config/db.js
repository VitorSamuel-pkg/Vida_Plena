const Sequelize = require('sequelize');

const MSSQL_HOST = 'localhost';
const MSSQL_USER = 'sa';
const MSSQL_PASSWORD = '123456789';
const MSSQL_DB = 'databaseVidaPlena';
const MSSQL_PORT = '1433';
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
