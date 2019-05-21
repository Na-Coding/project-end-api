let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let constance = require('../const/constance')
let jsonwebToken = require('jsonwebtoken')
let bcrypt = require('bcryptjs');
let encrytp = require('../const/encrypt')

exports.researcher_add_product_plan = function () {
    return function (req, res, next) {

        let planInfo = {
            product_id: req.body.product_id,
            product_topic: req.body.product_topic,
            nutrient_precent: req.body.nutrient_precent,
            plant: req.body.plant,
            image: req.body.image,
            researcher_id: req.user_id


        }
        // console.log(planInfo.image)
        // console.log(planInfo.volume_type)
        db.query(`INSERT INTO product_plan (plan_id,product_id,product_topic,nutrient_precent,plant,image,researcher_id) VALUES
                        (null,'${planInfo.product_id}','${planInfo.product_topic}','${planInfo.nutrient_precent}','${planInfo.plant}','plan_image','${planInfo.researcher_id}')`, function (err, result) {
                if (err) throw err;
                let plan_image = planInfo.image.slice(planInfo.image.indexOf(',') + 1)
                require("fs").writeFile("./image/plan/plan-" + result.insertId + '.png', plan_image, 'base64', function (err) {
                    if (err) throw err;
                    db.query(`UPDATE product_plan SET image = 'plan/image/plan-${result.insertId}.png'  WHERE plan_id = ${result.insertId}`, function (err, result) {
                        if (err) throw err;
                        next()
                    });
                });
                next();
            })


    }
}

exports.researcher_update_product_plan = function () {
    return function (req, res, next) {

        let planInfo = {
            plan_id: req.body.plan_id,
            product_id: req.body.product_id,
            plan_name: req.body.plan_name,
            nutrient_precent: req.body.nutrient_precent,
            plant: req.body.plant,
            image: req.body.image,
            user_id: req.body.user_id
        }
        // console.log(planInfo.user_id)
        db.query(`UPDATE product_plan SET product_id = '${planInfo.product_id}',
                                                 plan_name = '${planInfo.plan_name}',
                                                 nutrient_precent = '${planInfo.nutrient_precent}', 
                                                 plant = '${planInfo.plant}',
                                                 user_id = '${planInfo.user_id}'
                                                 where plan_id = '${planInfo.plan_id}'`, function (err, result) {
                if (err) throw err;
                if (planInfo.image) {
                    let plan_image = planInfo.image.slice(planInfo.image.indexOf(',') + 1)
                    require("fs").writeFile("./image/plan/plan-" + planInfo.plan_id + '.png', plan_image, 'base64', function (err) {
                        if (err) throw err;
                        db.query(`UPDATE product_plan SET image = 'plan/image/plan-${planInfo.plan_id}.png'  WHERE plan_id = ${planInfo.plan_id}`, function (err, result) {
                            if (err) throw err;
                            next()
                        });

                    });
                } else {
                    next();
                }
            })


    }
}

exports.researcher_delete_product_plan = function () {
    return function (req, res, next) {

        require("fs").unlink('./image/plan/plan-' + req.body.plan_id + '.png', (err, data) => {


            db.query("DELETE FROM product_plan WHERE plan_id = '" + req.body.plan_id + "'  ", function (err, result) {
                if (err) {
                    res.status(200).json(errorMessages.err_incorrect_delete)
                };
                next()
            })



        })
    }
}

exports.get_plan_researchar = function () {
    return function (req, res, next) {


        db.query(`SELECT plan_id,product_plan.product_id,product_topic,product_name,nutrient_precent,plant,image FROM product_plan LEFT JOIN product_information ON product_plan.product_id = product_information.product_id WHERE product_plan.researcher_id = '${req.user_id}' and send_se = '0' order by product_plan.plan_id DESC`, function (err, result) {

            if (err) throw err;
            let element_obj = []
            result.map((element) => {
                element.nutrient_precent = JSON.parse(element.nutrient_precent)
                element.plant = JSON.parse(element.plant)
                element_obj.push(element)


            })
            req.result = element_obj;
            next();

        })
        // db.query(`SELECT * FROM product_plan LEFT JOIN product_information ON product_plan.product_id = product_information.product_id WHERE product_plan.researcher_id = '${req.user_id}' and send_se = '0'`, function (err, result) {

        //     if (err) throw err;
        //     let element_obj = []
        //     result.map((element) => {
        //         element.nutrient_precent = JSON.parse(element.nutrient_precent)
        //         element.plant = JSON.parse(element.plant)
        //         element_obj.push(element)


        //     })
        //     req.result = element_obj;
        //     next();

        // })

    }
}

exports.post_plan_researchar_show = function () {
    return function (req, res, next) {

        db.query(`SELECT product_name,nutrient_precent,plant,image FROM product_plan LEFT JOIN product_information ON product_plan.product_id = product_information.product_id WHERE product_plan.researcher_id = '${req.user_id}' AND product_plan.product_id = '${req.body.product_id}' AND send_se ='0'`, function (err, result) {

            if (err) throw err;
            let element_obj = []
            result.map((element) => {
                element.nutrient_precent = JSON.parse(element.nutrient_precent)
                element.plant = JSON.parse(element.plant)
                element_obj.push(element)
            })
            req.result = element_obj;
            next();

        })
    }
}

exports.send_plan_se_check = function () {
    return function (req, res, next) {
        console.log(req.user_id)
        db.query(`SELECT product_name,nutrient_precent,plant,image FROM product_plan LEFT JOIN product_information ON product_plan.product_id = product_information.product_id WHERE product_plan.researcher_id = '${req.user_id}' and send_se = '1'`, function (err, result) {

            if (err) throw err;
            let element_obj = []
            result.map((element) => {
                element.nutrient_precent = JSON.parse(element.nutrient_precent)
                element.plant = JSON.parse(element.plant)
                element_obj.push(element)
            })
            req.result = element_obj;
            next();

        })
    }
}



exports.get_plant_chart = function () {
    return function (req, res, next) {

        db.query(`SELECT * FROM product_plan WHERE plan_id = ${req.body.plan_id}`, function (err, result) {
            if (err) throw err;
            // req.result = result;

            let element_plant = []
            let element_nutrient = []

            let nutrient_obj = JSON.parse(result[0].nutrient)
            let plant_obj = JSON.parse(result[0].plant)
            console.log(plant_obj)
            let element_obj = []
            nutrient_obj.map((element) => {
                element_nutrient.push(element)

            })
            plant_obj.map((element) => {
                element_plant.push(element)
            })
            element_obj.push({
                name: result[0].plan_name,
                nutrient: element_nutrient,
                material: element_plant
            })
            req.result = result
            next();

        })
    }
}

exports.get_plant_by_product = function () {
    return function (req, res, next) {

        db.query(`SELECT * FROM product_plan WHERE product_id = ${req.body.product_id}`, function (err, result) {

            if (err) throw err;
            // req.result = result;
            let element_obj = []

            result.map((element) => {
                let nutrient_obj = JSON.parse(element.nutrient)
                let plant_obj = JSON.parse(element.plant)
                let element_nutrient = []
                let element_plant = []

                nutrient_obj.map((element) => {
                    element_nutrient.push(element)
                })

                plant_obj.map((element) => {
                    element_plant.push(element)
                })

                element_obj.push({
                    name: element.plan_name,
                    nutrient: element_nutrient,
                    material: element_plant

                })

            })
            req.result = element_obj;
            next();

        })
    }
}

exports.get_all_plan = function () {
    return function (req, res, next) {

        db.query(`SELECT * FROM (product_plan LEFT JOIN product_information ON product_plan.product_id = product_information.product_id) LEFT JOIN user_information ON product_plan.researcher_id = user_information.user_id where product_plan.send_se = '1' order by product_plan.product_id DESC `, function (err, result) {

            if (err) throw err;
            db.query(`SELECT user_information.name,manufacture_information.manufacture_id,manufacture_information.plant_type FROM ((user_information LEFT JOIN farmer_information ON user_information.user_id = farmer_information.user_id) LEFT JOIN manufacture_information ON farmer_information.farmer_id = manufacture_information.farmer_id) WHERE user_information.type_user = '3' order by manufacture_id DESC`, function (err, result_plant) {

                if (err) throw err;

                let element_obj = []
                let id_plan = []
                result.map((element) => {
                    let index
                    index = id_plan.findIndex((el) => el === element.product_id)
                    if (index < 0) {
                        if (element.product_id !== null) {
                            id_plan.push(
                                element.product_id
                            )
                        }
                    } else {
                    }

                })
                id_plan.map((element) => {


                    let plan_obj = []
                    let plan_el = []

                    result.map((el) => {
                        if (element === el.product_id) {
                            plan_obj.push(el)

                        } else { }
                    })

                    plan_obj.map((el) => {

                        try {

                            let nutrient_obj = JSON.parse(el.nutrient_precent)
                            let plant_obj = JSON.parse(el.plant)
                            let element_nutrient = []
                            let element_plant = []
                            let cost = 0




                            nutrient_obj.map((elem) => {
                                element_nutrient.push(elem)
                            })
                            let price_obj = 0
                            plant_obj.map((elem) => {

                                let total = 0, count = 0, some = 0
                                let test = 0

                                result_plant.map((element_plant) => {

                                    let plant_db_obj

                                    if (element_plant.plant_type !== null) {
                                        try {


                                            plant_db_obj = JSON.parse(element_plant.plant_type)

                                            // let consumer = 0 ,compiler=0,enterprise=0,mill=0,supermarket=0,agent=0,xexport=0,processing=0,seed=0,other=0


                                            plant_db_obj.map((element_plant_db_obj) => {

                                                if (elem.plant_name === element_plant_db_obj.plant) {
                                                    let rice_sell = []
                                                    rice_sell = element_plant_db_obj.rice_sell_array

                                                    if (rice_sell !== undefined) {

                                                        rice_sell.map((element_rice_sell) => {

                                                            if (element_rice_sell.rice_sell === "ผู้บริโภคโดยตรง") {

                                                                total += parseInt(element_rice_sell.price_consumer)
                                                                count++

                                                            } else if (eleme.rice_sell === "ผู้รวบรวมสินค้าเกษตร/เกษตรกร") {

                                                                total += parseInt(element_rice_sell.price_compiler)
                                                                count++

                                                            } else if (eleme.rice_sell === "ส่งให้กลุ่มวิสาหกิจของตัวเอง") {
                                                                total += parseInt(element_rice_sell.price_enterprise)
                                                                count++
                                                            } else if (eleme.rice_sell === "โรงสี") {
                                                                total += parseInt(element_rice_sell.price_mill)
                                                                count++
                                                            } else if (eleme.rice_sell === "ห้างร้านหรือซุปเปอร์มาร์เก็ตหรือร้านค้าปลีก") {
                                                                total += parseInt(element_rice_sell.price_supermarket)
                                                                count++
                                                            } else if (eleme.rice_sell === "ตัวแทนส่งออก") {
                                                                total += parseInt(element_rice_sell.price_agent)
                                                                count++
                                                            } else if (eleme.rice_sell === "ส่งออกไปต่างประเทศ") {
                                                                total += parseInt(element_rice_sell.price_export)
                                                                count++
                                                            } else if (eleme.rice_sell === "โรงงานแปรรูป") {
                                                                total += parseInt(element_rice_sell.price_processing_plant)
                                                                count++
                                                            } else if (eleme.rice_sell === "ขายเมล็ดพันธุ์") {
                                                                total += parseInt(element_rice_sell.price_seed)
                                                                count++
                                                            } else if (eleme.rice_sell === "อื่นๆ ระบุ") {
                                                                total += parseInt(element_rice_sell.price_other)
                                                                count++
                                                            } else { }

                                                        })

                                                    } else {

                                                    }


                                                } else { }
                                            })


                                        } catch (error) {

                                        }
                                    }

                                })
                                some = total / count

                                if (elem.volume_type === "กรัม") {
                                    some = some / 1000
                                } else if (elem.volume_type === "ตัน") {
                                    some = some * 1000
                                } else {

                                }
                                console.log(some)
                                let some_2=some.toFixed(2)
                                element_plant.push({
                                    plant_name: elem.plant_name,
                                    volume: elem.volume,
                                    volume_type: elem.volume_type,
                                    price_kg: some_2,
                                    price_volume: some_2 * elem.volume
                                })

                            })
                            element_plant.map((ele) => {
                                price_obj += ele.price_volume
                            })
                            let pie = []
                            element_nutrient.map((ele) => {
                                pie.push({
                                    name: ele.nutrient,
                                    y: parseInt(ele.percent)
                                })

                            })

                            plan_el.push({
                                product_topic: el.product_topic,
                                number: plan_el.length + 1,
                                plan_id: el.plan_id,
                                plan_name: el.product_name,
                                nutrient: pie,
                                material: element_plant,
                                image: el.image,
                                user_id: el.user_id,
                                name: el.name,
                                price_obj: price_obj,
                                volume: el.volume,
                                volume_type: el.volume_type,
                                price_all: price_obj * el.volume
                            })


                        } catch (error) {

                        }
                    })



                    element_obj.push({
                        product_id: element,
                        plan: plan_el
                    })
                })
                req.result = element_obj
                next();

            })
        })
    }
}

exports.get_plan_history = function () {
    return function (req, res, next) {

        db.query(`SELECT plan_id,product_plan.product_id,product_topic,product_name,nutrient_precent,plant,image FROM product_plan LEFT JOIN product_information ON product_plan.product_id = product_information.product_id WHERE product_plan.researcher_id = '${req.user_id}' and send_se = '1' || send_se = '2' || send_se = '3' order by product_plan.plan_id DESC`, function (err, result) {

            if (err) throw err;
            let element_obj = []
            result.map((element) => {
                element.nutrient_precent = JSON.parse(element.nutrient_precent)
                element.plant = JSON.parse(element.plant)
                element_obj.push(element)


            })
            req.result = element_obj;
            next();

        })
    }
}

exports.get_plan_confirm_trader = function () {
    return function (req, res, next) {

        db.query(`SELECT plan_id,product_plan.product_id,product_topic,product_name,nutrient_precent,plant,image,volume,volume_type FROM product_plan LEFT JOIN product_information ON product_plan.product_id = product_information.product_id WHERE product_information.trader_id = '${req.user_id}' and send_se = '3' order by product_plan.plan_id DESC`, function (err, result) {
            // db.query(`SELECT * FROM (product_plan LEFT JOIN product_information ON product_plan.product_id = product_information.product_id) LEFT JOIN user_information ON product_plan.researcher_id = user_information.user_id where product_plan.send_se = '1' order by product_plan.product_id DESC `, function (err, result) {

            if (err) throw err;
            db.query(`SELECT user_information.name,manufacture_information.manufacture_id,manufacture_information.plant_type FROM ((user_information LEFT JOIN farmer_information ON user_information.user_id = farmer_information.user_id) LEFT JOIN manufacture_information ON farmer_information.farmer_id = manufacture_information.farmer_id) WHERE user_information.type_user = '3' order by manufacture_id DESC`, function (err, result_plant) {

                if (err) throw err;

                let element_obj = []
                let id_plan = []
                result.map((element) => {
                    let index
                    index = id_plan.findIndex((el) => el === element.product_id)
                    if (index < 0) {
                        if (element.product_id !== null) {
                            id_plan.push(
                                element.product_id
                            )
                        }
                    } else {
                    }

                })
                id_plan.map((element) => {


                    let plan_obj = []
                    let plan_el = []

                    result.map((el) => {
                        if (element === el.product_id) {
                            plan_obj.push(el)

                        } else { }
                    })

                    plan_obj.map((el) => {

                        try {

                            let nutrient_obj = JSON.parse(el.nutrient_precent)
                            let plant_obj = JSON.parse(el.plant)
                            let element_nutrient = []
                            let element_plant = []
                            let cost = 0




                            nutrient_obj.map((elem) => {
                                element_nutrient.push(elem)
                            })
                            let price_obj = 0
                            plant_obj.map((elem) => {

                                let total = 0, count = 0, some = 0
                                let test = 0

                                result_plant.map((element_plant) => {

                                    let plant_db_obj

                                    if (element_plant.plant_type !== null) {
                                        try {


                                            plant_db_obj = JSON.parse(element_plant.plant_type)

                                            // let consumer = 0 ,compiler=0,enterprise=0,mill=0,supermarket=0,agent=0,xexport=0,processing=0,seed=0,other=0


                                            plant_db_obj.map((element_plant_db_obj) => {

                                                if (elem.plant_name === element_plant_db_obj.plant) {
                                                    let rice_sell = []
                                                    rice_sell = element_plant_db_obj.rice_sell_array

                                                    if (rice_sell !== undefined) {

                                                        rice_sell.map((element_rice_sell) => {

                                                            if (element_rice_sell.rice_sell === "ผู้บริโภคโดยตรง") {

                                                                total += parseInt(element_rice_sell.price_consumer)
                                                                count++

                                                            } else if (eleme.rice_sell === "ผู้รวบรวมสินค้าเกษตร/เกษตรกร") {

                                                                total += parseInt(element_rice_sell.price_compiler)
                                                                count++

                                                            } else if (eleme.rice_sell === "ส่งให้กลุ่มวิสาหกิจของตัวเอง") {
                                                                total += parseInt(element_rice_sell.price_enterprise)
                                                                count++
                                                            } else if (eleme.rice_sell === "โรงสี") {
                                                                total += parseInt(element_rice_sell.price_mill)
                                                                count++
                                                            } else if (eleme.rice_sell === "ห้างร้านหรือซุปเปอร์มาร์เก็ตหรือร้านค้าปลีก") {
                                                                total += parseInt(element_rice_sell.price_supermarket)
                                                                count++
                                                            } else if (eleme.rice_sell === "ตัวแทนส่งออก") {
                                                                total += parseInt(element_rice_sell.price_agent)
                                                                count++
                                                            } else if (eleme.rice_sell === "ส่งออกไปต่างประเทศ") {
                                                                total += parseInt(element_rice_sell.price_export)
                                                                count++
                                                            } else if (eleme.rice_sell === "โรงงานแปรรูป") {
                                                                total += parseInt(element_rice_sell.price_processing_plant)
                                                                count++
                                                            } else if (eleme.rice_sell === "ขายเมล็ดพันธุ์") {
                                                                total += parseInt(element_rice_sell.price_seed)
                                                                count++
                                                            } else if (eleme.rice_sell === "อื่นๆ ระบุ") {
                                                                total += parseInt(element_rice_sell.price_other)
                                                                count++
                                                            } else { }

                                                        })

                                                    } else {

                                                    }


                                                } else { }
                                            })


                                        } catch (error) {

                                        }
                                    }

                                })
                                some = total / count
                                if (elem.volume_type === "กรัม") {
                                    some = some / 1000
                                } else if (elem.volume_type === "ตัน") {
                                    some = some * 1000
                                } else {

                                }
                                console.log(some)

                                let some_2=some.toFixed(2)
                                element_plant.push({
                                    plant_name: elem.plant_name,
                                    volume: elem.volume,
                                    volume_type: elem.volume_type,
                                    price_kg: some_2,
                                    price_volume: some_2 * elem.volume
                                })

                            })
                            element_plant.map((ele) => {
                                price_obj += ele.price_volume
                            })

                            let pie = []
                            element_nutrient.map((ele) => {
                                pie.push({
                                    name: ele.nutrient,
                                    y: parseInt(ele.percent)
                                })

                            })

                            plan_el.push({
                                product_topic: el.product_topic,
                                number: plan_el.length + 1,
                                plan_id: el.plan_id,
                                plan_name: el.product_name,
                                volume: el.volume,
                                volume_type: el.volume_type,
                                nutrient: pie,
                                material: element_plant,
                                image: el.image,
                                user_id: el.user_id,
                                name: el.name,
                                price_obj: price_obj,
                                total_price: price_obj * el.volume
                            })


                        } catch (error) {

                        }
                    })



                    element_obj.push({
                        product_id: element,
                        plan: plan_el
                    })
                })
                req.result = element_obj
                next();

            })
        })
    }
}


exports.send_plan_se = function () {
    return function (req, res, next) {


        db.query(`UPDATE product_plan SET send_se = '1' where plan_id = '${req.body.plan_id}'`, function (err, result) {
            if (err) throw err;

            db.query(`UPDATE product_information SET product_status = '2' where product_id = '${req.body.product_id}'`, function (err, result) {
                if (err) throw err;

                next();
            })
        })



    }
}

exports.send_plan_confirm = function () {
    return function (req, res, next) {


        db.query(`UPDATE product_plan SET send_se = '3' where plan_id = '${req.body.plan_id}'`, function (err, result) {
            if (err) throw err;

            db.query(`UPDATE product_information SET product_status = '3' where product_id = '${req.body.product_id}'`, function (err, result) {
                if (err) throw err;

                next();
            })
        })



    }
}

exports.se_send_plan_trader = function () {
    return function (req, res, next) {


        db.query(`UPDATE product_plan SET send_se = '2' where plan_id = '${req.body.plan_id}'`, function (err, result) {
            if (err) throw err;

            db.query(`UPDATE product_information SET product_status = '3' where product_id = '${req.body.product_id}'`, function (err, result) {
                if (err) throw err;

                next();
            })
        })



    }
}

exports.trader_get_plan = function () {
    return function (req, res, next) {
        console.log(req.user_id)
        db.query(`SELECT * FROM (product_plan LEFT JOIN product_information ON product_plan.product_id = product_information.product_id) LEFT JOIN user_information ON product_plan.researcher_id = user_information.user_id where product_information.trader_id = '${req.user_id}' and product_plan.send_se = '2'  order by product_plan.product_id DESC `, function (err, result) {


            if (err) throw err;
            db.query(`SELECT user_information.name,manufacture_information.manufacture_id,manufacture_information.plant_type FROM ((user_information LEFT JOIN farmer_information ON user_information.user_id = farmer_information.user_id) LEFT JOIN manufacture_information ON farmer_information.farmer_id = manufacture_information.farmer_id) WHERE user_information.type_user = '3' order by manufacture_id DESC`, function (err, result_plant) {

                if (err) throw err;

                let element_obj = []
                let id_plan = []
                result.map((element) => {
                    let index
                    index = id_plan.findIndex((el) => el === element.product_id)
                    if (index < 0) {
                        if (element.product_id !== null) {
                            id_plan.push(
                                element.product_id
                            )
                        }
                    } else {
                    }

                })
                id_plan.map((element) => {


                    let plan_obj = []
                    let plan_el = []

                    result.map((el) => {
                        if (element === el.product_id) {
                            plan_obj.push(el)

                        } else { }
                    })

                    plan_obj.map((el) => {

                        try {

                            let nutrient_obj = JSON.parse(el.nutrient_precent)
                            let plant_obj = JSON.parse(el.plant)
                            let element_nutrient = []
                            let element_plant = []
                            let cost = 0




                            nutrient_obj.map((elem) => {
                                element_nutrient.push(elem)
                            })
                            let price_obj = 0
                            plant_obj.map((elem) => {

                                let total = 0, count = 0, some = 0
                                let test = 0
                                

                                result_plant.map((element_plant) => {

                                    let plant_db_obj

                                    if (element_plant.plant_type !== null) {
                                        try {


                                            plant_db_obj = JSON.parse(element_plant.plant_type)

                                            // let consumer = 0 ,compiler=0,enterprise=0,mill=0,supermarket=0,agent=0,xexport=0,processing=0,seed=0,other=0


                                            plant_db_obj.map((element_plant_db_obj) => {

                                                if (elem.plant_name === element_plant_db_obj.plant) {
                                                    let rice_sell = []
                                                    rice_sell = element_plant_db_obj.rice_sell_array

                                                    if (rice_sell !== undefined) {

                                                        rice_sell.map((element_rice_sell) => {

                                                            if (element_rice_sell.rice_sell === "ผู้บริโภคโดยตรง") {

                                                                total += parseInt(element_rice_sell.price_consumer)
                                                                count++

                                                            } else if (eleme.rice_sell === "ผู้รวบรวมสินค้าเกษตร/เกษตรกร") {

                                                                total += parseInt(element_rice_sell.price_compiler)
                                                                count++

                                                            } else if (eleme.rice_sell === "ส่งให้กลุ่มวิสาหกิจของตัวเอง") {
                                                                total += parseInt(element_rice_sell.price_enterprise)
                                                                count++
                                                            } else if (eleme.rice_sell === "โรงสี") {
                                                                total += parseInt(element_rice_sell.price_mill)
                                                                count++
                                                            } else if (eleme.rice_sell === "ห้างร้านหรือซุปเปอร์มาร์เก็ตหรือร้านค้าปลีก") {
                                                                total += parseInt(element_rice_sell.price_supermarket)
                                                                count++
                                                            } else if (eleme.rice_sell === "ตัวแทนส่งออก") {
                                                                total += parseInt(element_rice_sell.price_agent)
                                                                count++
                                                            } else if (eleme.rice_sell === "ส่งออกไปต่างประเทศ") {
                                                                total += parseInt(element_rice_sell.price_export)
                                                                count++
                                                            } else if (eleme.rice_sell === "โรงงานแปรรูป") {
                                                                total += parseInt(element_rice_sell.price_processing_plant)
                                                                count++
                                                            } else if (eleme.rice_sell === "ขายเมล็ดพันธุ์") {
                                                                total += parseInt(element_rice_sell.price_seed)
                                                                count++
                                                            } else if (eleme.rice_sell === "อื่นๆ ระบุ") {
                                                                total += parseInt(element_rice_sell.price_other)
                                                                count++
                                                            } else { }

                                                        })

                                                    } else {

                                                    }


                                                } else { }
                                            })


                                        } catch (error) {

                                        }
                                    }

                                })
                                some = total / count

                                if (elem.volume_type === "กรัม") {
                                    some = some / 1000
                                } else if (elem.volume_type === "ตัน") {
                                    some = some * 1000
                                } else {

                                }
                                let some_2=some.toFixed(2)
                                element_plant.push({
                                    plant_name: elem.plant_name,
                                    volume: elem.volume,
                                    volume_type: elem.volume_type,
                                    price_kg: some_2,
                                    price_volume: some_2 * elem.volume
                                })

                            })
                            element_plant.map((ele) => {
                                price_obj += ele.price_volume
                            })

                            let pie = []
                            element_nutrient.map((ele) => {
                                pie.push({
                                    name: ele.nutrient,
                                    y: parseInt(ele.percent)
                                })

                            })

                            plan_el.push({
                                product_topic: el.product_topic,
                                number: plan_el.length + 1,
                                plan_id: el.plan_id,
                                plan_name: el.product_name,
                                nutrient: pie,
                                material: element_plant,
                                image: el.image,
                                user_id: el.user_id,
                                name: el.name,
                                price_obj: price_obj,
                                volume: el.volume,
                                volume_type: el.volume_type,
                                price_all: price_obj * el.volume

                            })


                        } catch (error) {

                        }
                    })



                    element_obj.push({
                        product_id: element,
                        plan: plan_el
                    })
                })
                req.result = element_obj
                next();

            })
        })
    }
}

exports.trader_get_plan_confirm = function () {
    return function (req, res, next) {

        db.query(`SELECT * FROM (product_plan LEFT JOIN product_information ON product_plan.product_id = product_information.product_id) LEFT JOIN user_information ON product_plan.researcher_id = user_information.user_id where product_information.trader_id = '${req.user_id}' and product_plan.confirm = '1'`, function (err, result) {
            if (err) throw err;
            // req.result = result;
            let element_obj = []
            let id_plan = []
            result.map((element) => {
                let index
                index = id_plan.findIndex((el) => el === element.product_id)
                if (index < 0) {
                    if (element.product_id !== null) {
                        id_plan.push(
                            element.product_id
                        )
                    }
                } else {
                }

            })
            id_plan.map((element) => {
                let plan_obj = []
                let plan_el = []

                result.map((el) => {
                    if (element === el.product_id) {
                        plan_obj.push(el)

                    } else { }
                })
                plan_obj.map((el) => {
                    try {
                        let nutrient_obj = JSON.parse(el.nutrient_precent)
                        let plant_obj = JSON.parse(el.plant)
                        let element_nutrient = []
                        let element_plant = []



                        nutrient_obj.map((elem) => {
                            element_nutrient.push(elem)
                        })

                        plant_obj.map((elem) => {
                            element_plant.push(elem)
                        })




                        plan_el.push({

                            number: plan_el.length + 1,
                            plan_name: el.product_name,
                            nutrient: element_nutrient,
                            material: element_plant,
                            image: el.image,
                            user_id: el.user_id,
                            name: el.name
                        })


                    } catch (error) {

                    }
                })

                element_obj.push({
                    product_id: element,
                    plan: plan_el
                })
            })
            req.result = element_obj
            next();

        })
    }
}

exports.update_confirm_plan = function () {
    return function (req, res, next) {

        let planInfo = {
            plan_id: req.body.plan_id,
            confirm: req.body.confirm
        }

        db.query(`UPDATE product_plan SET confirm = '${req.body.confirm}' where plan_id = '${req.body.plan_id}'`, function (err, result) {
            if (err) throw err;
            next();
        })



    }
}

exports.update_plan = function () {
    return function (req, res, next) {

        // req.body.plan_id &&
        // req.body.product_topic &&
        // req.body.plant &&
        // req.body.image 
        // console.log(req.body.image)
        let planInfo = {

            plan_id: req.body.plan_id,
            product_topic: req.body.product_topic,
            nutrient: req.body.nutrient,
            plant: req.body.plant,
            image: req.body.image
        }

        db.query(`UPDATE product_plan SET product_topic = '${planInfo.product_topic}',nutrient_precent = '${planInfo.nutrient}', plant = '${planInfo.plant}', image = "image_base64" where plan_id = '${planInfo.plan_id}'`, function (err, result) {
            if (err) throw err;
            if (planInfo.image) {
                let product_image = req.body.image.slice(req.body.image.indexOf(',') + 1)
                require("fs").writeFile("./image/plan/plan-" + planInfo.plan_id + '.png', product_image, 'base64', function (err) {
                    if (err) throw err;
                    db.query(`UPDATE product_plan SET image = 'plan/image/plan-${planInfo.plan_id}.png'  WHERE plan_id = ${planInfo.plan_id}`, function (err, result) {
                        if (err) throw err;
                        next()
                    });

                });
            } else {
                next();
            }
        })



    }
}


// exports.get_all_product = function () {
//     return function (req, res, next) {

//         db.query(`SELECT * FROM product_plan LEFT JOIN product_information ON product_plan.product_id = product_information.product_id `, function (err, result) {
//             if (err) throw err;
//             // req.result = result;
//             let element_obj =[]
//             let product_name = []
//             let id_plan =[]
//             result.map((element) => {
//                 let index
//                 index = id_plan.findIndex((el) => el === element.product_id)
//                 if (index < 0) {
//                     if (element.product_id !== null) {
//                         id_plan.push(
//                             element.product_id
//                         )
//                     }
//                 } else {
//                  }

//             })

//             product_name.map((element)=>{
//                 let name = []
//                 let el_name = []
//                 result.map((el_name)=>{
//                     if(element === el_name.product_id){
//                         name.push(el_name)

//                     }else{}
//                 })
//             })

//             id_plan.map((element) => {
//                 let plan_obj = []
//                 let plan_el = []

//                 result.map((el) => {
//                     if(element === el.product_id){
//                         plan_obj.push(el)

//                     }else{}
//                 })
//                 plan_obj.map((el) => {

//                     let nutrient_obj = JSON.parse(el.nutrient)
//                     let plant_obj = JSON.parse(el.plant)
//                     let element_nutrient = []
//                     let element_plant = []


//                     nutrient_obj.map((elem) => {
//                         element_nutrient.push(elem)
//                     })

//                     plant_obj.map((elem) => {
//                         element_plant.push(elem)
//                     })




//                     plan_el.push({

//                         plan_amount : plan_el.length + 1,
//                         // plan_name : el.plan_name,
//                         nutrient : element_nutrient,
//                         material : element_plant,
//                         image : el.image
//                     })
//                 })

//                 element_obj.push({
//                     product_id : element,
//                     plan : plan_el,
//                     product_name :
//                 })
//             })
//             req.result = element_obj
//             next();
//              console.log(result)
//         })
//     }
// }