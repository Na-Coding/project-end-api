let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let constance = require('../const/constance')
let jsonwebToken = require('jsonwebtoken')
let bcrypt = require('bcryptjs');
let encrytp = require('../const/encrypt')

exports.get_researcher = function () {
    return function (req, res, next) {

        db.query(`SELECT user_id,name,last_name,aptitude FROM user_information WHERE type_user = '1'`, function (err, result) {
            if (err) throw err;
            // req.result = result;
            db.query(`SELECT researcher_confirm,plan_end FROM product_information`, function (err, result_product) {
                if (err) throw err;


                let result_obj = []
                result.map((element) => {
                    let confirm = 0
                    let end = 0
                    let order = 0

                    result_product.map((ele) => {

                        let pase_comfirm
                        // let pase_end

                        try {
                            pase_comfirm = JSON.parse(ele.researcher_confirm)

                            // pase_end = JSON.parse(ele.plan_end)

                            pase_comfirm.map((el) => {
                                if (el === element.user_id) {
                                    confirm++
                                } else { }
                            })

                            // pase_end.map((el) => {
                            //     if (el === element.user_id) {
                            //         end++
                            //     } else { }
                            // })


                        } catch (error) {

                        }

                    })

                    order = confirm

                    // if (order < 1) {
                    //     order = 0
                    // } else { }

                    result_obj.push({
                        user_id: element.user_id,
                        name: element.name,
                        last_name: element.last_name,
                        aptitude: element.aptitude,
                        order: confirm,

                    })

                })


                req.result = result_obj
                next();
            })

        })
    }
}