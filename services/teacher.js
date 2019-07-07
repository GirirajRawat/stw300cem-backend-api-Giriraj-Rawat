const services = require('../utils/index');
const tableName='teacher';

async function get() {
    const teacher = await services.getAllDetails(tableName);
    return teacher;
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

async function login(email) {
    try {
        console.log(email+"  "+ "setr")
        const result = await services.checkEmail({ table: tableName, payload: email });
        return result;

    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}
async function updateTeacher(name, teacherData) {
    try {
        const result = await services.updateTeacher({ table: tableName, name: name, teacherData: teacherData });
        return result;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}
async function getTeacherById(id) {
    try {
        const result = await services.getTeacherById({ table: tableName, id: id, });
        return result;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

async function deleteTeacherById(id) {
    try {
        const result = await services.deleteTeacherById({ table: tableName, id: id });
        return result;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }

}

module.exports = {
    get: get,
    login: login,
    signUp: signUp,
    updateTeacher: updateTeacher,
    getTeacherById: getTeacherById,
    deleteTeacherById: deleteTeacherById
}
