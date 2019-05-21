let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let constance = require('../const/constance')

exports.trade_system = function () {
    return function (req, res, next) {
        db.query(`SELECT manufacture_information.plant_type,user_information.name 
        FROM ((user_information 
            LEFT JOIN farmer_information 
            ON user_information.user_id = farmer_information.user_id) 
            LEFT JOIN manufacture_information 
            ON farmer_information.farmer_id = manufacture_information.farmer_id) 
            WHERE user_information.team_code = ${req.body.team_code}`,
            function (err, result) {
                if (err) throw err;

                let index = 0
                let = element_obj

                let = all_plant_type = []
                let = list_plant = []

                result.map((element, index) => {
                    element_obj = JSON.parse(element.all_plant_type)
                    all_plant_type.push(...element_obj)//array1

                    elememt_obj.map((element, index) => {

                        index = list_plant.findIndex((find) => find === element.plant)
                        if (index < 0) {
                            list_plant.push(element.plant)
                        } else {

                        }
                    })
                })

                console.log("list_plant", list_plant);
                console.log("all_plant_type", all_plant_type);

                let product_obj = []

                list_plant.map((element, index) => {
                    let product = null

                    elememt_obj.map((element2, index) => {

                    })


                })
            })
    }
}