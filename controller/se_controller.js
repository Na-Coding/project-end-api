let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let constance = require('../const/constance')
let jsonwebToken = require('jsonwebtoken')
let bcrypt = require('bcryptjs');
let encrytp = require('../const/encrypt')

exports.se_add_se_small = function () {
    return function (req, res, next) {

        db.query(`SELECT username FROM user_information WHERE username = '${req.body.username}'`, function (err, resultUser) {
            if (err) throw err;
            if (typeof resultUser[0] === 'undefined') {

                let registerInfo = {
                    username: req.body.username,
                    password: encrytp.encrytp(req.body.password),
                    name: req.body.name,
                    last_name: req.body.last_name,
                    address: req.body.address,
                    type_user: 3,
                    team_code: req.body.team_code
                    // team_code: req.body.insertId
                }
                db.query(`INSERT INTO user_information (user_id,username,password,name,last_name,address,type_user,team_code,user_informationcol) VALUES
                        (null,'${registerInfo.username}','${registerInfo.password}','${registerInfo.name}','${registerInfo.last_name}','${registerInfo.address}','${registerInfo.type_user}','${req.user_id}','-')`, function (err, result) {
                        if (err) throw err;
                        console.log(result.insertId)
                        req.token = jsonwebToken.sign({ id: result.insertId }, constance.sign)

                        next();
                    })

            } else {

                res.status(200).json(errorMessages.err_user_already)
                return;
            }


        })


    }
}

exports.se_update_se_small = function () {
    return function (req, res, next) {

        let registerInfo = {
            username: req.body.username,
            password: encrytp.encrytp(req.body.password),
            name: req.body.name,
            last_name: req.body.last_name,
            address: req.body.address,
            // team_code: req.body.insertId
        }

        db.query(`UPDATE user_information SET username = '${registerInfo.username}',password = '${registerInfo.password}', name = '${registerInfo.name}',last_name = '${registerInfo.last_name}',address  = '${registerInfo.address}' where user_id = '${req.body.user_id}'`, function (err, resultUser) {
            if (err) throw err;
            next();

        })
    }
}

exports.get_user_se = function () {
    return function (req, res, next) {
        db.query(`SELECT  * FROM user_information where team_code = ${req.body.team_code}`, function (err, result) {
            if (err) throw err;
            req.result = result;
            next();

        })
    }
}

exports.se_delete_se_small = function () {
    return function (req, res, next) {
        db.query(`DELETE FROM user_information where user_id = ${req.body.user_id}`, function (err, result) {
            if (err) throw err;
            req.result = result;
            next();

        })
    }
}

exports.get_se_all_farmer = function () {
    return function (req, res, next) {
        db.query(`SELECT * FROM farmer_information INNER JOIN user_information ON farmer_information.user_id = user_information.user_id WHERE user_information.team_code = ${req.body.team_code}`, function (err, result) {
            if (err) throw err;
            req.result = result;
            next();

        })
    }
}

exports.get_se_small = function () {
    return function (req, res, next) {

        db.query(`SELECT * FROM user_information WHERE team_code = ${req.user_id}`, function (err, result) {
            if (err) throw err;
            req.result = result;
            next();

        })
    }
}

exports.se_add_trader = function () {
    return function (req, res, next) {
        db.query(`SELECT username FROM user_information WHERE username = '${req.body.username}'`, function (err, resultUser) {
            if (err) throw err;
            if (typeof resultUser[0] === 'undefined') {

                let registerInfo = {
                    username: req.body.username,
                    password: encrytp.encrytp(req.body.password),
                    name: req.body.name,
                    last_name: req.body.last_name,
                    address: req.body.address,
                    type_user: 2,
                    team_code: req.body.team_code
                    // team_code: req.body.insertId
                }
                db.query(`INSERT INTO user_information (user_id,username,password,name,last_name,address,type_user,team_code) VALUES
                        (null,'${registerInfo.username}','${registerInfo.password}','${registerInfo.name}','${registerInfo.last_name}','${registerInfo.address}','${registerInfo.type_user}','${req.user_id}')`, function (err, result) {
                        if (err) throw err;
                        console.log(result.insertId)
                        req.token = jsonwebToken.sign({ id: result.insertId }, constance.sign)

                        next();
                    })

            } else {

                res.status(200).json(errorMessages.err_user_already)
                return;
            }


        })

    }
}

exports.se_add_researcher = function () {
    return function (req, res, next) {
        db.query(`SELECT username FROM user_information WHERE username = '${req.body.username}'`, function (err, resultUser) {
            if (err) throw err;
            if (typeof resultUser[0] === 'undefined') {

                let registerInfo = {
                    username: req.body.username,
                    password: encrytp.encrytp(req.body.password),
                    name: req.body.name,
                    last_name: req.body.last_name,
                    address: req.body.address,
                    type_user: 1,
                    team_code: req.body.team_code
                    // team_code: req.body.insertId
                }
                db.query(`INSERT INTO user_information (user_id,username,password,name,last_name,address,type_user,team_code) VALUES
                        (null,'${registerInfo.username}','${registerInfo.password}','${registerInfo.name}','${registerInfo.last_name}','${registerInfo.address}','${registerInfo.type_user}','${req.user_id}')`, function (err, result) {
                        if (err) throw err;
                        console.log(result.insertId)
                        req.token = jsonwebToken.sign({ id: result.insertId }, constance.sign)

                        next();
                    })

            } else {

                res.status(200).json(errorMessages.err_user_already)
                return;
            }


        })

    }
}

exports.se_update_trader = function () {
    return function (req, res, next) {
        let registerInfo = {
            username: req.body.username,
            password: encrytp.encrytp(req.body.password),
            name: req.body.name,
            last_name: req.body.last_name,
            address: req.body.address,
            // team_code: req.body.insertId
        }

        db.query(`UPDATE user_information SET username = '${registerInfo.username}',password = '${registerInfo.password}', name = '${registerInfo.name}',last_name = '${registerInfo.last_name}',address  = '${registerInfo.address}' where user_id = '${req.body.user_id}'`, function (err, resultUser) {
            if (err) throw err;
            next();

        })
    }
}

exports.se_update_researcher = function () {
    return function (req, res, next) {
        let registerInfo = {
            username: req.body.username,
            password: encrytp.encrytp(req.body.password),
            name: req.body.name,
            last_name: req.body.last_name,
            address: req.body.address,
            // team_code: req.body.insertId
        }

        db.query(`UPDATE user_information SET username = '${registerInfo.username}',password = '${registerInfo.password}', name = '${registerInfo.name}',last_name = '${registerInfo.last_name}',address  = '${registerInfo.address}' where user_id = '${req.body.user_id}'`, function (err, resultUser) {
            if (err) throw err;
            next();

        })
    }
}


exports.se_delete_trader = function () {
    return function (req, res, next) {
        db.query(`DELETE FROM user_information where user_id = ${req.body.user_id}`, function (err, result) {
            if (err) throw err;
            req.result = result;
            next();

        })
    }
}

exports.se_delete_researcher = function () {
    return function (req, res, next) {
        db.query(`DELETE FROM user_information where user_id = ${req.body.user_id}`, function (err, result) {
            if (err) throw err;
            req.result = result;
            next();

        })
    }
}

exports.get_plant_type_chart = function () {
    return function (req, res, next) {
        console.log(req)
        db.query(`SELECT manufacture_information.plant_type,user_information.name FROM ((user_information LEFT JOIN farmer_information ON user_information.user_id = farmer_information.user_id) LEFT JOIN manufacture_information ON farmer_information.farmer_id = manufacture_information.farmer_id) WHERE user_information.type_user = '3'`, function (err, result) {
            if (err) throw err;

            let disnict_plant = []
            let index = 0

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


            console.log("disnict_plant", disnict_plant)
            console.log("all_plant_type", all_plant_type)


            let month_obj = []

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
                            console.log(august)
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
                month_obj.push(
                    {

                        name: element,

                        data: [january, febuary, march, april, may, june, july, august, september, october, november, december]

                    }
                )
            })

            
            req.result = month_obj

            next();

        })
    }
}

exports.get_se_chart_value = function () {
    return function (req, res, next) {

        let plant_info = {
            team_code: req.body.team_code,
            month: req.body.month,
            plant: req.body.plant
        }

        db.query(`SELECT user_information.name,manufacture_information.plant_type FROM ((user_information LEFT JOIN farmer_information ON user_information.user_id = farmer_information.user_id) LEFT JOIN manufacture_information ON farmer_information.farmer_id = manufacture_information.farmer_id) WHERE user_information.type_user = '3'`, function (err, result) {
            if (err) throw err;
            // req.result = result

            let element_obj
            let se_obj = []


            result.map((element) => {
                let index
                index = se_obj.findIndex((el) => el === element.name)
                if (index < 0) {
                    se_obj.push(
                        element.name
                    )
                } else {

                }
            })
            let se_result_obj = []
            console.log(se_obj)
            // let test_result = []

            se_obj.map((element) => {
                let plant_value_total = 0

                result.map((el) => {

                    if (el.plant_type !== null) {

                        if (element === el.name) {
                            let se_plant
                            let plant_value = 0
                            try {
                                se_plant = JSON.parse(el.plant_type)
                                se_plant.map((ele) => {

                                    // test_result.push(
                                    //     {
                                    //       name : element,
                                    //       plant : ele.plant,
                                    //       value : ele.deliver_frequency * ele.deliver_value,
                                    //       month : ele.end_plant
                                    //     }

                                    // )
                                    if (ele.plant === plant_info.plant && ele.end_plant === plant_info.month) {
                                        plant_value = plant_value + (ele.deliver_frequency_number * ele.deliver_value)

                                    }
                                })
                                plant_value_total = plant_value_total + plant_value
                            } catch (err) {

                            }


                        }

                    } else {

                    }


                })


                if (plant_value_total > 0) {
                    se_result_obj.push(
                        {
                            se_name: element,
                            plant: plant_info.plant,
                            data: plant_value_total
                        }
                    )
                }

                // console.log(plant_obj)
            })



            // console.log(se_obj)
            // result.map((element, index) => {

            //     element_obj = JSON.parse(element.plant_type)
            //     console.log(element.name)

            //     if(element === element.name){

            //         element_obj.map((el, i) => {
            //             let plant_value = 0

            //             if(el === el.plant){
            //                 plant_value = plant_value + (el.deliver_frequency * el.deliver_value)
            //             }

            //             se_obj.push(
            //                 {
            //                     name : element,
            //                     plant : el,
            //                     date : plant_value
            //                 }
            //             )

            //         })
            //     }


            // })






            req.result = se_result_obj
            next();


        })
    }
}

exports.get_all_chart = function () {
    return function (req, res, next) {


        db.query(`SELECT user_information.name,manufacture_information.plant_type FROM ((user_information LEFT JOIN farmer_information ON user_information.user_id = farmer_information.user_id) LEFT JOIN manufacture_information ON farmer_information.farmer_id = manufacture_information.farmer_id) WHERE user_information.type_user = '3'`, function (err, result) {
            if (err) throw err;
            // req.result = result

            let element_obj
            let se_obj = []
            // let se_plant = []


            result.map((element) => {
                let index
                index = se_obj.findIndex((el) => el === element.name)
                if (index < 0) {
                    if (element.plant_type !== null) {
                        try {
                            JSON.parse(element.plant_type)
                            se_obj.push(
                                element.name
                            )
                        } catch (err) {
                        } 

                    } else { }
                } else {

                }
            })
            let name_se = []

            let test_result = []
            se_obj.map((element) => {
         
                let plant_el = []
                let se_plant_el = []
                let month = []

                result.map((el) => {
              
                    if (element === el.name) {
                   

                        let se_plant
                        try {
                            se_plant = JSON.parse(el.plant_type)
                    
                            se_plant.map((ele) => {

                                test_result.push(
                                    {
                                        name: element,
                                        plant: ele.plant,
                                        eliver_frequency_number :ele.eliver_frequency_number,
                                        deliver_value : ele.deliver_value,
                                        value: ele.eliver_frequency_number * ele.deliver_value,
                                        month: ele.end_plant
                                    }

                                )

                                index = plant_el.findIndex((elem) => elem === ele.plant)
                                if (index < 0) {
                                    plant_el.push(
                                        ele.plant
                                    )
                                } else {

                                }

                            })
                        } catch (err) {

                        }



                    }



                })



                plant_el.map((el_plant, index) => {

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

                    result.map((elem_plant) => {

                        let element_plant
                        try {
                            element_plant = JSON.parse(elem_plant.plant_type)
                        }
                        catch (err) {

                        }
                        // console.log(element_plant)
                        if (element_plant) {


                            element_plant.map((elem_plant_obj) => {
                                if (el_plant === elem_plant_obj.plant && element === elem_plant.name) {

                                    if (elem_plant_obj.end_plant == "มกราคม") {
                                        january = january + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    } else if (elem_plant_obj.end_plant == "กุมภาพันธ์") {
                                        febuary = febuary + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    } else if (elem_plant_obj.end_plant == "มีนาคม") {
                                        march = march + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    } else if (elem_plant_obj.end_plant == "เมษายน") {
                                        april = april + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    } else if (elem_plant_obj.end_plant == "พฤษภาคม") {
                                        may = may + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    } else if (elem_plant_obj.end_plant == "มิถุนายน") {
                                        june = june + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    } else if (elem_plant_obj.end_plant == "กรกฎาคม") {
                                        july = july + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    } else if (elem_plant_obj.end_plant == "สิงหาคม") {
                                        august = august + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    } else if (elem_plant_obj.end_plant == "กันยายน") {
                                        september = september + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    } else if (elem_plant_obj.end_plant == "ตุลาคม") {
                                        october = october + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    } else if (elem_plant_obj.end_plant == "พฤศจิกายน") {
                                        november = november + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    } else if (elem_plant_obj.end_plant == "ธันวาคม") {
                                        december = december + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    }

                                }


                            })




                        }
                    })

                    month.push({
                        name: el_plant,
                        data: [january, febuary, march, april, may, june, july, august, september, october, november, december]
                    })


                })



                name_se.push(
                    {
                        se_name: element,
                        plant: month
                    }
                )

            })


            req.result = name_se
            next();


        })
    }
}


exports.get_allname_se = function () {
    return function (req, res, next) {
        db.query(`SELECT name,type_user FROM user_information where type_user = '3' `, function (err, result) {
            if (err) throw err;

            let all_name_se = []

            result.map((element, index) => {

                if (element.name !== null) {
                    try {

                        all_name_se.push({name:element.name})

                    } catch (error) {
                    }
                } else { }
            })

            req.result = all_name_se;
            next();

        })
    }
}


exports.get_linechart_some_se = function () {
    return function (req, res, next) {


        db.query(`SELECT user_information.name,manufacture_information.plant_type FROM ((user_information LEFT JOIN farmer_information ON user_information.user_id = farmer_information.user_id) LEFT JOIN manufacture_information ON farmer_information.farmer_id = manufacture_information.farmer_id) WHERE user_information.type_user = '3'`, function (err, result) {
            if (err) throw err;
            // req.result = result

            let element_obj
            let se_obj = []
            // let se_plant = []


            result.map((element) => {
                let index
                index = se_obj.findIndex((el) => el === element.name)
                if (index < 0) {
                    if (element.plant_type !== null) {
                        try {
                            JSON.parse(element.plant_type)
                            se_obj.push(
                                element.name
                            )
                        } catch (err) {
                        } 

                    } else { }
                } else {

                }
            })
            let name_se = []

            let test_result = []
            let keep_req = req.body.some_se_name

        
         
                let plant_el = []
                let se_plant_el = []
                let month = []

                result.map((el) => {
              
                    if (el.name === keep_req) {
                   

                        let se_plant
                        try {
                            se_plant = JSON.parse(el.plant_type)
                    
                            se_plant.map((ele) => {

                                test_result.push(
                                    {
                                        name: keep_req,
                                        plant: ele.plant,
                                        eliver_frequency_number :ele.eliver_frequency_number,
                                        deliver_value : ele.deliver_value,
                                        value: ele.eliver_frequency_number * ele.deliver_value,
                                        month: ele.end_plant
                                    }

                                )

                                index = plant_el.findIndex((elem) => elem === ele.plant)
                                if (index < 0) {
                                    plant_el.push(
                                        ele.plant
                                    )
                                } else {

                                }

                            })
                        } catch (err) {

                        }

                    }
                    


                })
                
                plant_el.map((el_plant, index) => {

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

                    result.map((elem_plant) => {

                        let element_plant
                        try {
                            element_plant = JSON.parse(elem_plant.plant_type)
                        }
                        catch (err) {

                        }
                        // console.log(element_plant)
                        if (element_plant) {


                            element_plant.map((elem_plant_obj) => {
                                if (el_plant === elem_plant_obj.plant && keep_req === elem_plant.name) {

                                    if (elem_plant_obj.end_plant == "มกราคม") {
                                        january = january + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    } else if (elem_plant_obj.end_plant == "กุมภาพันธ์") {
                                        febuary = febuary + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    } else if (elem_plant_obj.end_plant == "มีนาคม") {
                                        march = march + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    } else if (elem_plant_obj.end_plant == "เมษายน") {
                                        april = april + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    } else if (elem_plant_obj.end_plant == "พฤษภาคม") {
                                        may = may + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    } else if (elem_plant_obj.end_plant == "มิถุนายน") {
                                        june = june + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    } else if (elem_plant_obj.end_plant == "กรกฎาคม") {
                                        july = july + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    } else if (elem_plant_obj.end_plant == "สิงหาคม") {
                                        august = august + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    } else if (elem_plant_obj.end_plant == "กันยายน") {
                                        september = september + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    } else if (elem_plant_obj.end_plant == "ตุลาคม") {
                                        october = october + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    } else if (elem_plant_obj.end_plant == "พฤศจิกายน") {
                                        november = november + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    } else if (elem_plant_obj.end_plant == "ธันวาคม") {
                                        december = december + (elem_plant_obj.deliver_frequency_number * elem_plant_obj.deliver_value)
                                    }

                                }


                            })




                        }
                    })

                    month.push({
                        name: el_plant,
                        data: [january, febuary, march, april, may, june, july, august, september, october, november, december]
                    })


                })




            

                name_se.push(
                    {
                        se_name: keep_req,
                        plant: month
                    }
                )
       


            req.result = name_se
            next();


        })
    }
}

exports.get_plant_volume_all_se = function () {
    return function (req, res, next) {

        let plant_info = {
            plant: req.body.name_plant
        }

        db.query(`SELECT user_information.name,manufacture_information.plant_type FROM ((user_information LEFT JOIN farmer_information ON user_information.user_id = farmer_information.user_id) LEFT JOIN manufacture_information ON farmer_information.farmer_id = manufacture_information.farmer_id) WHERE user_information.type_user = '3'`, function (err, result) {
            if (err) throw err;
            // req.result = result

            let element_obj
            let se_obj = []


            result.map((element) => {
                let index
                index = se_obj.findIndex((el) => el === element.name)
                if (index < 0) {
                    se_obj.push(
                        element.name
                    )
                } else {

                }
            })
            let se_result_obj = []
            // console.log(se_obj)
            // let test_result = []

            se_obj.map((element) => {
                let plant_value_total = 0

                result.map((el) => {

                    if (el.plant_type !== null) {

                        if (element === el.name) {
                            let se_plant
                            let plant_value = 0
                            try {
                               
                                
                                se_plant = JSON.parse(el.plant_type)
                                // console.log(se_plant);
                                se_plant.map((ele) => {

                                 
                                    if (ele.plant === plant_info.plant && ele.end_plant) {
                                        plant_value = plant_value + (ele.deliver_frequency_number * ele.deliver_value)

                                    }
                                })
                                plant_value_total = plant_value_total + plant_value
                            } catch (err) {

                            }


                        }

                    } else {

                    }


                })
                console.log(plant_value_total);
                

                if (plant_value_total > 0) {
                    se_result_obj.push(
                        {
                            se_name: element,
                            plant: plant_info.plant,
                            data: plant_value_total
                        }
                    )
                }

                // console.log(plant_obj)
            })

            req.result = se_result_obj
            next();


        })
    }
}