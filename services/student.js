const services = require('../utils/index');
const tableName = 'student';

async function insert(data) {
    try {
        const result = await services.saveToDatabase({ table: tableName, payload: data });
        return result;

    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}
async function get() {
    const result = await services.getAllDetails(tableName);
    return result;
}

async function updateStudent (id, jobData) {
    try {
        const result = await services.updateStudent({ table: tableName, id: id, jobData: jobData });
        return result;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}


async function getStudentDetailById(id) {
    try {
        const result = await services.getStudentDetailById({ table: tableName, id: id, });
        return result;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

async function deleteById(id) {
    try {
        const result = await services.deleteStudentById({ table: tableName, id: id, });
        return result;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}


async function getTeacherDetails() {
    try {
        const result = await services.getTeacherDetails();
        return result;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}



module.exports ={
    insert: insert,
    get:get,
    updateStudent: updateStudent,
    getStudentDetailById: getStudentDetailById,
    deleteById: deleteById
    
}
