let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let constance = require('../const/constance')
let jsonwebToken = require('jsonwebtoken')
let bcrypt = require('bcryptjs');
let encrytp = require('../const/encrypt')

exports.user_register = function () {
    return function (req, res, next) {

        db.query(`SELECT username FROM user_information WHERE username = '${req.body.username}'`, function (err, resultUser) {
            if (err) throw err;
            if (typeof resultUser[0] === 'undefined') {

                let registerInfo = {
                    username: req.body.username,
                    password: encrytp.encrytp(req.body.password),
                    name: req.body.name,
                    last_name: req.body.last_name,
                    address: req.body.address,
                    type_user: req.body.type_user,
                    aptitude: req.body.aptitude

                }
                db.query(`INSERT INTO user_information (username,password,name,last_name,address,type_user,aptitude) VALUES
                        ('${registerInfo.username}','${registerInfo.password}','${registerInfo.name}','${registerInfo.last_name}','${registerInfo.address}','${registerInfo.type_user}','${registerInfo.aptitude}')`, function (err, result) {
                        if (err) throw err;
                        // console.log(result)
                        req.token = jsonwebToken.sign({ id: result.insertId, type: registerInfo.type_user }, constance.sign)
                        next()
                    })



            } else {
                res.status(200).json(errorMessages.err_user_already)
                return;
            }


        })


    }
}

exports.user_update = function () {
    return function (req, res, next) {

        let updateInfo = {
            user_id: req.body.user_id,
            username: req.body.username,
            // password: encrytp.encrytp(req.body.password),
            name: req.body.name,
            last_name: req.body.last_name,
            address: req.body.address,
            aptitude: req.body.aptitude
            // type_user: req.body.type_user,

        }
        db.query(`UPDATE user_information SET username = '${updateInfo.username}',name = '${updateInfo.name}',last_name = '${updateInfo.last_name}',address = '${updateInfo.address}',aptitude = '${updateInfo.aptitude}' where user_id = '${updateInfo.user_id}'`, function (err, result) {
            if (err) throw err;
            next();
        })


    }
}

exports.user_update_password = function () {
    return function (req, res, next) {

        let updateInfo = {
            user_id: req.body.user_id,

            password: encrytp.encrytp(req.body.password),


        }
        if (updateInfo.password !== "") {
            db.query(`UPDATE user_information SET password = '${updateInfo.password}' where user_id = '${updateInfo.user_id}'`, function (err, result) {
                if (err) throw err;
                console.log("okkub")
                next();
            })
        } else {
            console.log(updateInfo.password)
        }



    }
}

exports.user_delete = function () {
    return function (req, res, next) {
        // console.log(req.body.user_id)

        db.query(`DELETE FROM user_information where user_id = '${req.body.user_id}'`, function (err, result) {
            if (err) throw err;
            console.log("okkub")
            next();
        })

    }
}

exports.get_user = function () {
    return function (req, res, next) {
        db.query(`SELECT  user_id,name,last_name,username,address,type_user,aptitude FROM user_information ORDER BY type_user DESC , user_id DESC`, function (err, resultUser) {
            if (err) throw err;

            req.result = resultUser
            next()

        })
    }
}

exports.get_user_by_id = function () {
    return function (req, res, next) {
        db.query(`SELECT  name,last_name ,username,address FROM user_information where user_id = '${req.body.user_id}'`, function (err, resultUser) {
            if (err) throw err;

            req.result = resultUser
            next()

        })
    }
}

exports.get_all_user = function () {
    return function (req, res, next) {
        db.query(`SELECT  * FROM user_information `, function (err, result) {
            if (err) throw err;
            req.result = result;
            next();

        })
    }
}

exports.user_login = function () {
    return function (req, res, next) {

        db.query(`SELECT  user_id ,password ,type_user FROM user_information WHERE username = '${req.body.username}'`, function (err, resultUser) {
            if (err) throw err;

            if (resultUser[0]) {


                let password = resultUser[0].password
                if (bcrypt.compareSync(req.body.password, password)) {
                    req.token = jsonwebToken.sign({
                        id: resultUser[0].user_id,
                        type: resultUser[0].type_user
                    }, constance.sign)
                    // console.log( req.token);

                    next()
                } else {
                    res.status(200).json(errorMessages.err_wrong_password)
                }
            } else {
                res.status(200).json(errorMessages.err_user_not_found)
            }
        })
    }
}