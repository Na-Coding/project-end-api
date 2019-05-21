let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let jsonwebToken = require('jsonwebtoken')
let bcrypt = require('bcryptjs')
let constance = require('../const/constance')
let encrytp = require('../const/encrypt')

exports.admin_add_se_register = function () {
    return function (req, res, next) {
        db.query(`SELECT username FROM user_information WHERE username = '${req.body.username }'`, function (err, resultUser) {
            if (err) throw err;
            if (typeof resultUser[0] === 'undefined') {
                
                let registerInfo = {
                    username: req.body.username,
                    password: encrytp.encrytp(req.body.password),
                    name: req.body.name,
                    last_name: req.body.last_name,
                    address: req.body.address,
                    type_user: 4,
                    user_informationcol: req.body.user_informationcol,
                    team_code: req.body.team_code

                }
                db.query(`INSERT INTO user_information (user_id,username,password,name,last_name,address,type_user) VALUES
                        (NULL,'${registerInfo.username}','${registerInfo.password}','${registerInfo.name}','${registerInfo.last_name}','${registerInfo.address}','${registerInfo.type_user}')`, function (err, result) {
                    if (err) throw err;
                    // console.log(result)
                    req.token = jsonwebToken.sign({
                        id: result.insertId
                    }, constance.sign)
                    db.query(`UPDATE user_information SET team_code = '${result.insertId}' where user_id = '${result.insertId}'`, function (err, result) {
                                    if (err) throw err;
                                    // console.log(result.insertId)
                                    // next()
                                    next();
                                })
                })

            } else {
                res.status(200).json(errorMessages.err_user_already)
                return;
            }
        })
    }
}

exports.admin_login = function () {
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

exports.admin_get_all_user = function () {
    return function (req, res, next) {
        db.query(`SELECT  * FROM user_information WHERE type_user <= 1`, function (err, result) {
            if (err) throw err;
            req.result = result;
            next();

        })
    }
}

// exports.admin_get_farmer = function () {
//     return function (req, res, next) {
//         db.query(`SELECT  name ,last_name ,address,user_informationcol FROM user_information WHERE user_id = '${req.body.user_id}'`, function (err, resultUser) {
//             if (err) throw err;
//             req.result = result;
//             next();

//         })
//     }
// }

exports.admin_get_all_farmer = function () {
    return function (req, res, next) {
        db.query(`SELECT  * FROM farmer_information `, function (err, result) {
            if (err) throw err;
            req.result = result;
            next();

        })
    }
}

// se
exports.admin_update_se = function () {
    return function (req, res, next) {

        db.query(`UPDATE user_information SET name = '${req.body.name}', last_name = '${req.body.last_name}', 
        address = '${req.body.address}',user_informationcol = '${req.body.user_informationcol}',team_code = '${req.body.team_code}' WHERE username = '${req.body.username}'`, function (err, result) {
            if (err) {
                throw err;
            }
            next()
        })
    }
}


exports.admin_update_data_se = function () {
    return function (req, res, next) {

        db.query(`UPDATE user_information SET name = '${req.body.name}', last_name = '${req.body.last_name}', 
        address = '${req.body.address}',user_informationcol = '${req.body.user_informationcol}',team_code = '${req.body.team_code}' WHERE username = '${req.body.username}'`, function (err, result) {
            if (err) {
                throw err;
            }
            next()
        })
    }
}

exports.admin_delete_se = function () {
    return function (req, res, next) {
        db.query("DELETE FROM user_information WHERE user_id = '" + req.body.user_id + "'  ", function (err, result) {
            if (err) {
                res.status(200).json(errorMessages.err_incorrect_delete)
            };
            next()
        })
    }
}