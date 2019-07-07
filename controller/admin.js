const adminServices = require('../services/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secret_key';

async function login(req, res) {
    const password = req.body.password;
    try {
        const data = await adminServices.login(req.body.email);
        console.log(data)
       if(data.length!=0){
           const passwordFromDB = data[0].password;
           const isMatchPassword = bcrypt.compareSync(password, passwordFromDB);
           if (isMatchPassword) {
               res.status(200).json({
                   status: true,
                   accessToken: jwt.sign({ adminName: req.body.email }, SECRET_KEY),
                   message: 'Login Sucess'
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


async function insert(req, res) {
    const password1 = req.body.password;
    const hashedPassword = bcrypt.hashSync(password1, 10);
    

    const data = {

        email: req.body.email,
        password: hashedPassword
        
    }

    try {
        const result = await adminServices.signUp(data);
        res.json({
            status: true,
            message: "Insert Success"
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            message: "Fail to insert Data"
        })
    }
}



module.exports = {
    insert: insert,
    login: login
}

