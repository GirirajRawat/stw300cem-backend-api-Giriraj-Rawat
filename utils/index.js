const knex= require('knex');
const config=require('../knexfile');
const dbConnection=knex(config);

async function saveToDatabase({table,payload}) {

    const result = await dbConnection.table(table).insert(payload);
    return 'successful'
}

async function getAllDetails(table){
    const result = await dbConnection.table(table).select();
    return result;
}

// async function updateUser({ table, id, userData}) {
//    try {
//        const result = await dbConnection(table).where('userId', id).update(userData);
//        console.log(result)
//        return result;
       
//    } catch (error) {
//        return error;
//    }
// }

async function updateTeacher({ table, name, teacherData }) {
    try {
     
        const result = await dbConnection(table).where('name', name).update(teacherData);
        console.log(result)
        return result;

    } catch (error) {
        return error;
    }
}
async function updateStudent({ table, id, studentData }) {
    try {
        const result = await dbConnection(table).where('jobID', id).update(studentData);
        console.log(result)
        return result;

    } catch (error) {
        return error;
    }
}


// async function deleteUserById({ table, id }) {
//     try{
//         const result = await dbConnection.table(table).where({ 'userId': id }).del();
//         console.log(result)
//         return result;
//     }catch(error){
//         return error;
//     }
    
// }

async function deleteTeacherById({ table, id }) {
    try {
        const result = await dbConnection.table(table).where({ 'teacherId': id }).del();
        return result;
    } catch (error) {
        return error;
    }
}

async function deleteStudentById({ table, id }) {
    try {
        const result = await dbConnection.table(table).where({ 'studentID': id }).del();
        return result;
    } catch (error) {
        return error;
    }
}


async function checkEmail({table,payload}) {
    try {

        const result = await dbConnection.table(table).select('password').where({ 'email': payload });
        return result;
    } catch (error) {
        return error;
    }
   
  }
async function getById({ table, id }) {
    const result = await dbConnection.table(table).select().where({ userId: id });
    return result;
}

async function getTeacherById({ table, id }) {
    const result = await dbConnection.table(table).select().where({ teacherId: naidme });
    return result;
}
async function getStudentDetailById({ table, id }) {
    const result = await dbConnection.table(table).select().where({ studentID: id });
    return result;
}
// async function getCompanyJodDetails() {
//     const result = await dbConnection.table('companies').innerJoin('job', 'companies.companyId', '=', 'job.companyId').select('companies.companyId','jobID','jobTitle','name','address','dateLine');
//     return result;
// }


module.exports = {
    saveToDatabase:saveToDatabase,
    // updateUser: updateUser,
    updateTeacher: updateTeacher,
    getAllDetails:getAllDetails,
    checkEmail: checkEmail,
    getById: getById, 
    getTeacherById: getTeacherById,
    // deleteUserById: deleteUserById,
    deleteTeacherById: deleteTeacherById,
    updateStudent: updateStudent,
    getStudentDetailById: getStudentDetailById,
    deleteStudentById: deleteStudentById
    // getCompanyJodDetails: getCompanyJodDetails
};