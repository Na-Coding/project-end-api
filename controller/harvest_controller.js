let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let constance = require('../const/constance')

// user Ge,In,De,Up farmer harvest
exports.user_get_harvest = function () {
    return function (req, res, next) {
        db.query(`SELECT  * FROM harvest_information WHERE farmer_id = '${req.body.farmer_id}' `, function (err, result) {
            if (err) throw err;
            req.result = result;

            next();

        })
    }
}

exports.user_add_harvest = function () {
    return function (req, res, next) {
        db.query(`INSERT INTO harvest_information (harvest_id,
            harvest_manage,
            before_after_harvest,
            transformation_exp,
            have_otop,
            packing,
            data_access,
            agricultural_problem,
            need_and_problem,
           farmer_id) 
            VALUES(NULL,'${req.body.harvest_manage}',
            '${req.body.before_after_harvest}', 
          
            '${req.body.transformation_exp}',
            '${req.body.have_otop}',
            '${req.body.packing}',
            '${req.body.data_access}',
            '${req.body.agricultural_problem}',
            '${req.body.need_and_problem}',
            
            '${req.body.farmer_id}'
        )`, function (err, result) {
            console.log(result) 
            if (err) throw err;
            db.query(`UPDATE farmer_information SET step = '5' where farmer_id = '${req.body.farmer_id}'`, function (err, result) {
                if (err) throw err;
                res.step = 5
                //  console.log(req.body.farmer_id)
                // next()
                next();
            })
        })
    }
}

exports.user_delete_harvest = function () {
    return function (req, res, next) {
        db.query("DELETE FROM harvest_information WHERE harvest_id = '" + req.body.harvest_id + "'  ", function (err, result) {
            if (err) throw err;
            next()
        })
    }
}

exports.user_update_harvest = function () {
    return function (req, res, next) 
    {    
        if (req.body.harvest_id) {
            db.query(`UPDATE harvest_information SET 
            harvest_manage = '${req.body.harvest_manage}' ,
            before_after_harvest = '${req.body.before_after_harvest}' ,
            packing = '${req.body.packing}',
            transformation_exp = '${req.body.transformation_exp}',
            have_otop = '${req.body.have_otop}' ,
            agricultural_problem = '${req.body.agricultural_problem}' ,
            data_access = '${req.body.data_access}' ,
            need_and_problem = '${req.body.need_and_problem}' 
            WHERE harvest_id = '${req.body.harvest_id}' `, function (err, result) {
                    if (err) throw err;
                    next()
                })
        } else {
            db.query(`INSERT INTO harvest_information (harvest_id,
                harvest_manage,
                before_after_harvest,packing,
                transformation_exp,
                have_otop,
                agricultural_problem,
                data_access,
                need_and_problem,farmer_id) 
                VALUES(NULL,'${req.body.harvest_manage}',
                '${req.body.before_after_harvest}', 
                '${req.body.packing}' ,
                '${req.body.transformation_exp}',
                '${req.body.have_otop}',
                '${req.body.agricultural_problem}',
                '${req.body.data_access}',
                '${req.body.need_and_problem}',
                '${req.body.farmer_id}'
            )`, function (err, result) {
                // console.log(result) 
                if (err) throw err;
                db.query(`UPDATE farmer_information SET step = '5' where farmer_id = '${req.body.farmer_id}'`, function (err, result) {
                    if (err) throw err;
                    res.step = 5
                    //  console.log(req.body.farmer_id)
                    // next()
                    next();
                })
            })
        }
    }
}