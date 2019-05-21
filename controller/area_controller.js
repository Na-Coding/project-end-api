let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let constance = require('../const/constance')
// user Ge,In,De,Up farmer area
exports.user_get_area = function () {
    return function (req, res, next) {
        db.query(`SELECT * FROM area_information WHERE user_id = '${req.body.user_id}' `, function (err, result) {
            if (err) throw err;
            req.result = result;
            next();

        })
    }
}

exports.user_add_area = function () {
    return function (req, res, next) {

        // console.log(req.body.area_owner) 
        // db.query(`INSERT INTO area_information (area_id,area_owner,area_certificate,area_holding,area_wather,water_storage,gps,chemical_date,employee,farmer_id,user_id) VALUES 
        // (NULL,'${req.body.area_owner}', '${req.body.area_certificate}' ,'${req.body.area_holding}' ,'${req.body.area_wather}' ,'${req.body.water_storage}','${req.body.gps}','${req.body.chemical_date}','${req.body.employee}','${req.body.farmer_id}','${req.body.user_id}') 
        // `, function (err, result) { 
            db.query(`INSERT INTO area_information (area_id,area_storage,area_wather,water_storage,gps,employee_type,chemical_date,farm_worker,farmer_id,transformation,access_to_information,consultantsource,land_home,certified) VALUES  
            (NULL, '${req.body.area_storage}','${req.body.area_wather}' ,'${req.body.water_storage}','${req.body.gps}','${req.body.employee_type}','${req.body.chemical_date}','${req.body.farm_worker}','${req.body.farmer_id}','${req.body.transformation}','${req.body.access_to_information}','${req.body.consultantsource}','${req.body.land_home}','${req.body.certified}')  
        `, function (err, result) {
                // console.log(result) 
                if (err) throw err;
                console.log(req.body.farmer_id)
                db.query(`UPDATE farmer_information SET step = '4' where farmer_id = '${req.body.farmer_id}'`, function (err, result) {
                    if (err) throw err;
                    res.step = 4
                    // console.log(result.insertId)
                    // next()
                    next();
                })
            })
    }
}




exports.user_delete_area = function () {
    return function (req, res, next) {
        db.query("DELETE FROM area_information WHERE area_id = '" + req.body.area_id + "'  ", function (err, result) {
            if (err) throw err;
            next()
        })
    }
}

exports.user_update_area = function () {
    return function (req, res, next) {
        console.log("u_id", req.user_id)
        console.log("f_id", req.body.farmer_id)
        console.log("a_id", req.body.area_id)
        if (req.body.area_id) {
            db.query(`UPDATE area_information SET 
                        area_storage = '${req.body.area_storage}' ,
                        area_wather = '${req.body.area_wather}' ,
                        water_storage = '${req.body.water_storage}' ,
                        gps = '${req.body.gps}' ,
                        chemical_date = '${req.body.chemical_date}' ,
                        employee_type = '${req.body.employee_type}' ,
                        farmer_id = '${req.body.farmer_id}' ,
                        farm_worker = '${req.body.farm_worker}' ,
                        transformation = '${req.body.transformation}' ,
                        access_to_information = '${req.body.access_to_information}' ,
                        consultantsource = '${req.body.consultantsource}' , 
                        land_home = '${req.body.land_home}' , 
                        certified = '${req.body.certified}'  
                          
                                           
                        WHERE area_id = ${req.body.area_id}`, 
                function (err, result) {
                    if (err) throw err;
                    next()
                })
        } else {
            db.query(`INSERT INTO area_information (area_id,area_owner,area_certificate,area_storage,area_holding,area_wather,water_storage,gps,employee_type,employee,chemical_date,farm_worker,farmer_id,transformation,access_to_information,consultantsource,land_home,certified) VALUES  
        (NULL,'${req.body.area_owner}', '${req.body.area_certificate}', '${req.body.area_storage}','${req.body.area_holding}' ,'${req.body.area_wather}' ,'${req.body.water_storage}','${req.body.gps}','${req.body.employee_type}','${req.body.employee}','${req.body.chemical_date}','${req.body.farm_worker}','${req.body.farmer_id}','${req.body.transformation}','${req.body.access_to_information}','${req.body.consultantsource}','${req.body.land_home}','${req.body.certified}')   
            `, function (err, result) {
                    // console.log(result) 
                    if (err) throw err;
                    console.log(req.body.farmer_id)
                    db.query(`UPDATE farmer_information SET step = '3' where farmer_id = '${req.body.farmer_id}'`, function (err, result) {
                        if (err) throw err;
                        // res.step = 3
                        // console.log(result.insertId)
                        // next()
                        next();
                    })
                })
        }
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////