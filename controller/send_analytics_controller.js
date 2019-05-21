let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let constance = require('../const/constance')
let jsonwebToken = require('jsonwebtoken')
let bcrypt = require('bcryptjs');
let encrytp = require('../const/encrypt')

exports.get_data_radar = function () {
    return function (req, res, next) {

        db.query(`SELECT user_information.name,manufacture_information.manufacture_id,manufacture_information.plant_type FROM ((user_information LEFT JOIN farmer_information ON user_information.user_id = farmer_information.user_id) LEFT JOIN manufacture_information ON farmer_information.farmer_id = manufacture_information.farmer_id) WHERE user_information.type_user = '3' order by manufacture_id DESC`, function (err, result) {
            if (err) throw err;
            let se_obj = []
            let result_obj = []
            let result_real = []
            result.map((element) => {
                let index
                index = se_obj.findIndex((el) => el === element.name)
                if (index < 0) {
                    if (element.plant_type !== null) {
                        se_obj.push(
                            element.name
                        )
                    }
                } else {

                }
            })

            se_obj.map((element) => {

                let sell = 0
                let volume = 0
                let price = 0
                let rice_sell_array = []

                let series = []
                let result_real = []
                let plant_type_obj = []

                result.map((el) => {

                    try {
                        plant_type_obj = JSON.parse(el.plant_type)

                        if (element == el.name) {


                            plant_type_obj.map((ele) => {

                                if (ele.plant === req.body.plant_name) {
                                    // console.log(ele.rice_sell_array)
                                    rice_sell_array.push(...ele.rice_sell_array)
                                } else { }

                            })
                        }
                    } catch (error) {

                    }

                })
                // console.log(rice_sell_array)
                let consumer_volume = 0, compiler_volume = 0, enterprise_volume = 0, mill_volume = 0, supermarket_volume = 0, agent_volume = 0, export_volume = 0, processing_volume = 0, seed_volume = 0, other_volume = 0
                let consumer = 0, compiler = 0, enterprise = 0, mill = 0, supermarket = 0, agent = 0, xexport = 0, processing = 0, seed = 0, other = 0
                let consumer_logistic = 0, compiler_logistic = 0, enterprise_logistic = 0, mill_logistic = 0, supermarket_logistic = 0, agent_logistic = 0, xexport_logistic = 0, processing_logistic = 0, seed_logistic = 0, other_logistic = 0
                let consumer_count = 0, compiler_count = 0, enterprise_count = 0, mill_count = 0, supermarket_count = 0, agent_count = 0, xexport_count = 0, processing_count = 0, seed_count = 0, other_count = 0

                rice_sell_array.map((el) => {

                    if (el.rice_sell === "ผู้บริโภคโดยตรง") {

                        consumer_volume += parseInt(el.sell_consumer_volume)
                        consumer += parseInt(el.price_consumer)

                        if (el.logistic_kg_ton === "ตัน/ครั้ง") {
                            consumer_logistic += parseInt(el.logistic_price) * 1000
                        } else {
                            consumer_logistic += parseInt(el.logistic_price)
                        }
                        consumer_count++

                    } else if (el.rice_sell === "ผู้รวบรวมสินค้าเกษตร/เกษตรกร") {

                        compiler_volume += parseInt(el.sell_compiler_volume)
                        compiler += parseInt(el.price_compiler)

                        if (el.logistic_kg_ton === "ตัน/ครั้ง") {
                            compiler_logistic += parseInt(el.logistic_price) * 1000
                        } else {
                            compiler_logistic += parseInt(el.logistic_price)
                        }

                        compiler_count++

                    } else if (el.rice_sell === "ส่งให้กลุ่มวิสาหกิจของตัวเอง") {

                        enterprise += parseInt(el.price_enterprise)
                        enterprise_volume += parseInt(el.sell_enterprise_volume)

                        if (el.logistic_kg_ton === "ตัน/ครั้ง") {
                            enterprise_logistic += parseInt(el.logistic_price) * 1000
                        } else {
                            enterprise_logistic += parseInt(el.logistic_price)
                        }

                        enterprise_count++

                    } else if (el.rice_sell === "โรงสี") {

                        mill += parseInt(el.price_mill)
                        mill_volume += parseInt(el.sell_mill_volume)

                        if (el.logistic_kg_ton === "ตัน/ครั้ง") {
                            mill_logistic += parseInt(el.logistic_price) * 1000
                        } else {
                            mill_logistic += parseInt(el.logistic_price)
                        }

                        mill_count++

                    } else if (el.rice_sell === "ห้างร้านหรือซุปเปอร์มาร์เก็ตหรือร้านค้าปลีก") {

                        supermarket += parseInt(el.price_supermarket)

                        supermarket_volume += parseInt(el.sell_supermarket_volume)

                        if (el.logistic_kg_ton === "ตัน/ครั้ง") {
                            supermarket_logistic += parseInt(el.logistic_price) * 1000
                        } else {
                            supermarket_logistic += parseInt(el.logistic_price)
                        }

                        supermarket_count++

                    } else if (el.rice_sell === "ตัวแทนส่งออก") {

                        agent += parseInt(el.price_agent)
                        agent_volume += parseInt(el.sell_agent_volume)

                        if (el.logistic_kg_ton === "ตัน/ครั้ง") {
                            agent_logistic += parseInt(el.logistic_price) * 1000
                        } else {
                            agent_logistic += parseInt(el.logistic_price)
                        }

                        agent_count++

                    } else if (el.rice_sell === "ส่งออกไปต่างประเทศ") {

                        xexport += parseInt(el.price_export)
                        export_volume += parseInt(el.sell_export_volume)

                        if (el.logistic_kg_ton === "ตัน/ครั้ง") {
                            xexport_logistic += parseInt(el.logistic_price) * 1000
                        } else {
                            xexport_logistic += parseInt(el.logistic_price)
                        }

                        xexport_count++

                    } else if (el.rice_sell === "โรงงานแปรรูป") {

                        processing += parseInt(el.price_processing_plant)
                        processing_volume += parseInt(el.sell_processing_plant_volume)

                        if (el.logistic_kg_ton === "ตัน/ครั้ง") {
                            processing_logistic += parseInt(el.logistic_price) * 1000
                        } else {
                            processing_logistic += parseInt(el.logistic_price)
                        }

                        processing_count++

                    } else if (el.rice_sell === "ขายเมล็ดพันธุ์") {

                        seed += parseInt(el.price_seed)
                        seed_volume += parseInt(el.sell_seed_volume)

                        if (el.logistic_kg_ton === "ตัน/ครั้ง") {
                            seed_logistic += parseInt(el.logistic_price) * 1000
                        } else {
                            seed_logistic += parseInt(el.logistic_price)
                        }

                        seed_count++

                    } else if (el.rice_sell === "อื่นๆ ระบุ") {

                        other += parseInt(el.price_other)
                        other_volume += parseInt(el.rice_sell_other_volume)

                        if (el.logistic_kg_ton === "ตัน/ครั้ง") {
                            other_logistic += parseInt(el.logistic_price) * 1000
                        } else {
                            other_logistic += parseInt(el.logistic_price)
                        }

                        other_count++

                    }
                })


                let i, j, k = 0, temp = 0
                let sell_all_obj = [consumer / consumer_count, compiler / compiler_count, enterprise / enterprise_count, mill / mill_count, supermarket / supermarket_count, agent / agent_count, xexport / xexport_count, processing / processing_count, seed / seed_count, other / other_count]
                let st_sell = ["ผู้บริโภคโดยตรง", "ผู้รวบรวมสินค้าเกษตร/เกษตรกร", "ส่งให้กลุ่มวิสาหกิจของตัวเอง", "โรงสี", "ห้างร้านหรือซุปเปอร์มาร์เก็ตหรือร้านค้าปลีก", "ตัวแทนส่งออก", "ส่งออกไปต่างประเทศ", "โรงงานแปรรูป", "ขายเมล็ดพันธุ์", "อื่นๆ ระบุ"]
                let volume_all_obj = [consumer_volume / consumer_count, compiler_volume / compiler_count, enterprise_volume / enterprise_count, mill_volume / mill_count, supermarket_volume / supermarket_count, agent_volume / agent_count, export_volume / xexport_count, processing_volume / processing_count, seed_volume / seed_count, other_volume / other_count]
                let st_volume = ["ผู้บริโภคโดยตรง", "ผู้รวบรวมสินค้าเกษตร/เกษตรกร", "ส่งให้กลุ่มวิสาหกิจของตัวเอง", "โรงสี", "ห้างร้านหรือซุปเปอร์มาร์เก็ตหรือร้านค้าปลีก", "ตัวแทนส่งออก", "ส่งออกไปต่างประเทศ", "โรงงานแปรรูป", "ขายเมล็ดพันธุ์", "อื่นๆ ระบุ"]
                let logistic_all_obj = [consumer_logistic / consumer_count, compiler_logistic / compiler_count, enterprise_logistic / enterprise_count, mill_logistic / mill_count, supermarket_logistic / supermarket_count, agent_logistic / agent_count, xexport_logistic / xexport_count, processing_logistic / processing_count, seed_logistic / seed_count, other_logistic / other_count]
                let st_logistic = ["ผู้บริโภคโดยตรง", "ผู้รวบรวมสินค้าเกษตร/เกษตรกร", "ส่งให้กลุ่มวิสาหกิจของตัวเอง", "โรงสี", "ห้างร้านหรือซุปเปอร์มาร์เก็ตหรือร้านค้าปลีก", "ตัวแทนส่งออก", "ส่งออกไปต่างประเทศ", "โรงงานแปรรูป", "ขายเมล็ดพันธุ์", "อื่นๆ ระบุ"]
                let st_s = ""
                let sell_all = []
                let volume_all = []
                let logistic_all = []
                let data_sell = []
                let data_volume = []
                let data_logistic = []
                let serries = []

                sell_all_obj.map((el) => {
                    if (el > 0) {
                        sell_all.push(el)

                    } else {
                        sell_all.push(0)

                    }

                })

                volume_all_obj.map((el) => {
                    if (el > 0) {
                        volume_all.push(el)
                    } else {
                        volume_all.push(0)
                    }
                })

                logistic_all_obj.map((el) => {
                    if (el > 0) {
                        logistic_all.push(el)
                    } else {
                        logistic_all.push(0)
                    }
                })




                for (i = 1; i < 10; i++) {

                    for (j = 0; j < (10 - i); j++) {
                        if (sell_all[j] < sell_all[j + 1]) {

                            temp = sell_all[j]
                            st_s = st_sell[j]
                            sell_all[j] = sell_all[j + 1]
                            st_sell[j] = st_sell[j + 1]
                            sell_all[j + 1] = temp
                            st_sell[j + 1] = st_s

                        }
                    }
                }


                st_sell.map((el) => {
                    if (sell_all[k] > 0) {

                        data_sell.push({
                            sell: el,
                            value: sell_all[k]
                        })

                    }
                    k++
                })

                k = 0

                for (i = 1; i < 10; i++) {

                    for (j = 0; j < (10 - i); j++) {
                        if (logistic_all[j] > logistic_all[j + 1]) {

                            temp = logistic_all[j]
                            st_s = st_logistic[j]
                            logistic_all[j] = logistic_all[j + 1]
                            st_logistic[j] = st_logistic[j + 1]
                            logistic_all[j + 1] = temp
                            st_logistic[j + 1] = st_s

                        }
                    }
                }



                st_logistic.map((el) => {
                    if (logistic_all[k] > 0) {

                        data_logistic.push({
                            sell: el,
                            value: logistic_all[k]
                        })

                    }
                    k++

                })

                k = 0


                for (i = 1; i < 10; i++) {

                    for (j = 0; j < (10 - i); j++) {
                        if (volume_all[j] < volume_all[j + 1]) {

                            temp = volume_all[j]
                            st_s = st_volume[j]
                            volume_all[j] = volume_all[j + 1]
                            st_volume[j] = st_volume[j + 1]
                            volume_all[j + 1] = temp
                            st_volume[j + 1] = st_s

                        }
                    }
                }




                st_volume.map((el) => {
                    if (volume_all[k] > 0) {

                        data_volume.push({
                            sell: el,
                            value: volume_all[k]
                        })

                    }
                    k++
                })

                k = 0


                if (data_sell.length !== 0) {
                    series.push({
                        max_price: data_sell
                    })
                }

                // console.log(data_logistic.length)
                if (data_logistic.length !== 0) {
                    series.push({
                        min_logistic: data_logistic
                    })
                }

                if (data_volume.length !== 0) {
                    series.push({
                        max_volume: data_volume
                    })

                }

                if (series.length !== 0) {
                    result_obj.push({
                        se_name: element,
                        min_logistic: data_logistic,
                        max_price: data_sell,
                        max_volume: data_volume
                        // max_price: [],
                        // max_volume:data_volume
                    })
                }





            })
            // result_real.push({
            //     plant: req.body.plant_name,
            //     data: result_obj

            // })
            req.result = result_obj
            next();
        })
    }
}

exports.get_plant = function () {
    return function (req, res, next) {

        db.query(`SELECT user_information.name,manufacture_information.manufacture_id,manufacture_information.plant_type FROM ((user_information LEFT JOIN farmer_information ON user_information.user_id = farmer_information.user_id) LEFT JOIN manufacture_information ON farmer_information.farmer_id = manufacture_information.farmer_id) WHERE user_information.type_user = '3' order by manufacture_id DESC`, function (err, result) {
            if (err) throw err;
            db.query(`SELECT plan_id,product_plan.product_id,product_topic,product_name,nutrient_precent,plant,image,volume,volume_type FROM product_plan LEFT JOIN product_information ON product_plan.product_id = product_information.product_id WHERE send_se = '3' order by product_plan.plan_id DESC`, function (err, result_plan) {
                if (err) throw err;

                let disnict_plant = []
                let index = 0
                let result_data = []
                let element_obj
                let all_plant_type = []

                result.map((element, index) => {
                    if (element.plant_type !== null) {
                        try {
                            element_obj = JSON.parse(element.plant_type)
                            all_plant_type.push(...element_obj)
                        } catch (err) {
                        }

                    } else {

                    }

                    element_obj.map((el, i) => {

                        index = disnict_plant.findIndex((find) => find === el.plant)
                        if (index < 0) {
                            disnict_plant.push(el.plant)
                        } else {

                        }

                    })


                })


                let month_obj = []
                let count_month = 0

                disnict_plant.map((element) => {

                    let january = 0
                    let febuary = 0
                    let march = 0
                    let april = 0
                    let may = 0
                    let june = 0
                    let july = 0
                    let august = 0
                    let september = 0
                    let october = 0
                    let november = 0
                    let december = 0

                    all_plant_type.map((el) => {

                        if (element === el.plant) {

                            //(el.deliver_frequency * el.deliver_value)paseInt     el.deliver ต้องเป็น Int เท่านั้น

                            if (el.end_plant == "มกราคม") {
                                january = january + (el.deliver_frequency_number * el.deliver_value)
                            } else if (el.end_plant == "กุมภาพันธ์") {
                                febuary = febuary + (el.deliver_frequency_number * el.deliver_value)
                            } else if (el.end_plant == "มีนาคม") {
                                march = march + (el.deliver_frequency_number * el.deliver_value)
                            } else if (el.end_plant == "เมษายน") {
                                april = april + (el.deliver_frequency_number * el.deliver_value)
                            } else if (el.end_plant == "พฤษภาคม") {
                                may = may + (el.deliver_frequency_number * el.deliver_value)
                            } else if (el.end_plant == "มิถุนายน") {
                                june = june + (el.deliver_frequency_number * el.deliver_value)
                            } else if (el.end_plant == "กรกฎาคม") {
                                july = july + (el.deliver_frequency_number * el.deliver_value)
                            } else if (el.end_plant == "สิงหาคม") {
                                august = august + (el.deliver_frequency_number * el.deliver_value)

                            } else if (el.end_plant == "กันยายน") {
                                september = september + (el.deliver_frequency_number * el.deliver_value)
                            } else if (el.end_plant == "ตุลาคม") {
                                october = october + (el.deliver_frequency_number * el.deliver_value)
                            } else if (el.end_plant == "พฤศจิกายน") {
                                november = november + (el.deliver_frequency_number * el.deliver_value)
                            } else if (el.end_plant == "ธันวาคม") {
                                december = december + (el.deliver_frequency_number * el.deliver_value)
                            }
                        }



                    })
                    count_month = january + febuary + march + april + may + june + july + august + september + october + november + december

                    if (count_month != 0) {
                        month_obj.push(
                            {

                                name: element,

                                volume: count_month

                            }
                        )
                    }

                })

                let plan_obj = []
                let plant = []
                let plant_real = []
                let result_process = []

                result_plan.map((element, index) => {

                    try {

                        plant.push(...JSON.parse(element.plant))



                    } catch (error) {

                    }
                })

                plant.map((element, index) => {
                    index = plant_real.findIndex((find) => find === element.plant_name)
                    if (index < 0) {
                        plant_real.push(element.plant_name)

                    } else {

                    }
                })

                plant_real.map((element) => {

                    let total_volume = 0

                    result_plan.map((el) => {
                        try {

                            let plant
                            plant = JSON.parse(el.plant)
                            plant.map((ele) => {

                                if (ele.plant_name === element) {

                                    console.log()
                                    if (ele.volume_type === "กิโลกรัม") {
                                        total_volume += parseInt(ele.volume) * parseInt(el.volume)
                                    } else if (ele.volume_type === "กรัม") {
                                        total_volume += parseInt(ele.volume) * parseInt(el.volume) / 1000
                                    } else if (ele.volume_type === "ตัน") {
                                        total_volume += parseInt(ele.volume) * parseInt(el.volume) * 1000

                                    } else { }


                                }
                            })

                        } catch (error) {

                        }

                    })
                    // console.log("total",total_volume)
                    result_process.push({
                        name: element,
                        volume: total_volume

                    })
                })
                let plan_plant = []
                result_process.map((element) => {

                    let count = 0

                    month_obj.map((el) => {

                        if (el.name === element.name) {
                            count = element.volume - el.volume
                            if (count > 0) {
                                plan_plant.push({
                                    name: element.name,
                                    volume: count
                                })
                            }
                        }

                    })
                })

                result_data.push({
                    all_plant: month_obj,
                    process_plant: result_process,
                    plan: plan_plant
                })

                let result_new = []


                if (req.body.plant_name === "ทั้งหมด") {

                    month_obj.map((element) => {

                        let volume_process = 0
                        let volume_want = 0
                        result_process.map((el) => {
                            let count = 0
                            if (el.name === element.name) {
                                volume_process = el.volume
                                count = parseInt(el.volume) - parseInt(element.volume)
                                if (count > 0) {
                                    volume_want = count
                                } else {
                                    volume_want = 0
                                }
                            }
                        })

                        result_new.push({

                            name: element.name,
                            volume_all: element.volume,
                            volume_process: volume_process,
                            volume_want: volume_want
                        })



                    })
                } else {

                    let volume_all = 0
                    let volume_process = 0
                    let volume_want = 0

                    month_obj.map((element) => {

                        if(element.name === req.body.plant_name){
                            volume_all = element.volume
                        }else{

                        }
                    })

                    result_process.map((element)=>{

                        if(element.name === req.body.plant_name){
                            volume_process = element.volume
                        }else{

                        }

                    })

                    volume_want = volume_process - volume_all

                    if(volume_want<1){
                        volume_want = 0
                    }else{

                    }

                    result_new.push({
                        name: req.body.plant_name,
                        volume_all: volume_all,
                        volume_process: volume_process,
                        volume_want: volume_want
                    })

                }

                req.result = result_new

                next();
            })
        })
    }
}

exports.add_year_round = function () {
    return function (req, res, next) {
        // db.query(`SELECT * FROM user_information where name ='${req.body.name}'`, function (err, result) {
        //     if (err) throw err;
        //     console.log(result)
        db.query(`INSERT INTO  year_round_planing (plan_id,plant,volume,volume_type,se_name) VALUES(null,'${req.body.plant}','${req.body.volume}','${req.body.volume_type}', '${req.body.name}')`, function (err, resultUser) {
            if (err) throw err;
            // req.result = result
            next();
            // })
        })
    }
}

exports.get_plan_se = function () {
    return function (req, res, next) {

        db.query(`SELECT * from user_information where user_id='${req.user_id}'`, function (err, resultUser) {
            if (err) throw err;

            console.log(resultUser[0].name)

            db.query(`SELECT * from year_round_planing where se_name = "${resultUser[0].name}" ORDER BY plan_id DESC`, function (err, result) {
                if (err) throw err;

                req.result = result
                let result_plan_id = []
                result.map((element)=>{
                    if(element.status_reading === 0){
                        result_plan_id.push(element.plan_id)
                    }
                    
                })

                console.log(result_plan_id)

                if(result_plan_id.length===0){
                    
                    next()
                }else{
                    


                     db.query(`UPDATE year_round_planing SET status_reading = 1 , se_id = '${req.user_id}' WHERE plan_id IN (${result_plan_id.join()})`, function (err, resultUser) {
                    if (err) throw err;
          
                next();
      
                })
                }

               

            })

        })
    }
}

exports.get_plan_status = function () {
    return function (req, res, next) {

        db.query(`SELECT * from user_information where user_id='${req.user_id}'`, function (err, resultUser) {
            if (err) throw err;

            console.log(resultUser[0].name)

            db.query(`SELECT * from year_round_planing where se_name = "${resultUser[0].name}" AND status_reading = 0`, function (err, result) {
                if (err) throw err;

                req.result = result.length
                // let result_plan_id = []
                // result.map((element)=>{
                //     if(element.status_reading === 0){
                //         result_plan_id.push(element.plan_id)
                //     }
                    
                // })
                	next();
                // console.log(result_plan_id)

               

            })

        })
    }
}
