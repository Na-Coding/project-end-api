let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let constance = require('../const/constance')

// user Ge,In,De,Up farmer member
exports.user_get_member = function () {
    return function (req, res, next) {
        db.query(`SELECT * FROM member_farmer WHERE farmer_id = '${req.body.farmer_id}'`, function (err, result) {
            if (err) throw err;
            req.result = result;
            next();
        })
    }
}

exports.user_add_member = function () {
    return function (req, res, next) {
        db.query(`INSERT INTO  member_farmer (member_id,first_name,last_name,age,education,Department,farmer_id) VALUES(null,'${req.body.first_name}','${req.body.last_name}','${req.body.age}', '${req.body.education}','${req.body.Department}','${req.body.farmer_id}')`, function (err, result) {
            if (err) throw err;
            // console.log(result.insertId)
            // next()
            next();
        })
    }
}

exports.user_delete_member = function () {
    return function (req, res, next) {
        db.query("DELETE FROM member_farmer WHERE member_id = '" + req.body.member_id + "'  ", function (err, result) {
            if (err) throw err;
            // console.log(result.insertId)
            // next()
            next();
        })
    }
}

exports.user_update_member = function () {
    return function (req, res, next) {
        if (req.body.member_id) {
            db.query(`UPDATE member_farmer SET first_name = '${req.body.first_name}',last_name = '${req.body.last_name}', age = '${req.body.age}',education = '${req.body.education}',Department  = '${req.body.Department}' ,farmer_id  = '${req.body.farmer_id}' where member_id = '${req.body.member_id}'`, function (err, result) {
                if (err) throw err;
                // console.log(result.insertId)
                // next()
                next();
            })
        } else {
            db.query(`INSERT INTO  member_farmer (member_id,first_name,last_name,age,education,Department,farmer_id) VALUES(null,'${req.body.first_name}','${req.body.last_name}','${req.body.age}', '${req.body.education}','${req.body.Department}','${req.body.farmer_id}')`, function (err, result) {
                if (err) throw err;
                // console.log(result.insertId)
                // next()
                next();
            })
        }
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////