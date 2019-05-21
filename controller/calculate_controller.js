let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let constance = require('../const/constance')

exports.calculate_overview = function () {
    return function (req, res, next) {
        db.query(`SELECT DISTINCT(plant_type.plant), SUM(volume_plant.volume) AS total
        FROM plant_type
        LEFT JOIN volume_plant ON plant_type.plant_id = volume_plant.plant_id
        GROUP BY plant_type.plant `, function (err, result) {
            if (err) throw err;
            req.result = result;
            next();

        })
    }
}

// exports.calculate_overview = function () {
//     return function (req, res, next) {
//         db.query(`SELECT plant_type.plant, volume_plant.volume
//         FROM plant_type
//         LEFT JOIN volume_plant ON plant_type.plant_id = volume_plant.plant_id`, function (err, result) {
//             if (err) throw err;
//             req.result = result;
//             next();

//         })
//     }
// }

exports.calculate_overview_yearmonth= function () {
    return function (req, res, next) {
        db.query(`SELECT DISTINCT(plant_type.plant),Month(Date) , SUM(volume_plant.volume) AS total
        FROM plant_type
        LEFT JOIN volume_plant ON plant_type.plant_id = volume_plant.plant_id
        WHERE YEAR(Date) = '2018'
        GROUP BY plant_type.plant `, function (err, result) {
            if (err) throw err;
            req.result = result;
            next();

        })
    }
}