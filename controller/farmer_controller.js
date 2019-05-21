let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let constance = require('../const/constance')

// user Ge,In,De,Up farmer

exports.user_get_farmer = function () {


    return function (req, res, next) {
        // db.query(`SELECT  * FROM farmer_information WHERE user_id  = '${req.user_id}' order by farmer_id  DESC`, function (err, result) {
        db.query(`SELECT 
            farmer_information.farmer_id as farmer_id, 
            farmer_information.first_name as first_name, 
            farmer_information.last_name as last_name, 
            farmer_information.address as address, 
            farmer_information.age as age, 
            farmer_information.member AS member, 
            farmer_information.duration as duration, 
            farmer_information.passion as passion,             
            farmer_information.leader as leader,
            farmer_information.id_card as id_card,
            farmer_information.phone_number as phone_number,
            farmer_information.affiliation_checkbox as affiliation_checkbox,
            farmer_information.family_income as family_income,
            farmer_information.family_expenditure as family_expenditure,
        
            farmer_information.where_debt as where_debt,
            farmer_information.problem_area as problem_area,
            farmer_information.occupy_home as occupy_home,
            farmer_information.liability_array	 as liability_array	,
            farmer_information.email as email,
            farmer_information.step as step,

            logistic_information.logistic_id as logistic_id,  
            logistic_information.logistic_type as logistic_type, 
            logistic_information.logistic_price as logistic_price, 
            logistic_information.logistic_insurance as logistic_insurance, 
            logistic_information.logistic_weight_ton as logistic_weight_ton, 
            logistic_information.logistic_weight_kg as logistic_weight_kg, 
            logistic_information.insurance_price as insurance_price,

            factor_information.factor_id as factor_id,  
            factor_information.manure_type as manure_type, 
            factor_information.manure_type_organic as manure_type_organic,
            factor_information.seed as seed, 
            factor_information.equipment as equipment, 
            factor_information.product_planning as product_planning, 
            factor_information.taking_notes as taking_notes, 
            factor_information.fertilizerfactor as fertilizerfactor, 
            factor_information.purchasefactor as purchasefactor, 
             
            area_information.area_id as area_id, 
            area_information.area_storage as area_storage, 
            area_information.area_wather as area_wather, 
            area_information.water_storage as water_storage, 
            area_information.gps as gps, 
            area_information.chemical_date as area_owner, 
            area_information.employee_type as employee_type, 
            area_information.farm_worker as farm_worker, 
            area_information.transformation as transformation,
            area_information.access_to_information as access_to_information,
            area_information.consultantsource as consultantsource,
            area_information.land_home as land_home,
            area_information.certified as certified,
            
            manufacture_information.manufacture_id as manufacture_id, 
            manufacture_information.program as program, 
            manufacture_information.plant_type as plant_type,
            manufacture_information.plant_type_best as plant_type_best,
            manufacture_information.sell_rice as sell_rice ,

            harvest_information.harvest_id as harvest_id ,
            harvest_information.harvest_manage as harvest_manage ,
            harvest_information.before_after_harvest as before_after_harvest ,
            harvest_information.packing as packing ,
            harvest_information.transformation_exp as transformation_exp ,
            harvest_information.have_otop as have_otop ,
            harvest_information.agricultural_problem as agricultural_problem ,
            harvest_information.data_access as data_access ,
            harvest_information.need_and_problem as need_and_problem
            
            FROM farmer_information 
            LEFT JOIN factor_information ON farmer_information.farmer_id = factor_information.farmer_id 
            LEFT JOIN area_information ON farmer_information.farmer_id = area_information.farmer_id 
            LEFT JOIN logistic_information ON farmer_information.farmer_id = logistic_information.farmer_id 
            LEFT JOIN manufacture_information ON farmer_information.farmer_id = manufacture_information.farmer_id 
            LEFT JOIN harvest_information ON farmer_information.farmer_id = harvest_information.farmer_id 
            WHERE farmer_information.user_id = '${req.user_id}' order by farmer_id  DESC`, function (err, result) {
                if (err) throw err;

                let consult_result = []
                // let json_address = []
                console.log("u_id", req.user_id)




                result.map((element, index) => {
                    let address

                    try {
                        address = JSON.parse(element.address)
                        if (!address || (typeof address != "object")) {
                            address = {
                                province: null,
                                leader: null,
                                district: null,
                                district_tumbons: null,
                                postcode: null,
                                detail: null
                            }
                        }
                    } catch (err) {
                        address = {
                            province: null,
                            leader: null,
                            district: null,
                            district_tumbons: null,
                            postcode: null,
                            detail: null
                        }
                    }

                    let deliver_frequency

                    try {
                        deliver_frequency = JSON.parse(element.deliver_frequency)
                        if (!deliver_frequency || (typeof deliver_frequency != "object")) {
                            deliver_frequency = {
                                deliver_frequency_number: null,
                                deliver_frequency_date: null
                            }
                        }
                    } catch (err) {
                        deliver_frequency = {
                            deliver_frequency_number: null,
                            deliver_frequency_date: null
                        }
                    }


                    let year_value

                    try {
                        year_value = JSON.parse(element.year_value)
                        if (!year_value || (typeof year_value != "object")) {
                            year_value = {
                                year_value: null,
                                year_value_unit: null

                            }
                        }
                    } catch (err) {
                        year_value = {
                            year_value: null,
                            year_value_unit: null

                        }
                    }

                    let logistic_price

                    try {
                        logistic_price = JSON.parse(element.logistic_price)
                        if (!logistic_price || (typeof logistic_price != "object")) {
                            logistic_price = {
                                logistic_price: null,
                                logistic_kg_ton: null

                            }
                        }
                    } catch (err) {
                        logistic_price = {
                            logistic_price: null,
                            logistic_kg_ton: null

                        }
                    }

                    let gps

                    try {
                        gps = JSON.parse(element.gps)
                        if (!gps || (typeof gps != "object")) {
                            gps = {
                                lat: null,
                                lng: null

                            }
                        }
                    } catch (err) {
                        gps = {
                            lat: null,
                            lng: null

                        }
                    }

                    let farm_worker

                    try {
                        farm_worker = JSON.parse(element.farm_worker)
                        if (!farm_worker || (typeof farm_worker != "object")) {
                            farm_worker = {
                                farm_worker: null,
                                farm_worker_num: null

                            }
                        }
                    } catch (err) {
                        farm_worker = {
                            farm_worker: null,
                            farm_worker_num: null

                        }
                    }


                    let employee_type

                    try {
                        employee_type = JSON.parse(element.employee_type)
                        if (!employee_type || (typeof employee_type != "object")) {
                            employee_type = {
                                employee_type:null,
                                employee_type_family:[],
                                
                                farm_worker:null,
                                farm_worker_num:null,
                            }
                        }
                    } catch (err) {
                        employee_type = {
                            employee_type:null,
                            employee_type_family:[],
                            
                            farm_worker:null,
                            farm_worker_num:null,
                        }
                    }

                    let manure_type_organic
                    try {
                        manure_type_organic = JSON.parse(element.manure_type_organic)

                        if (!manure_type_organic || (typeof manure_type_organic != "object")) {
                            manure_type_organic = {
                                manure_type_organic: null,
                                Otherfertilizers: null
                            }
                        }


                    } catch (err) {
                        manure_type_organic = {
                            manure_type_organic: null,
                            Otherfertilizers: null
                        }
                    }



                    let family_income

                    try {
                        family_income = JSON.parse(element.family_income)
                        if (!family_income || (typeof family_income != "object")) {
                            family_income = {

                                family_income_wage: null,
                                family_income_From_Family: null,
                                family_income_Productsales: null,
                                family_income_trade: null,
                                family_income_asset: null,
                                family_income_personalJob: null,
                                family_income_assistance: null

                            }
                        }
                    } catch (err) {
                        family_income = {

                            family_income_wage: null,
                            family_income_From_Family: null,
                            family_income_Productsales: null,
                            family_income_trade: null,
                            family_income_asset: null,
                            family_income_personalJob: null,
                            family_income_assistance: null

                        }
                    }

                    let family_expenditure

                    try {
                        family_expenditure = JSON.parse(element.family_expenditure)
                        if (!family_expenditure || (typeof family_expenditure != "object")) {
                            family_expenditure = {

                                family_expenditure_Consume: null,
                                family_expenditure_education: null,
                                family_expenditure_Health: null,
                                family_expenditure_company: null,
                                family_expenditure_invest: null,
                                family_expenditure_Gamble: null,
                                family_expenditure_Repayment: null

                            }
                        }
                    } catch (err) {
                        family_expenditure = {

                            family_expenditure_Consume: null,
                            family_expenditure_education: null,
                            family_expenditure_Health: null,
                            family_expenditure_company: null,
                            family_expenditure_invest: null,
                            family_expenditure_Gamble: null,
                            family_expenditure_Repayment: null

                        }
                    }



                    let plant_type

                    try {
                        plant_type = JSON.parse(element.plant_type)
                        if (!plant_type || (typeof plant_type != "object")) {
                            plant_type = []
                        }
                    } catch (err) {
                        plant_type = []
                    }



                    let plant_type_best

                    try {
                        plant_type_best = JSON.parse(element.plant_type_best)
                        if (!plant_type_best || (typeof plant_type_best != "object")) {
                            plant_type_best = {
                                wellplanted_first: null,
                                wellplanted_second: null,
                                wellplanted_third: null,
                                wellplanted_fourth: null,
                                wellplanted_fifth: null

                            }
                        }
                    } catch (err) {
                        plant_type_best = {
                            wellplanted_first: null,
                            wellplanted_second: null,
                            wellplanted_third: null,
                            wellplanted_fourth: null,
                            wellplanted_fifth: null
                        }
                    }


                    let member

                    try {
                        member = JSON.parse(element.member)
                        if (!member || (typeof member != "object")) {
                            member = []
                        }
                    } catch (err) {
                        member = []
                    }


                 

                    let where_debt
                    try {
                        where_debt = JSON.parse(element.where_debt)
                        if (!where_debt || (typeof where_debt != "object")) {
                            where_debt = []
                        }
                    } catch (err) {
                        where_debt = []
                    }


                    let problem_area
                    try {
                        problem_area = JSON.parse(element.problem_area)
                        if (!problem_area || (typeof problem_area != "object")) {
                            problem_area = []
                        }
                    } catch (err) {
                        problem_area = []
                    }

                    let manure_type
                    try {
                        manure_type = JSON.parse(element.manure_type)
                        if (!manure_type || (typeof manure_type != "object")) {
                           
                                manure_type=[]
                            
                            
                        }
                    } catch (err) {

                      
                            manure_type=[]
                            
                        
                    }

                    let transformation

                    try {
                        transformation = JSON.parse(element.transformation)
                        if (!transformation || (typeof transformation != "object")) {
                            transformation = {
                                transformation: null,
                                access_to_information_other: null
                            }
                        }
                    } catch (err) {

                        transformation = {
                            transformation: null,
                            access_to_information_other: null
                        }
                    }

                    let access_to_information


                    try {
                        access_to_information = JSON.parse(element.access_to_information)
                        if (!access_to_information || (typeof access_to_information != "object")) {
                            access_to_information = []
                        }
                    } catch (err) {

                        access_to_information = []
                    }

                    let occupy_home

                    try {
                        occupy_home = JSON.parse(element.occupy_home)
                        if (!occupy_home || (typeof occupy_home != "object")) {
                            occupy_home = {
                                occupy_home: null,
                                occupy_home_other: null
                            }
                        }
                    } catch (err) {
                        occupy_home = {
                            occupy_home: null,
                            occupy_home_other: null
                        }
                    }

                    let liability_array

                    try {
                        liability_array = JSON.parse(element.liability_array)
                        if (!liability_array || (typeof liability_array != "object")) {
                            liability_array = []
                        }
                    } catch (err) {

                        liability_array = []
                    }

                    let equipment

                    try {
                        equipment = JSON.parse(element.equipment)
                        if (!equipment || (typeof equipment != "object")) {
                            equipment = []
                        }
                    } catch (err) {

                        equipment = []
                    }

                    let affiliation_checkbox

                    try {
                        affiliation_checkbox = JSON.parse(element.affiliation_checkbox)
                        if (!affiliation_checkbox || (typeof affiliation_checkbox != "object")) {
                            affiliation_checkbox = []
                        }
                    } catch (err) {

                        affiliation_checkbox = []
                    }

                    let seed

                    try {
                        seed = JSON.parse(element.seed)
                        if (!seed || (typeof seed != "object")) {
                            seed = {
                                seed: null,
                                seed_other: null
                            }
                        }
                    } catch (err) {

                        seed = {
                            seed: null,
                            seed_other: null
                        }
                    }

                    let area_wather

                    try {
                        area_wather = JSON.parse(element.area_wather)
                        if (!area_wather || (typeof area_wather != "object")) {
                            area_wather = {
                                area_wather: null,
                                area_wather_other: null
                            }
                        }
                    } catch (err) {

                        area_wather = {
                            area_wather: null,
                            area_wather_other: null
                        }
                    }
                    let water_storage

                    try {
                        water_storage = JSON.parse(element.water_storage)
                        if (!water_storage || (typeof water_storage != "object")) {
                            water_storage = {
                                water_storage: null,
                                water_storage_other: null
                            }
                        }
                    } catch (err) {

                        water_storage = {
                            water_storage: null,
                            water_storage_other: null
                        }
                    }

                    let logistic_type

                    try {
                        logistic_type = JSON.parse(element.logistic_type)
                        if (!logistic_type || (typeof logistic_type != "object")) {
                            logistic_type = []
                        }
                    } catch (err) {

                        logistic_type = []
                    }
                    let sell_rice

                    try {
                        sell_rice = JSON.parse(element.sell_rice)
                        if (!sell_rice || (typeof sell_rice != "object")) {
                            sell_rice = []
                        }
                    } catch (err) {

                        sell_rice = []
                    }

                    let harvest_manage

                    try {
                        harvest_manage = JSON.parse(element.harvest_manage)
                        if (!harvest_manage || (typeof harvest_manage != "object")) {
                            harvest_manage = []
                        }
                    } catch (err) {
                        harvest_manage = []
                    }

                    let before_after_harvest

                    try {
                        before_after_harvest = JSON.parse(element.before_after_harvest)
                        if (!before_after_harvest || (typeof before_after_harvest != "object")) {
                            before_after_harvest = []
                        }
                    } catch (err) {
                        before_after_harvest = []
                    }

                    let packing

                    try {
                        packing = JSON.parse(element.packing)
                        if (!packing || (typeof packing != "object")) {
                            packing = []
                        }
                    } catch (err) {
                        packing = []
                    }

                    let transformation_exp

                    try {
                        transformation_exp = JSON.parse(element.transformation_exp)
                        if (!transformation_exp || (typeof transformation_exp != "object")) {
                            transformation_exp = {
                                experience_transform: null,
                                experience_transform_other: null
                            }
                        }
                    } catch (err) {
                        transformation_exp = {
                            experience_transform: null,
                            experience_transform_other: null
                        }
                    }

                    let have_otop

                    try {
                        have_otop = JSON.parse(element.have_otop)
                        if (!have_otop || (typeof have_otop != "object")) {
                            have_otop = {
                                otop: null,
                                otop_other: null
                            }
                        }
                    } catch (err) {
                        have_otop = {
                            otop: null,
                            otop_other: null
                        }
                    }

                    let agricultural_problem

                    try {
                        agricultural_problem = JSON.parse(element.agricultural_problem)
                        if (!agricultural_problem || (typeof agricultural_problem != "object")) {
                            agricultural_problem = []
                        }
                    } catch (err) {
                        agricultural_problem = []
                    }

                    let data_access

                    try {
                        data_access = JSON.parse(element.data_access)
                        if (!data_access || (typeof data_access != "object")) {
                            data_access = []
                        }
                    } catch (err) {
                        data_access = []
                    }

                    let need_and_problem

                    try {
                        need_and_problem = JSON.parse(element.need_and_problem)
                        if (!need_and_problem || (typeof need_and_problem != "object")) {
                            need_and_problem = []
                        }
                    } catch (err) {
                        need_and_problem = []
                    }
                    
                    let leader

                    try {
                        leader = JSON.parse(element.leader)
                        if (!leader || (typeof leader != "object")) {
                            leader = {
                                leader: null,
                                leader_other: null,
                                
                            }
                        }
                    } catch (err) {
                        leader = {
                            leader: null,
                            leader_other: null,
                        }
                    }
                    let product_planning

                    try {
                        product_planning = JSON.parse(element.product_planning)
                        if (!product_planning || (typeof product_planning != "object")) {
                            product_planning = {
                                product_planning:null,
                                planning_array:null
                            }
                        }
                    } catch (err) {

                        product_planning = {
                            product_planning:null,
                            planning_array:null
                        }
                    }
                    let taking_notes

                    try {
                        taking_notes = JSON.parse(element.taking_notes)
                        if (!taking_notes || (typeof taking_notes != "object")) {
                            taking_notes = {
                                taking_notes:null,
                                taking_notes_array:null
                            }
                        }
                    } catch (err) {

                        taking_notes = {
                            taking_notes:null,
                            taking_notes_array:null
                        }
                    }

                    let fertilizerfactor

                    try {
                        fertilizerfactor = JSON.parse(element.fertilizerfactor)
                        if (!fertilizerfactor || (typeof fertilizerfactor != "object")) {
                            fertilizerfactor = []
                        }
                    } catch (err) {

                        fertilizerfactor = []  
                    }
                    let purchasefactor

                    try {
                        purchasefactor = JSON.parse(element.purchasefactor)
                        if (!purchasefactor || (typeof purchasefactor != "object")) {
                            purchasefactor = []
                        }
                    } catch (err) {

                        purchasefactor = []  
                    }

                    let land_home

                    try {
                        land_home = JSON.parse(element.land_home)
                        if (!land_home || (typeof land_home != "object")) {
                            land_home={
                                conversionarea:null,
                                rancharea:null,
                                land_home_array:[],
                            }
                        }
                    } catch (err) {

                        land_home={
                            conversionarea:null,
                            rancharea:null,
                            land_home_array:[],
                        } 
                    }

                    
                    let certified

                    try {
                        certified = JSON.parse(element.certified)
                        if (!certified || (typeof certified != "object")) {
                            certified = {
                                num_certified:null,
                                certified_array:[],
                                number_not_certified:null,
                                number_gpa:null,
                                number_organicthailand:null,
                                number_ifoam:null,
                                number_eu:null,
                                number_nop_cor_usda:null,
                                number_fairtrade:null,
                                certified_array_other:null,
                                number_certified_other:null,
                            }
                        }
                    } catch (err) {

                        certified = {
                            num_certified:null,
                            certified_array:[],
                            number_not_certified:null,
                            number_gpa:null,
                            number_organicthailand:null,
                            number_ifoam:null,
                            number_eu:null,
                            number_nop_cor_usda:null,
                            number_fairtrade:null,
                            certified_array_other:null,
                            number_certified_other:null,
                        }
                    }
                    
                    

                    
                    
















                    consult_result.push({
                        user_information: {
                            user_id: req.user_id,
                        },
                        farmer_information: {
                            user_id: req.user_id,
                            farmer_id: element.farmer_id,
                            first_name: element.first_name,
                            last_name: element.last_name,
                            address: address,
                            age: element.age,
                            member: member,

                            duration: element.duration,
                            passion: element.passion,
                            leader: leader,
                            id_card: element.id_card,
                            phone_number: element.phone_number,
                            affiliation_checkbox: affiliation_checkbox,
                            family_income: family_income,
                            family_expenditure: family_expenditure,
                            email:element.email,
                            where_debt: where_debt,
                            problem_area: problem_area,
                            occupy_home: occupy_home,
                            liability_array: liability_array,
                            step: element.step
                        },
                        logistic_information: {
                            logistic_id: element.logistic_id,
                            logistic_type: element.logistic_type,
                            logistic_price: element.logistic_price,
                            logistic_insurance: element.logistic_insurance,
                            logistic_weight_ton: element.logistic_weight_ton,
                            logistic_weight_kg: element.logistic_weight_kg,
                        },
                        factor_information: {
                            factor_id: element.factor_id,
                            manure_type: manure_type,
                            manure_type_organic: manure_type_organic,
                            seed: seed,
                            equipment: equipment,
                            product_planning:product_planning,
                            taking_notes:taking_notes,
                            fertilizerfactor:fertilizerfactor,
                            purchasefactor:purchasefactor
                        },
                        area_information: {
                            area_id: element.area_id,
                            area_storage: element.area_storage,
                            area_wather: area_wather,
                            water_storage: water_storage,
                            gps: gps,
                            chemical_date: element.area_owner,
                            employee_type: employee_type,
                            farm_worker: farm_worker,
                            transformation: transformation,
                            access_to_information: access_to_information,
                            consultantsource: element.consultantsource,
                            land_home:land_home,
                            certified:certified,

                        },
                        manufacture_information: {
                            manufacture_id: element.manufacture_id,
                            program: element.program,
                            plant_type: plant_type,
                            plant_type_best: plant_type_best,
                            sell_rice: sell_rice
                        },
                        harvest_information: {
                            harvest_id: element.harvest_id,
                            harvest_manage: harvest_manage,
                            before_after_harvest: before_after_harvest,
                            packing: packing,
                            transformation_exp: transformation_exp,
                            have_otop: have_otop,
                            agricultural_problem: agricultural_problem,
                            data_access: data_access,
                            need_and_problem: need_and_problem

                        }

                    })

                })


                req.result = consult_result;
                console.log("result length", result.length)
                console.log("length", consult_result.length)


                next();

            })
    }
}




exports.user_add_farmer = function () {
    return function (req, res, next) {
        console.log(req.body.occupy_home)
        console.log(req.body.land_home)
        let farmerInfo = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: req.body.address,
            age: req.body.age,
            radio: req.body.radio,
            member: req.body.member,

            duration: req.body.duration,
            passion: req.body.passion,
            user_id: req.user_id,
            leader: req.body.leader,
            id_card: req.body.id_card,
            phone_number: req.body.phone_number,
            password: req.body.password,
            affiliation_checkbox: req.body.affiliation_checkbox,
            family_income: req.body.family_income,
            family_expenditure: req.body.family_expenditure,
            land_home: req.body.land_home,
            where_debt: req.body.where_debt,
            problem_area: req.body.problem_area,
            occupy_home: req.body.occupy_home,
            liability_array: req.body.liability_array,
            email:req.body. email,
            step: 1

        }

        db.query(`INSERT INTO farmer_information (farmer_id,first_name,last_name,address,phone_number,age,duration,passion,user_id,step,leader
            ,id_card,password,affiliation_checkbox,family_income,family_expenditure,land_home,where_debt,problem_area,member,occupy_home,liability_array,email	) VALUES
        (NULL,'${farmerInfo.first_name}', '${farmerInfo.last_name}','${farmerInfo.address}','${farmerInfo.phone_number}',
        '${farmerInfo.age}','${farmerInfo.duration}','${farmerInfo.passion}',
        '${farmerInfo.user_id}','${farmerInfo.step}','${farmerInfo.leader}','${farmerInfo.id_card}','${farmerInfo.password}'
        ,'${farmerInfo.affiliation_checkbox}','${farmerInfo.family_income}','${farmerInfo.family_expenditure}','${farmerInfo.land_home}'
        ,'${farmerInfo.where_debt}','${farmerInfo.problem_area}' ,'${farmerInfo.member}','${farmerInfo.occupy_home}','${farmerInfo.liability_array}','${farmerInfo.email}')`,
            function (err, result) {
                if (err) throw err;

                console.log(result.insertId.toString())
                res.step = farmerInfo.step
                res.farmer_id = result.insertId.toString()


                next()



                // if (JSON.parse(farmerInfo.member).length > 0) {




                //     let Json_obj = JSON.parse(farmerInfo.member)
                //     let database_query = "";

                //     Json_obj.map((element, index) => {

                //         database_query =
                //             database_query +
                //             `(NULL,'${element.first_name}','${element.last_name}','${element.age}','${element.education}','${element.Department}','${result.insertId}'),`;
                //     });

                //     let cut_str = database_query.lastIndexOf(",");
                //     let db_query = database_query.slice(0, cut_str);
                //     db.query(
                //         `INSERT INTO  member_farmer (member_id,first_name,last_name,age,education,Department,farmer_id) VALUES${db_query}`,
                //         function (err, MemberResult) {

                //             // console.log(req.body.age)
                //             // console.log(typeof req.body.age)
                //             // console.log(req.body.duration)
                //             // console.log(typeof req.body.duration)
                //             if (err) throw err;



                //             next();

                //         }

                //     );
                // } else {
                //     
                // }


            })
    }
}

exports.user_delete_farmer = function () {
    return function (req, res, next) {
        try {
            console.log(req.body.farmer_id)
            let farmerInfo = JSON.parse(req.body.farmer_id)




            let info = {
                farmer_id: '(' + farmerInfo.join() + ')'

            }


            // next()
            db.query("DELETE FROM farmer_information WHERE farmer_id IN " + info.farmer_id + " ", function (err, result) {
                if (err) throw err;
                db.query("DELETE FROM factor_information WHERE farmer_id IN " + info.farmer_id + " ", function (err, result) {
                    if (err) throw err;
                    db.query("DELETE FROM area_information WHERE farmer_id IN " + info.farmer_id + " ", function (err, result) {
                        if (err) throw err;
                        db.query("DELETE FROM logistic_information WHERE farmer_id IN " + info.farmer_id + " ", function (err, result) {
                            if (err) throw err;
                            db.query("DELETE FROM manufacture_information WHERE farmer_id IN " + info.farmer_id + " ", function (err, result) {
                                if (err) throw err;
                                db.query("DELETE FROM member_farmer WHERE farmer_id IN " + info.farmer_id + " ", function (err, result) {
                                    if (err) throw err;
                                    next();
                                })
                            })
                        })
                    })
                })
            })
            // db.query(`DELETE FROM farmer_information WHERE farmer_id = '${req.body.farmer_id}'  `, function (err, result) {
            //     if (err) throw err;
            //     next();
            // })

        } catch (error) {
            res.status(200).json({
                'success': false,
                message: "รูปแบบข้อมูลไม่ถูกต้อง"
            })
        }

    }
}

exports.user_update_farmer = function () {
    return function (req, res, next) {

        console.log("u_id", req.user_id)
        console.log("f_id", req.body.farmer_id)
        console.log("LH", req.body.land_home)

        // if ( req.body.farmer_id ) {
        db.query(`UPDATE farmer_information SET first_name = '${req.body.first_name}',last_name = '${req.body.last_name}',
            address = '${req.body.address}',age = '${req.body.age}',
            member = '${req.body.member}',occupy_home = '${req.body.occupy_home}',
            liability_array = '${req.body.liability_array}',duration = '${req.body.duration}',
            passion  = '${req.body.passion}',leader  = '${req.body.leader}',id_card = '${req.body.id_card}',
            password = '${req.body.password}',affiliation_checkbox = '${req.body.affiliation_checkbox}',family_income = '${req.body.family_income}',
            family_expenditure = '${req.body.family_expenditure}',land_home = '${req.body.land_home}',
            where_debt = '${req.body.where_debt}',problem_area = '${req.body.problem_area}',email = '${req.body.email}'
        where farmer_id = '${req.body.farmer_id}'`, function (err, result) {
                if (err) throw err;
                console.log(req.body.family_income)
                // next()

                next();
            })
        // } else {
        //     let farmerInfo = {
        //         first_name: req.body.first_name,
        //         last_name: req.body.last_name,
        //         address: req.body.address,
        //         age: req.body.age,
        //         radio: req.body.radio,
        //         member: req.body.member,
        //         duration: req.body.duration,
        //         passion: req.body.passion,
        //         user_id: req.user_id,
        //         leader: req.body.leader,
        //         id_card: req.body.id_card,
        //         phone_number: req.body.phone_number,
        //         password: req.body.password,
        //         affiliation_checkbox: req.body.affiliation_checkbox,
        //         family_income: req.body.family_income,
        //         family_expenditure: req.body.family_expenditure,
        //         land_home: req.body.land_home,
        //         where_debt: req.body.where_debt,
        //         problem_area: req.body.problem_area,
        //         occupy_home: req.body.occupy_home,
        //         liability_array: req.body.liability_array,
        //         step: 1

        //     }

        //     db.query(`INSERT INTO farmer_information (farmer_id,first_name,last_name,address,phone_number,age,duration,passion,user_id,step,leader
        //         ,id_card,password,affiliation_checkbox,family_income,family_expenditure,land_home,where_debt,problem_area,member,occupy_home,liability_array	) VALUES
        //     (NULL,'${farmerInfo.first_name}', '${farmerInfo.last_name}','${farmerInfo.address}','${farmerInfo.phone_number}',
        //     '${farmerInfo.age}','${farmerInfo.duration}','${farmerInfo.passion}',
        //     '${farmerInfo.user_id}','${farmerInfo.step}','${farmerInfo.leader}','${farmerInfo.id_card}','${farmerInfo.password}'
        //     ,'${farmerInfo.affiliation_checkbox}','${farmerInfo.family_income}','${farmerInfo.family_expenditure}','${farmerInfo.land_home}'
        //     ,'${farmerInfo.where_debt}','${farmerInfo.problem_area}' ,'${farmerInfo.member}','${farmerInfo.occupy_home}','${farmerInfo.liability_array}')`,
        //         function (err, result) {
        //             if (err) throw err;

        //             // console.log(farmerInfo.step)
        //             res.step = farmerInfo.step
        //             res.farmer_id = result.insertId.toString()
        //             next()

        //         })
        // }
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // user Ge,In,De,Up farmer member
// exports.user_get_member = function () {
//     return function (req, res, next) {
//         db.query(`SELECT * FROM member_farmer WHERE farmer_id = '${req.body.farmer_id}'`, function (err, result) {
//             if (err) throw err;
//             req.result = result;
//             next();
//         })
//     }
// }

// exports.user_add_member = function () {
//     return function (req, res, next) {
//         db.query(`INSERT INTO  member_farmer (member_id,first_name,last_name,age,education,Department,farmer_id) VALUES(null,'${req.body.first_name}','${req.body.last_name}','${req.body.age}', '${req.body.education}','${req.body.Department}','${req.body.farmer_id}')`, function (err, result) {
//             if (err) throw err;
//             // console.log(result.insertId)
//             // next()
//             next();
//         })
//     }
// }

// exports.user_delete_member = function () {
//     return function (req, res, next) {
//         db.query("DELETE FROM member_farmer WHERE member_id = '" + req.body.member_id + "'  ", function (err, result) {
//             if (err) throw err;
//             // console.log(result.insertId)
//             // next()
//             next();
//         })
//     }
// }

// exports.user_update_member = function () {
//     return function (req, res, next) {
//         db.query(`UPDATE member_farmer SET first_name = '${req.body.first_name}',last_name = '${req.body.last_name}', age = '${req.body.age}',education = '${req.body.education}',Department  = '${req.body.Department}' ,farmer_id  = '${req.body.farmer_id}' where member_id = '${req.body.member_id}'`, function (err, result) {
//             if (err) throw err;
//             // console.log(result.insertId)
//             // next()
//             next();
//         })
//     }
// }
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // user Ge,In,De,Up farmer area
// exports.user_get_area = function () {
//     return function (req, res, next) {
//         db.query(`SELECT * FROM area_information WHERE user_id = '${req.body.user_id}' `, function (err, result) {
//             if (err) throw err;
//             req.result = result;
//             next();

//         })
//     }
// }

// exports.user_add_area = function () {
//     return function (req, res, next) {

//         // console.log(req.body.area_owner) 
//         // db.query(`INSERT INTO area_information (area_id,area_owner,area_certificate,area_holding,area_wather,water_storage,gps,chemical_date,employee,farmer_id,user_id) VALUES 
//         // (NULL,'${req.body.area_owner}', '${req.body.area_certificate}' ,'${req.body.area_holding}' ,'${req.body.area_wather}' ,'${req.body.water_storage}','${req.body.gps}','${req.body.chemical_date}','${req.body.employee}','${req.body.farmer_id}','${req.body.user_id}') 
//         // `, function (err, result) { 
//         db.query(`INSERT INTO area_information (area_id,area_certificate,area_storage,area_holding,area_wather,water_storage,gps,employee_type,employee,chemical_date,farmer_id) VALUES 
//         (NULL, '${req.body.area_certificate}', '${req.body.area_storage}','${req.body.area_holding}' ,'${req.body.area_wather}' ,'${req.body.water_storage}','${req.body.gps}','${req.body.employee_type}','${req.body.employee}','${req.body.chemical_date}',${req.body.farmer_id}) 
//         `, function (err, result) {
//             // console.log(result) 
//             if (err) throw err;
//             console.log(req.body.farmer_id)
//             db.query(`UPDATE farmer_information SET step = '3' where farmer_id = '${req.body.farmer_id}'`, function (err, result) {
//                 if (err) throw err;
//                 res.step = 3
//                 // console.log(result.insertId)
//                 // next()
//                 next();
//             })
//         })
//     }
// }

// exports.user_delete_area = function () {
//     return function (req, res, next) {
//         db.query("DELETE FROM area_information WHERE area_id = '" + req.body.area_id + "'  ", function (err, result) {
//             if (err) throw err;
//             next()
//         })
//     }
// }

// exports.user_update_area = function () {
//     return function (req, res, next) {
//         console.log(req.body.area_owner && req.body.area_certificate && req.body.area_holding && req.body.area_wather && req.body.water_storage && req.body.gps && req.body.chemical_date && req.body.employee && req.body.farmer_id && req.body.user_id)
//         db.query(`UPDATE area_information SET area_owner = '${req.body.area_owner}' ,area_certificate = '${req.body.area_certificate}' ,
//         area_holding = '${req.body.area_holding}' ,area_wather = '${req.body.area_wather}' ,water_storage = '${req.body.water_storage}' ,
//         gps = '${req.body.gps}' ,chemical_date = '${req.body.chemical_date}' ,employee = '${req.body.employee}' ,farmer_id = '${req.body.farmer_id}' ,user_id = '${req.body.user_id}' WHERE area_id = '${req.body.area_id}' `, function (err, result) {
//             if (err) throw err;
//             next()
//         })
//     }
// }
// /////////////////////////////////////////////////////////////////////////////////////////////////////////

// // user Ge,In,De,Up farmer factor
// exports.user_get_factor = function () {
//     return function (req, res, next) {
//         db.query(`SELECT  * FROM factor_information WHERE user_id = '${req.body.user_id}' `, function (err, result) {
//             if (err) throw err;
//             req.result = result;
//             next();

//         })
//     }
// }

// exports.user_add_factor = function () {
//     return function (req, res, next) {
//         db.query(`INSERT INTO factor_information (factor_id,manure,manure_use,manure_type,seed,equipment,equipment_organic,farmer_id,user_id) VALUES(NULL,'${req.body.manure}','${req.body.manure_use}','${req.body.manure_type}', '${req.body.seed}' ,'${req.body.equipment}','${req.body.equipment_organic}' ,'${req.body.farmer_id}' ,'${req.body.user_id}')`, function (err, result) {
//             // console.log(result) 
//             if (err) throw err;
//             db.query(`UPDATE farmer_information SET step = '5' where farmer_id = '${req.body.farmer_id}'`, function (err, result) {
//                 if (err) throw err;
//                 res.step = 5
//                 //  console.log(req.body.farmer_id)
//                 // next()
//                 next();
//             })
//         })
//     }
// }

// exports.user_delete_factor = function () {
//     return function (req, res, next) {
//         db.query("DELETE FROM factor_information WHERE factor_id = '" + req.body.factor_id + "'  ", function (err, result) {
//             if (err) throw err;
//             next()
//         })
//     }                   
// }

// exports.user_update_factor = function () {
//     return function (req, res, next) {
//         console.log(req.body.manure && req.body.seed && req.body.equipment)
//         db.query(`UPDATE factor_information SET manure = '${req.body.manure}' ,seed = '${req.body.seed}' ,equipment = '${req.body.equipment}' ,farmer_id = '${req.body.farmer_id}' ,user_id = '${req.body.user_id}' WHERE factor_id = '${req.body.factor_id}' `, function (err, result) {
//             if (err) throw err;
//             next()
//         })
//     }
// }