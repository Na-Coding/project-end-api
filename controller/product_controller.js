let errorMessages = require('../const/error_message')
let db = require('../connection/dbConnection')
let constance = require('../const/constance')
let jsonwebToken = require('jsonwebtoken')
let bcrypt = require('bcryptjs');
let encrytp = require('../const/encrypt')

exports.trader_add_product = function () {
    return function (req, res, next) {

        let productInfo = {
            product_name: req.body.product_name,
            nutrient: req.body.nutrient,
            volume: req.body.volume,
            volume_type: req.body.volume_type,
            all_user_id: req.body.all_user_id,
            researcher_name: req.body.researcher_name,
            trader_id: req.user_id,
            product_status: '0'
        }
        console.log(productInfo.volume_type)
        db.query(`INSERT INTO product_information (product_id,product_name,nutrient,volume,volume_type,all_user_id,product_status,researcher_name,trader_id) VALUES
                        (null,'${productInfo.product_name}','${productInfo.nutrient}','${productInfo.volume}','${productInfo.volume_type}','${productInfo.all_user_id}','${productInfo.product_status}','${productInfo.researcher_name}','${productInfo.trader_id}')`, function (err, result) {
                if (err) throw err;
                next();
            })


    }
}

exports.update_researcher_product = function () {
    return function (req, res, next) {

        console.log("all_user_id",req.body.all_user_id)
        db.query(`UPDATE product_information SET all_user_id = '${req.body.all_user_id}',researcher_status = '${req.body.all_user_id}',researcher_name = '${req.body.researcher_name}',product_status = '1' where product_id = '${req.body.product_id}'`, function (err, result) {
            if (err) throw err;
            next();
        })



    }
}


exports.trader_update_product = function () {
    return function (req, res, next) {

        let productInfo = {
            product_name: req.body.product_name,
            nutrient: req.body.nutrient,
            volume: req.body.volume,
            volume_type: req.body.volume_type
        }
        if (req.body.product_id) {
            db.query(`UPDATE product_information SET product_name = '${productInfo.product_name}',
                                                 nutrient = '${productInfo.nutrient}', 
                                                 volume = '${productInfo.volume}',
                                                 volume_type ='${productInfo.volume_type}'
                                                 where product_id = '${req.body.product_id}'`, function (err, result) {
                    if (err) throw err;
                    next();
                })
        } else {
            db.query(`INSERT INTO product_information (product_id,product_name,nutrient,volume,volume_type) VALUES
                        (null,'${productInfo.product_name}','${productInfo.nutrient}','${productInfo.volume}','${productInfo.volume_type}')`, function (err, result) {
                    if (err) throw err;
                    next();
                })
        }


    }
}

exports.trader_delete_product = function () {
    return function (req, res, next) {
        db.query(`DELETE FROM product_information where product_id = ${req.body.product_id}`, function (err, result) {
            if (err) throw err;
            req.result = result;
            next();

        })
    }
}

exports.get_product = function () {
    return function (req, res, next) {

        db.query(`SELECT * FROM product_information LEFT JOIN user_information on product_information.trader_id = user_information.user_id  order by product_id DESC`, function (err, result) {
            if (err) throw err;
            let element_obj = []
            
            result.map((element) => {
                let confirm = []
                let cancel = []
                // console.log(element.researcher_cancel_name)
                try {
                    element.nutrient = JSON.parse(element.nutrient)
                    element.all_user_id = JSON.parse(element.all_user_id)
                    element.researcher_name = JSON.parse(element.researcher_name)
                    
                    console.log(element.researcher_cancel_name)

                    element.researcher_confirm_name = JSON.parse(element.researcher_confirm_name)
                    
                    element.researcher_confirm_name.map((ele)=>{

                        confirm.push({
                            name : ele.name,
                            begin: ele.begin,
                            end : ele.end
                        })

                    })
                    element.researcher_confirm_name = confirm
                    
                    


                } catch (err) {
                }

                try {

                    element.researcher_cancel_name = JSON.parse(element.researcher_cancel_name)
                   
                    element.researcher_cancel_name.map((ele)=>{

                        cancel.push({
                            name : ele
                        })

                    })
                    
                    element.researcher_cancel_name = cancel
                    
                } catch (error) {
                    
                }

                element_obj.push(element)
            })

            req.result = element_obj;
            next();

        })
    }
}



exports.trader_get_product = function () {
    return function (req, res, next) {
        db.query(`SELECT product_name,product_status FROM product_information where trader_id = '${req.user_id}' ORDER BY product_id DESC `, function (err, result) {

            if (err) throw err;


            let element_obj = []
            result.map((element) => {
                try {
                    element.nutrient = JSON.parse(element.nutrient)
                    element_obj.push(element)
                } catch (error) {

                }

            })
            req.result = result
            next();

        })

    }
}


exports.get_researcher_product = function () {
    return function (req, res, next) {

        db.query(`SELECT * FROM product_information`, function (err, result) {
            if (err) throw err;
            let product_id = []

            result.map((element) => {
                try {
                    let element_obj = JSON.parse(element.researcher_status)

                    element_obj.map((el) => {
                        if (req.user_id === el) {
                            product_id.push(element.product_id)
                        } else {

                        }
                    })

                } catch (error) {

                }

            })

            if (product_id.length !== 0) {
                db.query(`SELECT product_id,product_name,nutrient,volume,volume_type FROM product_information where product_id in (${product_id}) ORDER BY product_id DESC`, function (err, result) {
                    if (err) throw err;

                    let element_obj = []

                    result.map((element) => {
                        try {
                            element.nutrient = JSON.parse(element.nutrient)
                            element.all_user_id = JSON.parse(element.all_user_id)
                        } catch (err) {
                        }
                        element_obj.push(element)
                    })

                    req.result = element_obj;
                    next();

                })
            } else {
                req.result = "ไม่มีผลผลิตที่ต้องวิจัย";
                next();
            }

        })
    }
}

exports.get_researcher_confirm = function () {
    return function (req, res, next) {

        db.query(`SELECT * FROM product_information`, function (err, result) {
            if (err) throw err;
            let product_id = []

            result.map((element) => {
                try {
                    let element_obj = JSON.parse(element.researcher_confirm)

                    element_obj.map((el) => {
                        if (req.user_id === el) {
                            product_id.push(element.product_id)

                        } else {

                        }
                    })

                } catch (error) {

                }

            })

            if (product_id.length !== 0) {
                db.query(`SELECT product_id,product_name,nutrient,volume,volume_type FROM product_information where product_id in (${product_id}) ORDER BY product_id DESC`, function (err, result) {
                    if (err) throw err;

                    // db.query(`SELECT * FROM product_time where researcher_id = '${req.user_id}'`, function (err, result_time) {
                        db.query(`SELECT * FROM product_time LEFT JOIN product_information ON product_time.product_id = product_information.product_id where product_time.researcher_id = '${req.user_id}'`, function (err, result_time) {
                        if (err) throw err;
                      
                        let element_obj = []
                        
                        // result.map((element) => {
                        //     // let time = ""
                        //     let time = []
                            
                        //     result_time.map((el)=>{
                        //         if(el.product_id===element.product_id){
                                    // el.time = JSON.parse(el.time)
                                    // // console.log(el[0])
                                    // el.time.map((ele,index)=>{
                                        
                                    //     if(index===0){
                                    //         time.push({
                                    //             begin : ele
                                    //         })
                                    //     }else{}

                                    //     if(index===1){
                                    //         time.push({
                                    //             end : ele
                                    //         })
                                    //     }else{}

                                    // })
                                    // time = el.time
                            //     }
                            // })

                            // try {
                            //     element.nutrient = JSON.parse(element.nutrient)
                            //     element.all_user_id = JSON.parse(element.all_user_id)
                            // } catch (err) {
                            // }
                            // element_obj.push({
                            //     product_id: element.product_id,
                            //     product_name: element.product_name,
                            //     nutrient: element.nutrient,
                            //     volume: element.volume,
                            //     volume_type: element.volume_type ,
                            //     time : time
                            // })
                        // })
                        result_time.map((element)=>{

                            let time = []

                            element.time = JSON.parse(element.time)
                                    // console.log(el[0])
                                    element.time.map((ele,index)=>{
                                        
                                        if(index===0){
                                            time.push({
                                                begin : ele
                                            })
                                        }else{}

                                        if(index===1){
                                            time.push({
                                                end : ele
                                            })
                                        }else{}

                                    })

                                    try {
                                        element.nutrient = JSON.parse(element.nutrient)
                                        element.all_user_id = JSON.parse(element.all_user_id)
                                    } catch (err) {
                                    }
                                    element_obj.push({
        
                                        product_id: element.product_id,
                                        time_id: element.time_id,
                                        product_name: element.product_name,
                                        nutrient: element.nutrient,
                                        volume: element.volume,
                                        volume_type: element.volume_type ,
                                        time : time
                                    })
                            
                        })


                        req.result = element_obj;
                        next();
                    })

                })
            } else {
                req.result = "ไม่มีผลผลิตที่ต้องวิจัย";
                next();
            }

        })
    }
}

exports.get_researcher = function () {
    return function (req, res, next) {

        db.query(`SELECT username,name FROM user_information WHERE type_user = '1'`, function (err, result) {
            if (err) throw err;
            req.result = result;
            next();

        })
    }
}

exports.get_nutrient_product = function () {
    return function (req, res, next) {

        db.query(`SELECT * FROM product_information WHERE product_id = ${req.body.product_id}`, function (err, result) {
            if (err) throw err;
            console.log(result.nutrient)
            // let element_obj = 
            req.result = result;
            next();

        })
    }
}

exports.get_all_product_researcher = function () {
    return function (req, res, next) {

        db.query(`SELECT * FROM product_information`, function (err, result) {

            if (err) throw err;
            let product_id = []


            result.map((element) => {
                let user_id = []
                try {

                    user_id.push(JSON.parse(element.all_user_id))

                } catch (err) {

                }

                if (user_id.length > 0) {
                    product_id.push(element.product_id)
                } else {

                }

            })
            // product_id= 0
            if (product_id.length > 0) {
                db.query(`SELECT * FROM product_information where product_id in (${product_id})`, function (err, result) {
                    if (err) throw err;
                    let element_obj = []

                    result.map((element) => {
                        try {

                            element.all_user_id = JSON.parse(element.all_user_id)
                            element.researcher_name = JSON.parse(element.researcher_name)
                        } catch (err) {
                        }
                        element_obj.push(element)
                    })

                    req.result = element_obj;
                    next();

                })
            } else {
                req.result = "ยังไม่มีผู้พัฒนาผลิตภัณฑ์";
                next();
            }



        })
    }
}

exports.send_plan_confirm = function () {
    return function (req, res, next) {


        db.query(`SELECT * FROM product_information where product_id = ${req.body.product_id}`, function (err, result_product) {
            if (err) throw err;
          
            let researcher_confirm = []
            let researcher_status = []
            let staus = []
            let obj = [req.user_id]
            let count = 0
            count = parseInt(req.user_id)
            try {

                researcher_confirm = JSON.parse(result_product[0].researcher_confirm)
                researcher_status = JSON.parse(result_product[0].researcher_status)
            } catch (error) {

            }

         
            researcher_confirm.map((element,index) => {
                
                index = obj.findIndex((el) => el === element)
                if (index < 0) {
                    obj.push(
                        element
                    )
                } else {

                }
            })

            researcher_status.map((element,index) => {
                
                index = staus.findIndex((el) => el === element)
                
                if (index < 0) {
                
                    if(element!==count){
                        staus.push(
                            element
                        )
                    }else{
                    }
                    
                } else {

                }
                
            })


            db.query(`UPDATE product_information SET researcher_confirm = '[${obj}]' ,researcher_status = '[${staus}]' where product_id = ${req.body.product_id}`, function (err, result) {
                if (err) throw err;

                db.query(`SELECT * FROM user_information where user_id in (${obj})`, function (err, result_obj) {
                    if (err) throw err;
                    let result_real = []
                    let researcher_confirm_name

                    let begin = req.body.begin
                    let end = req.body.end
                   
                    req.body.begin.map((el)=>{
                        begin = el
                    })

                    req.body.end.map((el)=>{
                        end = el
                    })
              

                    try {
                        
                        researcher_confirm_name = JSON.parse(result_product[0].researcher_confirm_name)
                        researcher_confirm_name.map((el)=>{
                            result_real.push(el)
                        })

                    } catch (error) {
        
                    }
                     
                    result_obj.map((elemen_obj) => {

                        

                        if(elemen_obj.user_id === req.user_id){

                            // result_real.push( elemen_obj.name + " เริ่ม: " + begin + " สิ้นสุด: " + end )
                            result_real.push( {
                                name: elemen_obj.name,
                                begin: begin,
                                end : end
                            })

                        }else{ }
                        
                    })
                    // console.log("real",result_real)

                    // let insert_time = []

                    // insert_time.push({
                    //     begin: begin,
                    //     end : end
                    // })

                    db.query(`INSERT INTO product_time (time_id,product_id,researcher_id,time) VALUES
                    (NULL,'${req.body.product_id}','${req.user_id}','[${JSON.stringify(begin)},${JSON.stringify(end)}]')`, function (err, result) {
                        if (err) throw err;
                        // req.result = result_real

                        db.query(`UPDATE product_information SET researcher_confirm_name = '${JSON.stringify(result_real)}' where product_id = ${req.body.product_id}`, function (err, result) {
                        if (err) throw err;
                        req.result = result_real
                        next();
                    })
                    })
                })
            })

        })

    }
}

exports.send_researcher_cancel = function () {
    return function (req, res, next) {


        db.query(`SELECT * FROM product_information where product_id = ${req.body.product_id}`, function (err, result_product) {
            if (err) throw err;

            let researcher_confirm = []
            let researcher_status = []
            let staus = []
            let obj = [req.user_id]
            let count = 0
            count = parseInt(req.user_id)
            try {

                researcher_confirm = JSON.parse(result_product[0].researcher_cancel)
                researcher_status = JSON.parse(result_product[0].researcher_status)
            } catch (error) {

            }
            

            
            researcher_confirm.map((element,index) => {
                
                index = obj.findIndex((el) => el === element)
                if (index < 0) {
                    obj.push(
                        element
                    )
                } else {

                }
            })
            
            researcher_status.map((element,index) => {
                
                index = staus.findIndex((el) => el === element)
                if (index < 0) {
                   
                    if(element!==count){
                        // console.log(element)
                        staus.push(
                            element
                        )
                    }else{
                    }
                    
                } else {

                }
                
            })
            

            db.query(`UPDATE product_information SET researcher_cancel = '[${obj}]' ,researcher_status = '[${staus}]' where product_id = ${req.body.product_id}`, function (err, result) {
                if (err) throw err;

                db.query(`SELECT * FROM user_information where user_id in (${obj})`, function (err, result_obj) {
                    if (err) throw err;
                    let result_real = []
                    result_obj.map((elemen_obj) => {
                        console.log(elemen_obj.name)
                        result_real.push(elemen_obj.name)
                    })

                    db.query(`UPDATE product_information SET researcher_cancel_name = '${JSON.stringify(result_real)}' where product_id = ${req.body.product_id}`, function (err, result) {
                        if (err) throw err;
                        req.result = result_real
                        next();
                    })
                })
            })

        })

    }
}

exports.send_researcher_plan_end = function () {
    return function (req, res, next) {

        db.query("DELETE FROM product_time WHERE product_id = '" + req.body.product_id + "' AND researcher_id = '" + req.user_id + "' AND time_id = '" + req.body.time_id + "' ", function (err, result) {
            if (err) {
                res.status(200).json(errorMessages.err_incorrect_delete)
            };

        db.query(`SELECT * FROM product_time LEFT JOIN product_information ON product_time.product_id = product_information.product_id where product_time.product_id = ${req.body.product_id} AND product_time.researcher_id = ${req.user_id}`, function (err, result_product) {
            if (err) throw err;

            let researcher_confirm = []
            let obj = [req.user_id]
            let researcher_status = []
            let staus = []
            let count = 0
            count = parseInt(req.user_id)

            try {
                researcher_confirm = JSON.parse(result_product[0].plan_end)
                researcher_status = JSON.parse(result_product[0].researcher_confirm)
            } catch (error) {

            }

         
            researcher_confirm.map((element,index) => {
                
                index = obj.findIndex((el) => el === element)
                if (index < 0) {
                    obj.push(
                        element
                    )
                } else {

                }
            })

            researcher_status.map((element,index) => {
                
                index = staus.findIndex((el) => el === element)
                if (index < 0) {
                   if(result_product.length!==0){
                    staus.push(
                        element
                    )
                   }else{

                    if(element!==count){
                        
                        staus.push(
                            element
                        )
                    }else{

                    }

                   }
                    
                } else {

                }
                
            })

            db.query(`UPDATE product_information SET plan_end = '[${obj}]' ,researcher_confirm = '[${staus}]' where product_id = ${req.body.product_id}`, function (err, result) {
                if (err) throw err;

                        req.result = result

                        // db.query("DELETE FROM product_time WHERE product_id = '" + req.body.product_id + "' AND researcher_id = '" + req.user_id + "' ", function (err, result) {
                        //     if (err) throw err;

                            // db.query("DELETE FROM product_time WHERE product_id = '" + req.body.product_id + "' AND researcher_id = '" + req.user_id + "' ", function (err, result) {
                            //     if (err) {
                            //         res.status(200).json(errorMessages.err_incorrect_delete)
                            //     };
                            //     next()
                            // })


                                next()
                            })

                        // })
         
               
            })

        })

    }
}