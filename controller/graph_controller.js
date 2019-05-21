let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let constance = require('../const/constance')
let month_to_number = require('../const/month_to_number')

exports.get_plant_type_radar = function () {
    return function (req, res, next) {
       
        db.query(`SELECT user_information.name,manufacture_information.manufacture_id,manufacture_information.plant_type FROM ((user_information LEFT JOIN farmer_information ON user_information.user_id = farmer_information.user_id) LEFT JOIN manufacture_information ON farmer_information.farmer_id = manufacture_information.farmer_id) WHERE user_information.type_user = '3' order by manufacture_id DESC`, function (err, result) {

            if (err) throw err;

            let se_obj = []
            let result_obj = []
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
                // let where = []
                let plant_type_obj = []


                result.map((el) => {

                    try {
                        plant_type_obj = JSON.parse(el.plant_type)

                        if (element == el.name) {


                            plant_type_obj.map((ele) => {
                                
                                if(ele.plant === req.body.plant_name){
                                    // console.log(ele.rice_sell_array)
                                    rice_sell_array.push(...ele.rice_sell_array)
                                }else{}

                            })
                        }
                    }catch(error){

                    }
                    
                })

                let consumer_volume = 0,compiler_volume = 0,enterprise_volume =0,mill_volume = 0,supermarket_volume = 0,agent_volume=0,export_volume=0,processing_volume=0,seed_volume=0,other_volume=0
                let consumer = 0 ,compiler=0,enterprise=0,mill=0,supermarket=0,agent=0,xexport=0,processing=0,seed=0,other=0
                let consumer_logistic= 0 ,compiler_logistic=0,enterprise_logistic=0,mill_logistic=0,supermarket_logistic=0,agent_logistic=0,xexport_logistic=0,processing_logistic=0,seed_logistic=0,other_logistic=0
                let consumer_count = 0 ,compiler_count=0,enterprise_count=0,mill_count=0,supermarket_count=0,agent_count=0,xexport_count=0,processing_count=0,seed_count=0,other_count=0
                
                let show = 0

                rice_sell_array.map((el) =>{

                    if(el.rice_sell === "ผู้บริโภคโดยตรง"){

                        consumer_volume +=  parseInt(el.sell_consumer_volume)
                        consumer += parseInt(el.price_consumer)

                        if(el.logistic_kg_ton==="ตัน/ครั้ง"){
                            consumer_logistic += parseInt(el.logistic_price)*1000
                        }else{
                            consumer_logistic += parseInt(el.logistic_price)
                        }
                        consumer_count++

                    }else if(el.rice_sell === "ผู้รวบรวมสินค้าเกษตร/เกษตรกร"){
                        
                        compiler_volume += parseInt(el.sell_compiler_volume)
                        compiler += parseInt(el.price_compiler)

                        if(el.logistic_kg_ton==="ตัน/ครั้ง"){
                            compiler_logistic += parseInt(el.logistic_price)*1000
                        }else{
                            compiler_logistic += parseInt(el.logistic_price)
                        }

                        compiler_count++

                    }else if(el.rice_sell === "ส่งให้กลุ่มวิสาหกิจของตัวเอง"){

                        enterprise += parseInt(el.price_enterprise)
                        enterprise_volume += parseInt(el.sell_enterprise_volume)

                        if(el.logistic_kg_ton==="ตัน/ครั้ง"){
                            enterprise_logistic += parseInt(el.logistic_price)*1000
                        }else{
                            enterprise_logistic += parseInt(el.logistic_price)
                        }

                        enterprise_count++

                    }else if(el.rice_sell === "โรงสี"){

                        mill += parseInt(el.price_mill)
                        mill_volume += parseInt(el.sell_mill_volume)

                        if(el.logistic_kg_ton==="ตัน/ครั้ง"){
                            mill_logistic += parseInt(el.logistic_price)*1000
                        }else{
                            mill_logistic += parseInt(el.logistic_price)
                        }

                        mill_count++

                    }else if(el.rice_sell === "ห้างร้านหรือซุปเปอร์มาร์เก็ตหรือร้านค้าปลีก"){

                        supermarket += parseInt(el.price_supermarket) 
                        console.log(supermarket)
                        supermarket_volume += parseInt(el.sell_supermarket_volume)

                        if(el.logistic_kg_ton==="ตัน/ครั้ง"){
                            supermarket_logistic += parseInt(el.logistic_price)*1000
                        }else{
                            supermarket_logistic += parseInt(el.logistic_price)
                        }

                        supermarket_count++

                    }else if(el.rice_sell === "ตัวแทนส่งออก"){

                        agent += parseInt(el.price_agent)
                        agent_volume += parseInt(el.sell_agent_volume)

                        if(el.logistic_kg_ton==="ตัน/ครั้ง"){
                            agent_logistic += parseInt(el.logistic_price)*1000
                        }else{
                            agent_logistic += parseInt(el.logistic_price)
                        }

                        agent_count++

                    }else if(el.rice_sell === "ส่งออกไปต่างประเทศ"){

                        xexport += parseInt(el.price_export)
                        export_volume += parseInt(el.sell_export_volume)

                        if(el.logistic_kg_ton==="ตัน/ครั้ง"){
                            xexport_logistic += parseInt(el.logistic_price)*1000
                        }else{
                            xexport_logistic += parseInt(el.logistic_price)
                        }

                        xexport_count++

                    }else if(el.rice_sell === "โรงงานแปรรูป"){

                        processing += parseInt(el.price_processing_plant)
                        processing_volume += parseInt(el.sell_processing_plant_volume)

                        if(el.logistic_kg_ton==="ตัน/ครั้ง"){
                            processing_logistic += parseInt(el.logistic_price)*1000
                        }else{
                            processing_logistic += parseInt(el.logistic_price)
                        }

                        processing_count++

                    }else if(el.rice_sell === "ขายเมล็ดพันธุ์"){

                        seed += parseInt(el.price_seed)
                        seed_volume += parseInt(el.sell_seed_volume)

                        if(el.logistic_kg_ton==="ตัน/ครั้ง"){
                            seed_logistic += parseInt(el.logistic_price)*1000
                        }else{
                            seed_logistic += parseInt(el.logistic_price)
                        }

                        seed_count++

                    }else if(el.rice_sell === "อื่นๆ ระบุ"){

                        other += parseInt(el.price_other)
                        other_volume += parseInt(el.rice_sell_other_volume)

                        if(el.logistic_kg_ton==="ตัน/ครั้ง"){
                            other_logistic += parseInt(el.logistic_price)*1000
                        }else{
                            other_logistic += parseInt(el.logistic_price)
                        }

                        other_count++

                    }
                    
                })
                let data_price=[],data_volume=[],data_price_result = [],data_volume_result = []
                data_price = [consumer/consumer_count,compiler/compiler_count,enterprise/enterprise_count,mill/mill_count,supermarket/supermarket_count,agent/agent_count,xexport/xexport_count,processing/processing_count,seed/seed_count,other/other_count]
                data_volume = [consumer_logistic/consumer_count,compiler_logistic/compiler_count,enterprise_logistic/enterprise_count,mill_logistic/mill_count,supermarket_logistic/supermarket_count,agent_logistic/agent_count,xexport_logistic/xexport_count,processing_logistic/processing_count,seed_logistic/seed_count,other_logistic/other_count]

                show = consumer + compiler + enterprise + mill + supermarket + agent + xexport + processing + seed + other

                data_price.map((el)=>{
                    
                    if(el>0){
                        
                        data_price_result.push(el)
                    }else {
                        
                        data_price_result.push(0)
                    }
                })

                data_volume.map((el)=>{
                    if(el>0){
                        data_volume_result.push(el)
                    }else{
                        data_volume_result.push(0)
                    }
                })
                // console.log(value)

                series.push({
                    name: "ราคาที่ขาย",
                    data: data_price_result
                },{
                    name: "ราคาค่าขนส่ง",
                    data: data_volume_result
                },{
                    name: "ปริมาณ",
                    data: [consumer_volume,compiler_volume,enterprise_volume,mill_volume,supermarket_volume,agent_volume,export_volume,processing_volume,seed_volume,other_volume]
                })
                console.log(show)
                
                if(show!==0){
                    result_obj.push({
                        se_name: element,
                        series: series
     
                    })
                }else{}
                
            })

            req.result = result_obj
            next();
        })
    }
}


exports.get_chart_logistic = function () {
    return function (req, res, next) {
        db.query(`SELECT user_information.name,manufacture_information.manufacture_id,manufacture_information.plant_type FROM ((user_information LEFT JOIN farmer_information ON user_information.user_id = farmer_information.user_id) LEFT JOIN manufacture_information ON farmer_information.farmer_id = manufacture_information.farmer_id) WHERE user_information.type_user = '3' order by manufacture_id DESC`, function (err, result) {
            if (err) throw err;

            if (err) throw err;
            let plant = req.body.plant_name
            let plant_type_obj = []
            let plant_name = []
            let all_plant = []
            let se_obj = []
            let data_result = []


            result.map((element, index) => {

                if (element.plant_type !== null) {
                    try {

                        plant_type_obj.push(...JSON.parse(element.plant_type))

                    } catch (error) {
                    }
                } else { }


            })

            plant_type_obj.map((element) => {
                plant_name.push(element.plant)
            })

            plant_name.map((element) => {
                let index = 0
                index = all_plant.findIndex((el) => el === element)
                if (index < 0) {
                    all_plant.push(element)
                } else {

                }
            })

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


            let plant_obj = []
            let index2 = 0
            let se_check = []
            se_obj.map((element) => {

                let where = []
                let where_result = []
                let data = []
                let where_result_obg = []
                let consumer_count = 0 ,compiler_count=0,enterprise_count=0,mill_count=0,supermarket_count=0,agent_count=0,xexport_count=0,processing_count=0,seed_count=0,other_count=0
                let consumer = 0, compiler = 0, enterprise = 0, mill = 0, supermarket = 0, agent = 0, xexport = 0, processing = 0, seed = 0, other = 0

                result.map((ele) => {

                    if (ele.plant_type !== null) {

                        try {

                            plant_obj = JSON.parse(ele.plant_type)

                            if (element === ele.name) {

                                plant_obj.map((elem) => {

                                    if (elem.plant === plant) {
                                        let rice_obj = []
                                        // console.log()
                                        rice_obj.push(...elem.rice_sell_array)
                                        // rice_obj.push(...elem.rice_sell.rice_sell)
                                        // console.log(rice_obj)
                                        rice_obj.map((eleme) => {
                                            // console.log(elem.logistic_price)
                                            if (eleme.rice_sell === "ผู้บริโภคโดยตรง") {
                                                consumer += parseInt(eleme.logistic_price)
                                                consumer_count++
                                            } else if (eleme.rice_sell === "ผู้รวบรวมสินค้าเกษตร/เกษตรกร") {
                                                // console.log("compi", eleme.rice_sell)
                                                compiler += parseInt(eleme.logistic_price)
                                                compiler_count++
                                            } else if (eleme.rice_sell === "ส่งให้กลุ่มวิสาหกิจของตัวเอง") {
                                                enterprise += parseInt(eleme.logistic_price)
                                                enterprise_count++
                                            } else if (eleme.rice_sell === "โรงสี") {
                                                mill += parseInt(eleme.logistic_price)
                                                mill_count++
                                            } else if (eleme.rice_sell === "ห้างร้านหรือซุปเปอร์มาร์เก็ตหรือร้านค้าปลีก") {
                                                supermarket += parseInt(eleme.logistic_price)
                                                supermarket_count++
                                            } else if (eleme.rice_sell === "ตัวแทนส่งออก") {
                                                agent += parseInt(eleme.logistic_price)
                                                agent_count++
                                            } else if (eleme.rice_sell === "ส่งออกไปต่างประเทศ") {
                                                xexport += parseInt(eleme.logistic_price)
                                                xexport_count++
                                            } else if (eleme.rice_sell === "โรงงานแปรรูป") {
                                                processing += parseInt(eleme.logistic_price)
                                                processing_count++
                                            } else if (eleme.rice_sell === "ขายเมล็ดพันธุ์") {
                                                seed += parseInt(eleme.logistic_price)
                                                seed_count++
                                            } else if (eleme.rice_sell === "อื่นๆ ระบุ") {
                                                other += parseInt(eleme.logistic_price)
                                                other_count++
                                            } else { }


                                            where.push(eleme.rice_sell)

                                        })





                                    } else { }


                                })



                            } else { }


                        } catch (error) {

                        }
                    }

                })
                // console.log(where)
                let index = 0
                where.map((ele) => {
                    index = where_result.findIndex((el) => el === ele)
                    if (index < 0) {
                        where_result.push(ele)
                    } else {

                    }
                })


                // where.map((ele)=>{
                //     console.log(ele)
                // })
                // console.log("p1",consumer)
                // console.log("p2",compiler)
                where_result.map((eleme) => {
                    // console.log("where",eleme)
                    // let consumer_count = 0 ,compiler_count=0,enterprise_count=0,mill_count=0,supermarket_count=0,agent_count=0,xexport_count=0,processing_count=0,seed_count=0,other_count=0
                    if (eleme === "ผู้บริโภคโดยตรง") {
                        data.push(consumer/consumer_count)
                    } else if (eleme === "ผู้รวบรวมสินค้าเกษตร/เกษตรกร") {
                        data.push(compiler/compiler_count)
                    } else if (eleme === "ส่งให้กลุ่มวิสาหกิจของตัวเอง") {
                        data.push(enterprise/enterprise_count)
                    } else if (eleme === "โรงสี") {
                        data.push(mill/mill_count)
                    } else if (eleme === "ห้างร้านหรือซุปเปอร์มาร์เก็ตหรือร้านค้าปลีก") {
                        data.push(supermarket/supermarket_count)
                    } else if (eleme === "ตัวแทนส่งออก") {
                        data.push(agent/agent_count)
                    } else if (eleme === "ส่งออกไปต่างประเทศ") {
                        data.push(xexport/xexport_count)
                    } else if (eleme === "โรงงานแปรรูป") {
                        data.push(processing)
                    } else if (eleme === "ขายเมล็ดพันธุ์") {
                        data.push(seed/seed_count)
                    } else if (eleme === "อื่นๆ ระบุ") {
                        data.push(other/other_count)
                    } else { }
                })

                // console.log(se_check)

                // se_check.map((ele)=>{
                //     console.log(ele)
                //     // if(ele===element){


                //     // }
                // })
                if (data.length !== 0) {
                    data_result.push({
                        se_name: element,
                        where: where_result,
                        data: data
                    })
                } else { }

            })



            req.result = data_result;
            next();

        })
    }
}
exports.get_all_piechart = function () {
    return function (req, res, next) {
        
        db.query(`SELECT user_information.name,manufacture_information.manufacture_id,manufacture_information.plant_type FROM ((user_information LEFT JOIN farmer_information ON user_information.user_id = farmer_information.user_id) LEFT JOIN manufacture_information ON farmer_information.farmer_id = manufacture_information.farmer_id) WHERE user_information.type_user = '3' order by manufacture_id DESC`, function (err, result) {

            if (err) throw err;

            
            let se_obj = []
            
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

            let data_result = []
            
            

            se_obj.map((element)=>{
                
                let series = []
                let plant_type_obj = []
                let year_value=0,product=0
                let some = 0

                result.map((el) => {

                    try {
                        plant_type_obj = JSON.parse(el.plant_type)

                        if (element == el.name) {
                      
                            plant_type_obj.map((ele) => {

                                if(ele.plant===req.body.plant_name){

                                  
                                    if(ele.year_value!==null){
                                        if(ele.year_value_unit === "กิโลกรัม"){
                                            year_value += parseInt(ele.year_value) 
                                        }
                                        else if(ele.year_value_unit ==="ตัน"){
                                            year_value += parseInt(ele.year_value*1000)
                                        }

                                    }else{
                                        year_value += 0 
                                    }
                                 
                                    
                                    if(ele.growingarea !== null && ele.product_value !== null){
                                        // console.log("product_value",ele.product_value)
                                        product += parseInt(ele.growingarea) * parseInt(ele.product_value) 
                                    }else{
                                        product += 0
                                    }
                                    
                                   

                                }else{}

                            })

                        }else{}

                    }catch(error){

                    }
                })

                some = product - year_value

                // console.log(some)
                // console.log(year_value)

                series.push({
                    name : "จำนวนผลผลิตที่ขายต่อปี",
                    y : year_value
                },{
                    name : "จำนวนผลผลิตที่ไม่ได้ส่งขาย",
                    y : some
                })
                // console.log(null+20)
                // console.log("year_value",year_value)
                // console.log(year_value)

                
                if(year_value !== 0 || some !== 0){
                    data_result.push({
                        SE_name: element,
                        series : series
                    })
                }else{}
                
            })

            req.result = data_result
            next();
        })
    }
}
exports.get_chart_deliver = function () {
    return function (req, res, next) {


        db.query(`SELECT user_information.name,manufacture_information.plant_type FROM ((user_information LEFT JOIN farmer_information ON user_information.user_id = farmer_information.user_id) LEFT JOIN manufacture_information ON farmer_information.farmer_id = manufacture_information.farmer_id) WHERE user_information.type_user = '3' order by manufacture_id DESC`, function (err, result) {
            if (err) throw err;

            let se_obj = []


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

            let chart_result = []

            se_obj.map((element) => {


                let all_plant = []
                let some_plant = []
                let real_plant = []
                let plant_type_obj = []


                result.map((el) => {

                    try {
                        plant_type_obj = JSON.parse(el.plant_type)

                        if (element == el.name) {


                            plant_type_obj.map((ele) => {

                                // let begin_plant
                                // console.log(ele.begin_plant)

                                if (ele.begin_plant !== undefined) {

                                    begin_plan = ele.begin_plant

                                } else {
                                    begin_plan = "ไม่มี"
                                }
                                all_plant.push({
                                    name: ele.plant,
                                    begin_plan: begin_plan
                                })

                            })
                            let rang = 0, rang_end = 0, rengf = 0, rangf_end = 0
                            all_plant.map((ele) => {
                                let mount = []
                                let index = 0
                                let index2 = 0
                                index = some_plant.findIndex((elem) => elem.name === ele.name)
                                if (index < 0) {

                                    some_plant.push({
                                        name: ele.name,
                                    })

                                } else {

                                }

                            })

                        }

                    } catch (error) {

                    }



                })


                some_plant.map((el) => {
                    let mount = []
                    let plant_obj = []
                    let begin = 12, begin_end = 12, final = 12, final_end = 0

                    result.map((ele) => {

                        try {
                            plant_obj = JSON.parse(ele.plant_type)

                            plant_obj.map((elem) => {


                                let plant_final = []
                                if (element === ele.name) {
                                    if (el.name === elem.plant) {

                                        if (elem.begin_plant !== undefined) {
                                            if (elem.begin_plant === "มกราคม") {
                                                if (begin > 1) {
                                                    begin = 1
                                                } else { }
                                            } else if (elem.begin_plant === "กุมภาพันธ์") {
                                                if (begin > 2) {
                                                    begin = 2
                                                } else { }
                                            } else if (elem.begin_plant === "มีนาคม") {
                                                if (begin > 3) {
                                                    begin = 3
                                                } else { }
                                            } else if (elem.begin_plant === "เมษายน") {
                                                if (begin > 4) {
                                                    begin = 4
                                                } else { }
                                            } else if (elem.begin_plant === "พฤษภาคม") {
                                                if (begin > 5) {
                                                    begin = 5
                                                } else { }
                                            } else if (elem.begin_plant === "มิถุนายน") {
                                                if (begin > 6) {
                                                    begin = 6
                                                } else { }
                                            } else if (elem.begin_plant === "กรกฎาคม") {
                                                if (begin > 7) {
                                                    begin = 7
                                                } else { }
                                            } else if (elem.begin_plant === "สิงหาคม") {
                                                if (begin > 8) {
                                                    begin = 8
                                                } else { }
                                            } else if (elem.begin_plant === "กันยายน") {
                                                if (begin > 9) {
                                                    begin = 9
                                                } else { }
                                            } else if (elem.begin_plant === "ตุลาคม") {
                                                if (begin > 10) {
                                                    begin = 10
                                                } else { }
                                            } else if (elem.begin_plant === "พฤศจิกายน") {
                                                if (begin > 11) {
                                                    begin = 11
                                                } else { }
                                            } else if (elem.begin_plant === "ธันวาคม") {
                                                if (begin >= 12) {
                                                    begin = 12
                                                } else { }
                                            }
                                        } else {
                                            begin = 0
                                        }


                                        if (elem.between_plant !== undefined) {
                                            if (elem.between_plant === "มกราคม") {
                                                if (begin_end > 1) {
                                                    begin_end = 1
                                                } else { }
                                            } else if (elem.between_plant === "กุมภาพันธ์") {
                                                if (begin_end > 2) {
                                                    begin_end = 2
                                                } else { }
                                            } else if (elem.between_plant === "มีนาคม") {
                                                // console.log("ele.name",el.name)
                                                if (begin_end > 3) {
                                                    begin_end = 3
                                                } else { }
                                            } else if (elem.between_plant === "เมษายน") {
                                                if (begin_end > 4) {
                                                    begin_end = 4
                                                } else { }
                                            } else if (elem.between_plant === "พฤษภาคม") {
                                                if (begin_end > 5) {
                                                    begin_end = 5
                                                } else { }
                                            } else if (elem.between_plant === "มิถุนายน") {
                                                if (begin_end > 6) {
                                                    begin_end = 6
                                                } else { }
                                            } else if (elem.between_plant === "กรกฎาคม") {
                                                if (begin_end > 7) {
                                                    begin_end = 7
                                                } else { }
                                            } else if (elem.between_plant === "สิงหาคม") {
                                                if (begin_end > 8) {
                                                    begin_end = 8
                                                } else { }
                                            } else if (elem.between_plant === "กันยายน") {
                                                if (begin_end > 9) {
                                                    begin_end = 9
                                                } else { }
                                            } else if (elem.between_plant === "ตุลาคม") {
                                                if (begin_end > 10) {
                                                    begin_end = 10
                                                } else { }
                                            } else if (elem.between_plant === "พฤศจิกายน") {
                                                console.log("name",ele.name)
                                                if (begin_end > 11) {
                                                    begin_end = 11
                                                } else { }
                                            } else if (elem.between_plant === "ธันวาคม") {
                                                if (begin_end >= 12) {
                                                    begin_end = 12
                                                } else { }
                                            }
                                        } else {
                                            begin_end = 0
                                        }

                                        

                                        if (elem.end_plant !== undefined) {
                                            if (elem.end_plant === "มกราคม") {
                                                if (final_end < 1) {
                                                    final_end = 1
                                                } else { }
                                            } else if (elem.end_plant === "กุมภาพันธ์") {
                                                if (final_end < 2) {
                                                    final_end = 2
                                                } else { }
                                            } else if (elem.end_plant === "มีนาคม") {
                                                if (final_end < 3) {
                                                    final_end = 3
                                                } else { }
                                            } else if (elem.end_plant === "เมษายน") {
                                                if (final_end < 4) {
                                                    final_end = 4
                                                } else { }
                                            } else if (elem.end_plant === "พฤษภาคม") {
                                                if (final_end < 5) {
                                                    final_end = 5
                                                } else { }
                                            } else if (elem.end_plant === "มิถุนายน") {
                                                if (final_end < 6) {
                                                    final_end = 6
                                                } else { }
                                            } else if (elem.end_plant === "กรกฎาคม") {
                                                if (final_end < 7) {
                                                    final_end = 7
                                                } else { }
                                            } else if (elem.end_plant === "สิงหาคม") {
                                                if (final_end < 8) {
                                                    final_end = 8
                                                } else { }
                                            } else if (elem.end_plant === "กันยายน") {
                                                if (final_end < 9) {
                                                    final_end = 9
                                                } else { }
                                            } else if (elem.end_plant === "ตุลาคม") {
                                                if (final_end < 10) {
                                                    final_end = 10
                                                } else { }
                                            } else if (elem.end_plant === "พฤศจิกายน") {
                                                if (final_end < 11) {
                                                    final_end = 11
                                                } else { }
                                            } else if (elem.end_plant === "ธันวาคม") {
                                                if (final_end < 12) {
                                                    final_end = 12
                                                } else { }
                                            }
                                        } else {
                                            final_end = 0
                                        }




                                    } else { }



                                }
                            })

                        } catch (error) {
                        }
                        // console.log(plant_obj)
                    })
                    real_plant.push({
                        name: el.name,
                        // mount: mount,
                        begin_plan: [begin, begin_end],
                        end_plan: [begin_end, final_end]

                    })
                })

                chart_result.push({
                    SE_name: element,
                    plant: real_plant
                })

            })

            req.result = chart_result;
            next();

        })


    }
}

exports.get_chart_frequency = function () {


    return function (req, res, next) {
        db.query(`SELECT user_information.name,manufacture_information.plant_type FROM ((user_information LEFT JOIN farmer_information ON user_information.user_id = farmer_information.user_id) LEFT JOIN manufacture_information ON farmer_information.farmer_id = manufacture_information.farmer_id) WHERE user_information.type_user = '3' order by manufacture_id DESC`, function (err, result) {
            if (err) throw err;
            let plant = req.body.plant_name
            let plant_type_obj = []
            let plant_name = []
            let all_plant = []
            let se_obj = []
            let plant_se = []

            let plant_result = []

            result.map((element, index) => {

                if (element.plant_type !== null) {
                    try {

                        plant_type_obj.push(...JSON.parse(element.plant_type))

                    } catch (error) {
                    }
                } else { }
            })

            plant_type_obj.map((element) => {
                plant_name.push(element.plant)
            })

            plant_name.map((element) => {
                let index = 0
                index = all_plant.findIndex((el) => el === element)
                if (index < 0) {
                    all_plant.push(element)
                } else {

                }
            })

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

            se_obj.map((el) => {

                let rang = []
                let plant_obj = []
                let se_plant

                let frequency = []
                let deliver = []
                let deliver_number = 0
                let i = 0


                result.map((ele) => {



                    if (ele.plant_type !== null) {
                        try {

                            plant_obj = JSON.parse(ele.plant_type)

                            if (el === ele.name) {

                                plant_obj.map((elem) => {

                                    if (elem.plant === plant) {

                                        let between_int = 0

                                        se_plant = elem.plant


                                        deliver.push(elem.deliver_frequency_number)

                                        if (elem.deliver_frequency_number > deliver_number) {
                                            deliver_number = elem.deliver_frequency_number
                                        } else { }


                                    } else { }


                                })



                            } else { }


                        } catch (error) {

                        }
                    }



                })


                for (i = 0; i < deliver_number; i++) {
                    frequency.push(1 + i)
                }


                frequency.map((ele) => {

                    let jan = 0, feb = 0, mar = 0, apr = 0, may = 0, jul = 0, jun = 0, aug = 0, sep = 0, oct = 0, nov = 0, dec = 0
                    let data = []
                    // console.log("ele",ele)

                    result.map((elem) => {



                        if (elem.plant_type !== null) {
                            try {

                                plant_obj = JSON.parse(elem.plant_type)

                                if (el === elem.name) {



                                    plant_obj.map((eleme) => {

                                        let jan_int = 0, feb_int = 0, mar_int = 0, apr_int = 0, may_int = 0, jun_int = 0, jul_int = 0, aug_int = 0, sep_int = 0, oct_int = 0, nov_int = 0, dec_int = 0
                                        let between_int = 0
                                        let end_int = 0
                                        let j = 0
                                        let array_int = []
                                        let k = 0
                                        let array_deliver = []


                                        if (eleme.plant === plant) {


                                            if (eleme.deliver_frequency_number >= ele) {
                                                // console.log(eleme.deliver_frequency_number)
                                                if (eleme.between_plant === "มกราคม") {

                                                    between_int = 1

                                                } else if (eleme.between_plant === "กุมภาพันธ์") {

                                                    between_int = 2

                                                } else if (eleme.between_plant === "มีนาคม") {

                                                    between_int = 3

                                                } else if (eleme.between_plant === "เมษายน") {

                                                    between_int = 4

                                                } else if (eleme.between_plant === "พฤษภาคม") {

                                                    between_int = 5

                                                } else if (eleme.between_plant === "มิถุนายน") {

                                                    between_int = 6

                                                } else if (eleme.between_plant === "กรกฎาคม") {

                                                    between_int = 7

                                                } else if (eleme.between_plant === "สิงหาคม") {

                                                    between_int = 8

                                                } else if (eleme.between_plant === "กันยายน") {

                                                    between_int = 9

                                                } else if (eleme.between_plant === "ตุลาคม") {

                                                    between_int = 10

                                                } else if (eleme.between_plant === "พฤศจิกายน") {

                                                    between_int = 11

                                                } else if (eleme.between_plant === "ธันวาคม") {

                                                    between_int = 12

                                                } else { }


                                                if (eleme.end_plant === "มกราคม") {

                                                    end_int = 1

                                                } else if (eleme.end_plant === "กุมภาพันธ์") {

                                                    end_int = 2

                                                } else if (eleme.end_plant === "มีนาคม") {

                                                    end_int = 3

                                                } else if (eleme.end_plant === "เมษายน") {

                                                    end_int = 4

                                                } else if (eleme.end_plant === "พฤษภาคม") {

                                                    end_int = 5

                                                } else if (eleme.end_plant === "มิถุนายน") {

                                                    end_int = 6

                                                } else if (eleme.end_plant === "กรกฎาคม") {

                                                    end_int = 7

                                                } else if (eleme.end_plant === "สิงหาคม") {

                                                    end_int = 8

                                                } else if (eleme.end_plant === "กันยายน") {

                                                    end_int = 9

                                                } else if (eleme.end_plant === "ตุลาคม") {

                                                    end_int = 10

                                                } else if (eleme.end_plant === "พฤศจิกายน") {

                                                    end_int = 11

                                                } else if (eleme.end_plant === "ธันวาคม") {

                                                    end_int = 12

                                                } else { }

                                                for (j = between_int; j <= end_int; j++) {

                                                    array_int.push(j)

                                                }


                                                for (k = 1; k <= eleme.deliver_frequency_number; k++) {
                                                    array_deliver.push(k)
                                                }


                                                array_int.map((elemen) => {

                                                    if (elemen === 1) {
                                                        jan_int += parseInt(eleme.deliver_value)
                                                    } else if (elemen === 2) {
                                                        feb_int += parseInt(eleme.deliver_value)
                                                    } else if (elemen === 3) {
                                                        mar_int += parseInt(eleme.deliver_value)
                                                    } else if (elemen === 4) {
                                                        apr_int += parseInt(eleme.deliver_value)
                                                    } else if (elemen === 5) {
                                                        may_int += parseInt(eleme.deliver_value)
                                                    } else if (elemen === 6) {
                                                        jun_int += parseInt(eleme.deliver_value)
                                                    } else if (elemen === 7) {
                                                        jul_int += parseInt(eleme.deliver_value)
                                                    } else if (elemen === 8) {
                                                        aug_int += parseInt(eleme.deliver_value)
                                                    } else if (elemen === 9) {
                                                        sep_int += parseInt(eleme.deliver_value)
                                                    } else if (elemen === 10) {
                                                        oct_int += parseInt(eleme.deliver_value)
                                                    } else if (elemen === 11) {
                                                        nov_int += parseInt(eleme.deliver_value)
                                                    } else if (elemen === 12) {
                                                        dec_int += parseInt(eleme.deliver_value)
                                                    }

                                                })

                                                // console.log("array_int",array_int)
                                                // console.log("deliver",eleme.deliver_frequency_number)
                                                // console.log("data",jan_int,feb_int,mar_int,apr_int,may_int,jun_int,jul_int,aug_int,sep_int,oct_int, nov_int,dec_int)
                                                jan += jan_int, feb += feb_int, mar += mar_int, apr += apr_int, may += may_int, jun += jun_int, jul += jul_int, aug += aug_int, sep += sep_int, oct += oct_int, nov += nov_int, dec += dec_int


                                                // if (eleme.plant === plant) {

                                                //     console.log(eleme.deliver_frequency_number)

                                            } else { }
                                            // } else { }

                                        } else { }



                                    })

                                    // console.log("array_int",array_int)



                                } else { }


                            } catch (error) {

                            }
                        }

                     
                    })

                    data.push(jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec)
                    rang.push({
                        name: ele,
                        data: data
                    })
                })




                if (se_plant === plant) {
                    plant_se.push(
                        {
                            name: el,
                            // deliver: deliver,
                            rang: rang,

                        }

                    )

                }

            })

            plant_result.push({
                plant: plant,
                se: plant_se
            })

            req.result = plant_result;
            next();

        })
    }
}

exports.get_chart_frequency_all = function () {


    return function (req, res, next) {
        db.query(`SELECT user_information.name,manufacture_information.plant_type FROM ((user_information LEFT JOIN farmer_information ON user_information.user_id = farmer_information.user_id) LEFT JOIN manufacture_information ON farmer_information.farmer_id = manufacture_information.farmer_id) WHERE user_information.type_user = '3' order by manufacture_id DESC`, function (err, result) {
            if (err) throw err;

            let se_obj = []
            let plant = req.body.plant_name

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
            
            let result_obj = []
            let result_se = []
            se_obj.map((element)=>{

                let frequency = []
                let result_freq = []
                let plant_obj = []
                let deliver_number = 0,i
                
                

                result.map((el)=>{

                    if (el.plant_type !== null) {
                        try {

                            plant_obj = JSON.parse(el.plant_type)

                            if (el.name === element) {
                                
                                plant_obj.map((ele) => {

                                    if (ele.plant === plant) {

                                        if(ele.deliver_frequency_number!==null){

                                            if (ele.deliver_frequency_number > deliver_number) {
                                                deliver_number = ele.deliver_frequency_number

                                            } else { }

                                        }else{ }
                                        
                                    } else { }

                                })

                            } else { }


                        } catch (error) {

                        }
                    }
                })
                // console.log(deliver_number)

                for(i=0;i<deliver_number;i++){
                    frequency.push(i+1)
                }

                frequency.map((el)=> {

                    let jan = 0, feb = 0, mar = 0, apr = 0, may = 0, jul = 0, jun = 0, aug = 0, sep = 0, oct = 0, nov = 0, dec = 0

                    result.map((ele)=>{

                        if (ele.plant_type !== null) {
                            try {
    
                                plant_obj = JSON.parse(ele.plant_type)
    
                                if (ele.name === element) {
                                    
                                    plant_obj.map((elem) => {
    
                                        if (elem.plant === plant) {
                                            // console.log("el",el)
                                            // console.log("deliver",elem.deliver_frequency_number)
                                            if(elem.deliver_frequency_number >= el){
                                                console.log(elem.deliver_frequency_number)
                                                if (elem.end_plant === "มกราคม") {

                                                    jan += parseInt(elem.deliver_value)

                                                } else if (elem.end_plant === "กุมภาพันธ์") {

                                                    feb += parseInt(elem.deliver_value)
feb
                                                } else if (elem.end_plant === "มีนาคม") {

                                                    mar += parseInt(elem.deliver_value)

                                                } else if (elem.end_plant === "เมษายน") {

                                                    apr += parseInt(elem.deliver_value)

                                                } else if (elem.end_plant === "พฤษภาคม") {

                                                    may += parseInt(elem.deliver_value)

                                                } else if (elem.end_plant === "มิถุนายน") {

                                                    jul += parseInt(elem.deliver_value)

                                                } else if (elem.end_plant === "กรกฎาคม") {

                                                    jun += parseInt(elem.deliver_value)

                                                } else if (elem.end_plant === "สิงหาคม") {

                                                    aug += parseInt(elem.deliver_value)

                                                } else if (elem.end_plant === "กันยายน") {

                                                    sep += parseInt(elem.deliver_value)

                                                } else if (elem.end_plant === "ตุลาคม") {

                                                    oct += parseInt(elem.deliver_value)

                                                } else if (elem.end_plant === "พฤศจิกายน") {

                                                    nov += parseInt(elem.deliver_value)

                                                } else if (elem.end_plant === "ธันวาคม") {

                                                    dec += parseInt(elem.deliver_value)

                                                } else { }
                                            }else{}

                                        }else{}
                                    })
                                }else{}
                            }catch(error){

                            }
                        }else{}

                    })

                    result_freq.push({
                        name : el,
                        data : [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]

                    })
                    

                })
                if(result_freq.length!==0){
                    result_se.push({
                        name : element,
                        rang : result_freq
                    })
                }
                

            })

            result_obj.push({
                plant : plant,
                se : result_se
            })

            req.result = result_obj;
            next();
             })
        }
    }

exports.get_tab_chart = function () {
    return function (req, res, next) {
        db.query(`SELECT user_information.name,manufacture_information.plant_type FROM ((user_information LEFT JOIN farmer_information ON user_information.user_id = farmer_information.user_id) LEFT JOIN manufacture_information ON farmer_information.farmer_id = manufacture_information.farmer_id) WHERE user_information.type_user = '3' order by manufacture_id DESC`, function (err, result) {
            if (err) throw err;

            let plant_type_obj = []
            let plant_name = []
            let all_plant = []

            result.map((element, index) => {

                if (element.plant_type !== null) {
                    try {

                        plant_type_obj.push(...JSON.parse(element.plant_type))

                    } catch (error) {
                    }
                } else { }
            })

            plant_type_obj.map((element) => {
                plant_name.push(element.plant)
            })

            plant_name.map((element) => {
                let index = 0
                index = all_plant.findIndex((el) => el.name === element)
                if (index < 0) {
                    all_plant.push({
                        name: element
                    })
                } else {

                }
            })

            req.result = all_plant;
            next();

        })
    }
}



exports.get_allname_peichart = function () {
    return function (req, res, next) {
        db.query(`SELECT plant_type FROM manufacture_information order by manufacture_id DESC`, function (err, result) {
            if (err) throw err;

            let plant_type_obj = []
            let plant_name = []
            let all_plant = []

            result.map((element, index) => {

                if (element.plant_type !== null) {
                    try {

                        plant_type_obj.push(...JSON.parse(element.plant_type))

                    } catch (error) {
                    }
                } else { }
            })

            plant_type_obj.map((element) => {
                plant_name.push(element.plant)
            })

            plant_name.map((element) => {
                let index = 0
                index = all_plant.findIndex((el) => el.name === element)
                if (index < 0) {
                    all_plant.push({
                        name: element
                    })
                } else {

                }
            })


            req.result = all_plant;
            next();

        })
    }
}

exports.get_table_plant = function () {
    return function (req, res, next) {
        db.query(`SELECT user_information.name,manufacture_information.plant_type FROM ((user_information LEFT JOIN farmer_information ON user_information.user_id = farmer_information.user_id) LEFT JOIN manufacture_information ON farmer_information.farmer_id = manufacture_information.farmer_id) WHERE user_information.type_user = '3' order by manufacture_id DESC`, function (err, result) {
            if (err) throw err;


            let mount = []
            let mount_st = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
            let plant_type_obj = []
            let mount_test = []

            mount_st.map((element) => {

                let plant_name = []
                let plant_all = []
                let plant_volume = []
                // let volume_total = 0
                result.map((el) => {

                    if (el.plant_type !== null) {
                        try {

                            plant_type_obj = JSON.parse(el.plant_type)

                            plant_type_obj.map((ele) => {

                                if (ele.end_plant === element) {
                                    let index = 0
                                    index = plant_name.findIndex((elem) => elem === ele.plant)
                                    if (index < 0) {
                                        plant_name.push(ele.plant)
                                       
                                    } else {

                                    }

                                 if(ele.deliver_value<1){
                            
                                 }else if(ele.deliver_frequency_number<1){
                                    // console.log(ele.deliver_value)
                                    // plant_all.push({
                                    //     name: ele.plant,
                                    //     volume : parseInt(ele.deliver_value)*1,
                                    // })
                                    
                                 }else{
                                    // console.log(ele.deliver_value)
                                    plant_all.push({
                                        
                                        name: ele.plant,
                                        volume : parseInt(ele.deliver_value)*parseInt(ele.deliver_frequency_number),
                                    })

                                 }
                                    

                                } else { }

                            })

                        } catch (error) {

                        }

                    } else { }

                })
                let plant_real = []

                // console.log(plant_all)
                
                plant_name.map((el)=>{
                    // console.log("month",element)
                    // console.log("el",el)
                    let cont_volume = 0

                    plant_all.map((ele)=>{
                        
                        if(ele.name === el){
                            if(ele.volume!==null){
                                cont_volume += parseInt(ele.volume) 
                            }else{}
                        }else{}
                        
                    })
                    if(cont_volume!==0){
                        plant_real.push({
                            plant : el,
                            volume : cont_volume
                        })

                    }else{

                    }
                    

                })
               
                if(plant_real.length!==0){
                    mount.push({
                        month: element,
                        plant: plant_real,
                    })
                }else{}
                

            })

            req.result = mount;
            next();

        })
    }
}