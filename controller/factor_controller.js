let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let constance = require('../const/constance')

// user Ge,In,De,Up farmer factor
exports.user_get_factor = function () {
    return function (req, res, next) {
        db.query(`SELECT  * FROM factor_information WHERE farmer_id = '${req.body.farmer_id}' `, function (err, result) {
            if (err) throw err;
            req.result = result;

            next();

        })
    }
}

exports.user_add_factor = function () {
    return function (req, res, next) {
        db.query(`INSERT INTO factor_information (factor_id,manure_type,manure_type_organic,seed,equipment,farmer_id,product_planning,taking_notes,fertilizerfactor,purchasefactor) VALUES(NULL,'${req.body.manure_type}','${req.body.manure_type_organic}', '${req.body.seed}' ,'${req.body.equipment}','${req.body.farmer_id}','${req.body.product_planning}','${req.body.taking_notes}','${req.body.fertilizerfactor}','${req.body.purchasefactor}')`, function (err, result) {
            // console.log(result) 
            if (err) throw err;
            db.query(`UPDATE farmer_information SET step = '3' where farmer_id = '${req.body.farmer_id}'`, function (err, result) {
                if (err) throw err;
                res.step = 3
                //  console.log(req.body.farmer_id)
                // next()
                next();
            })
        })
    }
}

exports.user_delete_factor = function () {
    return function (req, res, next) {
        db.query("DELETE FROM factor_information WHERE factor_id = '" + req.body.factor_id + "'  ", function (err, result) {
            if (err) throw err;
            next()
        })
    }
}

exports.user_update_factor = function () {
    return function (req, res, next) {
    
        if (req.body.factor_id) {
            db.query(`UPDATE factor_information SET seed = '${req.body.seed}' ,equipment = '${req.body.equipment}' ,
            farmer_id = '${req.body.farmer_id}',manure_type = '${req.body.manure_type}', product_planning ='${req.body.product_planning}', taking_notes = '${req.body.taking_notes}'
           WHERE factor_id = '${req.body.factor_id}' `, function (err, result) {
                    if (err) throw err;
                    next()
                })
        } else {
            db.query(`INSERT INTO factor_information (factor_id,manure_type,manure_type_organic,seed,equipment,farmer_id,product_planning,taking_notes) 
            VALUES(NULL,'${req.body.manure_type}','${req.body.manure_type_organic}', '${req.body.seed}' ,'${product_planning}','${taking_notes}',
            '${req.body.equipment}','${req.body.farmer_id}')`, function (err, result) {
                    // console.log(result) 
                    if (err) throw err;
                    db.query(`UPDATE farmer_information SET step = '5' where farmer_id = '${req.body.farmer_id}'`, function (err, result) {
                        if (err) throw err;
                        // res.step = 5
                        //  console.log(req.body.farmer_id)
                        // next()
                        next();
                    })
                })
        }
    }
}