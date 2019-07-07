const services = require('../utils/index');
const tableName='admin';

async function login(email) {
    try {
        const result = await services.checkEmail({ table: tableName, payload: email });
        return result;

    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}
async function signUp(data) {
    try {
        const result = await services.saveToDatabase({ table: tableName, payload: data });
        return result;

    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

module.exports = {
    login: login,
    signUp: signUp
}
