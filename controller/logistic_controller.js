let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let constance = require('../const/constance')



exports.add_logistic = function () {
    return function (req, res, next) {

        db.query(`INSERT INTO  logistic_information (farmer_id,logistic_type,logistic_price,logistic_insurance,logistic_weight_ton,logistic_weight_kg,insurance_price) VALUES('${req.body.farmer_id}','${req.body.logistic_type}','${req.body.logistic_price}','${req.body.logistic_insurance}','${req.body.logistic_weight_ton}','${req.body.logistic_weight_kg}','${req.body.insurance_price}')`, function (err, result) {
            if (err) throw err;
            db.query(`UPDATE farmer_information SET step = '5' where farmer_id = '${req.body.farmer_id}'`, function (err, result) {
                if (err) throw err;
                res.step = 5
                // console.log(result.insertId)
                // next()
                next();
            })
        })
    }
}

exports.update_logistic = function () {
    return function (req, res, next) {

        db.query(`UPDATE logistic_information SET logistic_type = '${req.body.logistic_type}', logistic_price = '${req.body.logistic_price}', 
        logistic_insurance = '${req.body.logistic_insurance}' ,logistic_weight_ton = '${req.body.logistic_weight_ton}' ,logistic_weight_kg = '${req.body.logistic_weight_kg}',insurance_price = '${req.body.insurance_price}' WHERE logistic_id = '${req.body.logistic_id}'`, function (err, result) {
                if (err) {
                    throw err;
                }
                next()
            })
    }
}

exports.delete_logistic = function () {
    return function (req, res, next) {
        db.query("DELETE FROM logistic_information WHERE farmer_id = '" + req.body.farmer_id + "'  ", function (err, result) {
            if (err) {
                res.status(200).json(errorMessages.err_incorrect_delete)
            };
            next()
        })
    }
}

exports.get_logistic = function () {
    return function (req, res, next) {
        db.query(`SELECT * FROM logistic_information `, function (err, result) {
            if (err) throw err;
            req.result = result;
            next()
        })
    }
}


//plant_type
exports.add_plant_type = function () {
    return function (req, res, next) {

        db.query(`INSERT INTO  plant_type (farmer_id,plant) VALUES('${req.body.farmer_id}','${req.body.plant}')`, function (err, result) {
            if (err) throw err;
            next()
        })
    }
}

exports.update_plant_type = function () {
    return function (req, res, next) {
        db.query(`UPDATE plant_type SET plant = '${req.body.plant}' WHERE farmer_id = '${req.body.farmer_id}'`, function (err, result) {
            if (err) throw err;
            next()
        })
    }
}


exports.delete_plant_type = function () {
    return function (req, res, next) {
        db.query("DELETE FROM plant_type WHERE farmer_id = '" + req.body.farmer_id + "'  ", function (err, result) {
            if (err) {
                res.status(200).json(errorMessages.err_incorrect_delete)
            };
            next()
        })
    }
}

exports.get_plant_type = function () {
    return function (req, res, next) {
        db.query(`SELECT * FROM plant_type `, function (err, result) {
            if (err) throw err;
            req.result = result;
            next()
        })
    }
}