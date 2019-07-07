const teacherServices = require('../services/teacher');
const bcrypt = require('bcrypt');
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

async function get(req, res) {
    if (authenticate(req.headers.authorization) === false) {
        notAuthenticated(res);
        return;
    }
        try {
            const result = await teacherServices.get();
            res.json({
                status: true,
                data: result
            })

        } catch (error) {
            console.log(error);
            res.status(400).json({
                status: false,
                message: "Fail to rettrive data from Teacher table"
            })
        }
    }


async function signUp(req, res) {

    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobilenumber: req.body.mobilenumber,
        address: req.body.address,
        email: req.body.email,
        password: hashedPassword,
        
    }

    try {
        const CheckEmail = await teacherServices.login(req.body.email);
        if (CheckEmail.length!=0){
            res.status(404).json({
                status: false,
                message: 'Email already exit'
            })
        }else{
            try {
                await teacherServices.signUp(data);
                res.json({
                    status: true,
                    message: 'teacher register success'

                })

            } catch (error) {
                console.log(error);
                res.json({
                    status: false,
                    message: 'Fail to register Teacher'
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            message: 'Fail to register Teacher'
        })
    }
}

async function login(req, res) {
    const password = req.body.password;
    try {
        const data = await teacherServices.login(req.body.email);
        console.log(data)
       if(data.length!=0){
           const passwordFromDB = data[0].password;
           const id = data[0].teacherId;
           const isMatchPassword = bcrypt.compareSync(password, passwordFromDB);
           if (isMatchPassword) {
               res.status(200).json({
                   status: true,
                   accessToken: jwt.sign({ teacherName: req.body.email }, SECRET_KEY),
                   message: 'Login Sucess',
                   id:id
               })
           } else {
               res.status(200).json({
                   status: false,
                   message: 'Password do not match'
               })
           }
       }else{
           res.status(200).json({
               status: false,
               message: 'Email do not match'
           })
       }

    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            message: "Email donot match"
        })
    }

}

async function getTeacherById(req, res) {
    if (authenticate(req.headers.authorization) === false) {
        notAuthenticated(res);
        return;
    }
    try {
        const result = await teacherServices.getTeacherById(req.params.id);
        res.json({
            status: true,
            data: result
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            message: "Fail to retrieve data By Teacher name"
        })
    }
}

async function update(req, res) {
    if (authenticate(req.headers.authorization) === false) {
        notAuthenticated(res);
        return;
    }
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobilenumber: req.body.mobilenumber,
        address: req.body.address,
        email: req.body.email,
        password: hashedPassword,
    }
    try {
        const CheckEmail = await teacherServices.login(req.body.email);
      if (CheckEmail.length != 0) {
            res.status(404).json({
                status: false,
                message: 'Email already exit'
            })
        } else {
            try {
                const result = await teacherServices.updateTeacher(req.params.name,data);
                if(result!=0){
                    res.json({
                        status: true,
                        message: 'Update success'
                    })
                }else{
                    res.json({
                        status:false,
                        message: 'Update not success'

                    })
                }

            } catch (error) {
                console.log(error);
                res.json({
                    status: false,
                    message: 'Teacher name does not exit'
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            message: 'Fail to Update Teacher'
        })
    }
}

async function deleteTeacherById(req, res) {
    if (authenticate(req.headers.authorization) === false) {
        notAuthenticated(res);
        return;
    }
    try {
        const result = await teacherServices.deleteTeacherById(req.params.id);
        if (result != 0) {
            res.json({
                status: true,
                message: 'Teacher deleted'
            })
        } else {
            res.json({
                status: false,
                message: 'Teacher not deleted'
            })

        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            message: "Fail to delete data"
        })
    }
}

module.exports = {
    get: get,
    login: login,
    signUp: signUp,
    getTeacherById: getTeacherById,
    update: update,
    deleteTeacherById: deleteTeacherById
}

