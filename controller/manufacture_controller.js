let errorMessages = require("../const/error_message");
let db = require("../connection/dbConnection");
let constance = require("../const/constance");

exports.add_manufacture_value = function () {
  return function (req, res, next) {
    let manufactureInfo = {
      farmer_id: req.body.farmer_id,
      program: req.body.program,
      begin_plant: req.body.begin_plant,
      end_plant: req.body.end_plant,
      product_value: req.body.product_value,
      deliver_frequency: req.body.deliver_frequency,
      deliver_frequency_number: req.body.deliver_frequency_number,
      deliver_value: req.body.deliver_value,
      year_value: req.body.year_value,
      sell_price: req.body.sell_price,
      insurance_price: req.body.insurance_price,
      insurance_partners: req.body.insurance_partners,
      gap: req.body.gap,
      gap_year: req.body.gap_year,
      plant_type: req.body.plant_type,
      plant_type_best: req.body.plant_type_best,
      price_wage: req.body.price_wage,
      logistic_type: req.body.logistic_type,
      logistic_price: req.body.logistic_price,

      sell_group: req.body.sell_group,
      sell_rice: req.body.sell_rice,
      price_consumer: req.body.price_consumer,

      sell_compiler_volume: req.body.sell_compiler_volume,
      price_compiler: req.body.price_compiler,

      sell_enterprise_volume: req.body.sell_enterprise_volume,
      price_enterprise: req.body.price_enterprise,

      sell_mill_volume: req.body.sell_mill_volume,
      price_mill: req.body.price_mill,

      sell_supermarket_volume: req.body.sell_supermarket_volume,
      price_supermarket: req.body.price_supermarket,

      sell_agent_volume: req.body.sell_agent_volume,
      price_agent: req.body.price_agent,

      sell_export_volume: req.body.sell_export_volume,
      price_export: req.body.price_export,

      sell_processing_plant_volume: req.body.sell_processing_plant_volume,
      price_processing_plant: req.body.price_processing_plant,

      sell_seed_volume: req.body.sell_seed_volume,
      price_seed: req.body.price_seed,

      sell_other_volume: req.body.sell_other_volume,
      price_other: req.body.price_other,
      rice_sell:req.body.sell_rice,
    };


    db.query(
      `INSERT INTO manufacture_information 
        (manufacture_id,farmer_id,program,plant_type,plant_type_best,sell_rice) VALUES
            (NULL,'${manufactureInfo.farmer_id}','${manufactureInfo.program}','${manufactureInfo.plant_type}','${manufactureInfo.plant_type_best}','${manufactureInfo.sell_rice}')`,
      function (err, result) {
        if (err) throw err;
        console.log(manufactureInfo.plant_type)

        next();
      })
  };
};

exports.update_manufacture_value = function () {
  return function (req, res, next) {
    console.log(req.body.program)
    console.log(req.body.plant_type_best)

    if (req.body.manufacture_id) {
      db.query(`UPDATE manufacture_information SET 
                  program = '${req.body.program}',
                  plant_type  = '${req.body.plant_type}',
                  plant_type_best  = '${req.body.plant_type_best}',
                  sell_rice  = '${req.body.sell_rice}'
    WHERE manufacture_id = '${req.body.manufacture_id}'`,

        function (err, result) {
          if (err) throw err;

          next();
        })
    } else {
      let manufactureInfo = {
        farmer_id: req.body.farmer_id,
        program: req.body.program,
        begin_plant: req.body.begin_plant,
        end_plant: req.body.end_plant,
        product_value: req.body.product_value,
        deliver_frequency: req.body.deliver_frequency,
        deliver_frequency_number: req.body.deliver_frequency_number,
        deliver_value: req.body.deliver_value,
        year_value: req.body.year_value,
        sell_price: req.body.sell_price,
        insurance_price: req.body.insurance_price,
        insurance_partners: req.body.insurance_partners,
        gap: req.body.gap,
        gap_year: req.body.gap_year,
        plant_type: req.body.plant_type,
        plant_type_best: req.body.plant_type_best,
        price_wage: req.body.price_wage,
        logistic_type: req.body.logistic_type,
        logistic_price: req.body.logistic_price,

        sell_group: req.body.sell_group,

        sell_rice: req.body.sell_rice,
        sell_consumer_volume: req.body.sell_rice,
            price_consumer: req.body.price_consumer,

            sell_compiler_volume: req.body.sell_compiler_volume,
            price_compiler: req.body.price_compiler,

            sell_enterprise_volume: req.body.sell_enterprise_volume,
            price_enterprise: req.body.price_enterprise,

            sell_mill_volume: req.body.sell_mill_volume,
            price_mill: req.body.price_mill,

            sell_supermarket_volume: req.body.sell_supermarket_volume,
            price_supermarket: req.body.price_supermarket,

            sell_agent_volume: req.body.sell_agent_volume,
            price_agent: req.body.price_agent,

            sell_export_volume: req.body.sell_export_volume,
            price_export: req.body.price_export,

            sell_processing_plant_volume: req.body.sell_processing_plant_volume,
            price_processing_plant: req.body.price_processing_plant,

            sell_seed_volume: req.body.sell_seed_volume,
            price_seed: req.body.price_seed,

            sell_other_volume: req.body.sell_other_volume,
            price_other: req.body.price_other,
            rice_sell:req.body.sell_rice,
      };


      db.query(
        `INSERT INTO manufacture_information 
          (manufacture_id,farmer_id,program,plant_type,plant_type_best,sell_rice) VALUES
              (NULL,'${manufactureInfo.farmer_id}','${manufactureInfo.program}','${manufactureInfo.plant_type}','${manufactureInfo.plant_type_best}','${manufactureInfo.sell_rice}')`,
        function (err, result) {
          if (err) throw err;
          console.log(manufactureInfo.plant_type)

          next();
        })
    }
  };
};

exports.delete_manufacture_value = function () {
  return function (req, res, next) {
    db.query(
      "DELETE FROM manufacture_information WHERE farmer_id = '" +
      req.body.farmer_id + "'  ",
      function (err, result) {
        if (err) {
          res.status(200).json(errorMessages.err_incorrect_delete);
        }
        next();
      }
    );
  };
};

exports.get_manufacture = function () {
  return function (req, res, next) {
    db.query(`SELECT * FROM manufacture_information WHERE manufacture_id = '${req.body.manufacture_id}' `, function (err, result) {
      if (err) throw err;
      req.result = result;
      next();
    });
  };
};

// plant_type
// exports.add_plant_type = function () {
//   return function (req, res, next) {

//     db.query(`SELECT manufacture_information.plant_type
//     FROM manufacture_information WHERE farmer_id = '${req.body.farmer_id}' `, function (err, result) {
//         if (err) throw err;
//         db.query(`INSERT INTO manufacture_information  `, function (err, result) {
//             if (err) throw err;
//             let element_obj
//             let mid_obj = []
//             let new_obj = []

//             result.map((element, index) => {
//               element_obj = JSON.parse(element.plant_type)
//               mid_obj.push(...element_obj)
//             })
//             db.query(`UPDATE manufacture_information 
//         SET plant_type = '${req.body.plant_type}'
//         WHERE manufacture_id = '${req.body.manufacture_id}'`,
//               function (err, result1) {
//                 if (err) throw err;


//                 req.result = result1;
//                 next();

//               })
//           })
//       })
//   }
// }
exports.add_plant_type = function () {
  return function (req, res, next) {
    db.query(`UPDATE manufacture_information 
      SET plant_type  = '${req.body.plant_type}'
      WHERE manufacture_id = '${req.body.manufacture_id}'`,
      function (err, result) {
        if (err) throw err;
        next();
      }
    );
  };
};

exports.update_plant_type = function () {
  return function (req, res, next) {
    db.query(`UPDATE manufacture_information 
      SET plant_type  = '${req.body.plant_type}'
      WHERE manufacture_id = '${req.body.manufacture_id}'`,
      function (err, result) {
        if (err) throw err;
        next();
      }
    );
  };
};

exports.delete_plant_type = function () {
  return function (req, res, next) {
    db.query(
      `UPDATE manufacture_information SET 
      plant_type  = '${req.body.plant_type}'
      where manufacture_id = '${req.body.manufacture_id}'  `,
      function (err, result) {
        if (err) {
          res.status(200).json(errorMessages.err_incorrect_delete);
        }
        next();
      }
    );
  };
};

// exports.get_plant_type = function () {
//   return function (req, res, next) {
//     db.query(`SELECT manufacture_information.plant_type
//     FROM manufacture_information `, function (err, result) {
//         if (err) throw err;

//         let element_obj
//         let all_plant_type = []

//         result.map((element, index) => {
//           element_obj = JSON.parse(element.plant_type)
//           all_plant_type.push(...element_obj)


//         })
//         req.result = all_plant_type;
//         next();
//       });
//   };
// };

exports.user_get_plant_type = function () {
  return function (req, res, next) {
    db.query(`SELECT manufacture_information.plant_type
    FROM manufacture_information WHERE farmer_id = '${req.body.farmer_id}' `, function (err, result) {
        if (err) throw err;

        // let disnict_plant = []
        // let index = 0

        let element_obj
        let all_plant_type = []

        result.map((element, index) => {
          element_obj = JSON.parse(element.plant_type)
          all_plant_type.push(...element_obj)

          // console.log("elememt_obj",element_obj);
          // console.log("all_plant_type",all_plant_type);



          // element_obj.map((el, i) => {

          //   index = disnict_plant.findIndex((find) => find === el.plant)
          //   if (index < 0) {
          //     disnict_plant.push(el.plant)

          //   } else {

          //   }

          // })


        })
        // req.result = disnict_plant;
        req.result = all_plant_type;
        next();
      });
  };
};