let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let jsonwebToken = require('jsonwebtoken')
let bcrypt = require('bcryptjs')
let constance = require('../const/constance')
let encrytp = require('../const/encrypt')



exports.get_order_product = function () {

    return function (req, res, next) {

        let orderInfo = {
            order_id:req.body.order_id
            
         }
        db.query(`SELECT  order_product  FROM maketing_information `, function (err, result) {
            if (err) throw err;
            req.result = result;
           
                    next()
               
        })
    }
}