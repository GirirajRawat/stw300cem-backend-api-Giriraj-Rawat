const studentServices = require('../services/student');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secret_key';

function notAuthenticated(res) {
    res.json({
        status: 'fail',
        message: 'You are not authenticate user',
        code: 404
    });
}

function authenticate(token) { //token -> 123123789127389213
    if (!token) {
        return false;
    }
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        return true;
        // use payload if required
    } catch (error) {
        console.log(error)
        return false
    }
}
async function insert(req, res) {
    if (authenticate(req.headers.authorization) === false) {
        notAuthenticated(res);
        return;
    }

    const data = {

        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobilenumber: req.body.mobilenumber,
        address: req.body.address,
        faculty: req.body.faculty,
        batch: req.body.batch,
        
    }

    try {
        const result = await studentServices.insert(data);
        res.json({
            status: true,
            message: "Insert Sucess"
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            message: "Fail to insert Data"
        })
    }
}

async function get(req, res) {
    if (authenticate(req.headers.authorization) === false) {
        notAuthenticated(res);
        return;
    }
    try {
        const result = await studentServices.get();
        res.json({
            status: true,
            data: result
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            message: "Fail to retrive data from student table"
        })
    }
}

async function update(req, res) {
    if (authenticate(req.headers.authorization) === false) {
        notAuthenticated(res);
        return;
    }
    const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobilenumber: req.body.mobilenumber,
        address: req.body.address,
        faculty: req.body.faculty,
        batch: req.body.batch,
         }
            try {
                const result = await studentServices.updateJob(req.params.id, data);
                if (result != 0) {
                    res.json({
                        status: true,
                        message: 'Update success'
                    })
                } else {
                    res.json({
                        status: false,
                        message: 'Update not success'

                             })
                        }
               }catch (error) {
                console.log(error);
                res.json({
                    status: false,
                    message: 'Student id does not exit'
                })
            }
        }

async function getStudentDetailById(req, res) {
    if (authenticate(req.headers.authorization) === false) {
        notAuthenticated(res);
        return;
    }
    try {
        const result = await jobSerivces.getStudentDetailById(req.params.id);
        res.json({
            status: true,
            data: result
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            message: "Fail to retrieve data By Student Id"
        })
    }
}

async function deleteById(req, res) {
    if (authenticate(req.headers.authorization) === false) {
        notAuthenticated(res);
        return;
    }
    try {
        const result = await studentServices.deleteById(req.params.id);
        console.log(result)
        res.json({
            status: true,
           message:'Student deleted'
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            message: "Fail to retrieve data By Student Id"
        })
    }
}

async function getStudentDetails(req, res) {
    if (authenticate(req.headers.authorization) === false) {
        notAuthenticated(res);
        return;
    }
    try {
        const result = await jobSerivces.getStudentDetails();
        console.log(result)
        res.json({
            result: result[0]
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            message: "Fail to retrieve data By Student"
        })
    }
}


module.exports = {
    insert: insert,
    get:get,
    update: update,
    getStudentDetailById: getStudentDetailById,
    deleteById: deleteById


}
