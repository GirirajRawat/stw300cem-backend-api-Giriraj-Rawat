
const path = require('path');
module.exports = {
    client: 'pg',
    connection: {
        host: 'localhost',
        database: 'androids',
        user: 'giriraj',
        password: 'Rawat@123'
    },

    migrations: {
        tableName: 'migrations',
        directory: path.resolve(__dirname, './migrations'),
    },
    userNullAsDefault: true

};