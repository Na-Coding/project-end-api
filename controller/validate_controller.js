var errorMessages = require("../const/error_message");
var jsonwebToken = require("jsonwebtoken");
var constance = require("../const/constance");


// exports.validate_token_admin = function () {
//     return function (req, res, next) {
//         // console.log(req.session.token)
//         if (!Boolean(req.headers['authorization'])) {
//             res.status(200).json({
//                 'success': false,
//                 message: errorMessages.err_required_token
//             })
//         } else {
//             // console.log("token")
//             jsonwebToken.verify(req.headers.authorization, constance.sign, (err, decode) => {
//                 if (err) {
//                     res.status(200).json(errorMessages.err_required_fingerprint_token)
//                 } else {
//                     if (decode.type === 1) {
//                         req.user_id = decode.id
//                         next()
//                     } else {
//                         res.status(200).json(errorMessages.err_required_fingerprint_token)
//                     }
//                 }
//             })
//         }
//     }
// }
// user information
// exports.validate_user_register = function () {
//   return function (req, res, next) {
//     if (
//       req.body.username &&
//       req.body.password &&
//       req.body.name &&
//       req.body.last_name &&
//       req.body.address &&
//       req.body.user_informationcol
//     ) {
//       next();
//     } else {
//       res.status(200).json(errorMessages.invalid_data);
//       return;
//     }
//   };
// };

exports.validate_user_login = function () {
  return function (req, res, next) {
    if (req.body.username && req.body.password) {
    
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
    }
  };
};

exports.validate_user_user_by_id = function () {
  return function (req, res, next) {
    if (req.body.user_id) {
    
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
    }
  };
};


exports.validate_user_register = function () {
  return function (req, res, next) {
    if (req.body.username && 
        req.body.password &&
        req.body.name &&
        req.body.last_name &&
        req.body.address  &&
        req.body.type_user
        ) {
      
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
    }
  };
};

exports.validate_user_update = function () {
  return function (req, res, next) {
    if (req.body.user_id &&
        req.body.username && 
        // req.body.password &&
        req.body.name &&
        req.body.last_name &&
        req.body.address 
        ) {
      
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
    }
  };
};

///////////////////////////////////////////////////////////////////////////////////////////

exports.validate_user_update_password = function () {
  return function (req, res, next) {
    if (req.body.password && req.body.user_id
        ) {
      
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
    }
  };
};

exports.validate_user_delete = function () {
  return function (req, res, next) {
    if (req.body.user_id
        ) {
      
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
    }
  };
};

exports.validate_admin_get_user = function () {
  return function (req, res, next) {
    if (req.body.team_code) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
};

// exports.validate_se_user_add = function () {
//   return function (req, res, next) {
//     if (req.body.username && req.body.password) {
//       console.log(req.body.password);
//       next();
//     } else {
//       // console.log("token")
//       jsonwebToken.verify(
//         req.headers.authorization,
//         constance.sign,
//         (err, decode) => {
//           if (err) {
//             res.status(200).json(errorMessages.err_required_fingerprint_token);
//           } else {
//             req.user_id = decode.id;
//             next();
//           }
//         }
//       );
//     }
//   };
// };
///////////////////////////////////////////////////////////////////////////////////////////

exports.validate_add_se_small = function () {
  return function (req, res, next) {
    if (
      req.body.username &&
      req.body.password &&
      req.body.name &&
      req.body.last_name &&
      req.body.address
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
};


exports.validate_add_trader = function () {
  return function (req, res, next) {
    if (
      req.body.username &&
      req.body.password &&
      req.body.name &&
      req.body.last_name &&
      req.body.address
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
};

exports.validate_add_researcher = function () {
  return function (req, res, next) {
    if (
      req.body.username &&
      req.body.password &&
      req.body.name &&
      req.body.last_name &&
      req.body.address
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
};

exports.validate_add_product = function () {
  return function (req, res, next) {
    if (
      req.body.product_name &&
      req.body.nutrient &&
      req.body.volume &&
      req.body.volume_type
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
};

exports.validate_add_product_plan = function () {
  return function (req, res, next) {
    if (
      req.body.product_id &&

      req.body.nutrient_precent &&
      req.body.plant &&
      req.body.image
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
};

exports.validate_update_product = function () {
  return function (req, res, next) {
    if (
      req.body.product_id &&
      req.body.product_name
      // req.body.nutrient &&
      // req.body.volume 
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
};

exports.validate_update_confirm_plan = function () {
  return function (req, res, next) {
    if (
      req.body.plan_id &&
      req.body.confirm
      // req.body.nutrient &&
      // req.body.volume 
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
};

exports.validate_update_plan = function () {
  return function (req, res, next) {
    if (
      req.body.plan_id &&
      req.body.product_topic &&
      req.body.plant &&
      req.body.image &&
      req.body.nutrient 
      // req.body.volume 
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
};

exports.validate_update_researcher_product = function () {
  return function (req, res, next) {
    if (
      req.body.product_id &&
      req.body.all_user_id &&
      req.body.researcher_name
      // req.body.volume 
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
};

exports.validate_update_product_plan = function () {
  return function (req, res, next) {
    if (
      req.body.plan_id &&
      req.body.product_id &&
      req.body.plan_name &&
      req.body.nutrient_precent &&
      req.body.plant &&
      req.body.image
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
};

// user Ge,In,De,Up farmer



exports.validate_user_add_farmer = function () {
  return function (req, res, next) {
    console.log(req.body.first_name,
      req.body.last_name,
      req.body.address
      // req.body.age,
      // req.body.radio,
      // req.body.leader,
      // req.body.member,
      // req.body.duration,
      // req.body.passion)
    )
    if (
      req.body.first_name &&
      req.body.last_name
      // req.body.address 
      // req.body.age &&
      // req.body.duration
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
    }
  };
};

exports.validate_user_update_farmer = function () {
  return function (req, res, next) {
    // if (
    //   req.body.farmer_id &&
    //   req.body.first_name &&
    //   req.body.last_name &&
    //   req.body.address &&
    //   req.body.age &&
    //   req.body.radio &&
    //   req.body.leader &&
    //   req.body.duration
    // ) {
    // console.log(req.body.user_id);
    next();
    // } else {
    //   res.status(200).json(errorMessages.invalid_data);
    // }
  };
};
////////////////////////////////////////////////////////////////////////

// user Ge,In,De,Up farmer member
exports.validate_user_add_member = function () {
  return function (req, res, next) {
    if (
      req.body.first_name &&
      req.body.last_name &&
      req.body.age &&
      // req.body.education &&
      // req.body.Department &&
      req.body.farmer_id
    ) {
      // console.log(req.body.user_id);
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
    }
  };
};

exports.validate_add_year_round = function () {
  return function (req, res, next) {
    if (
      req.body.plant &&
      req.body.volume &&
      req.body.volume_type &&
      // req.body.education &&
      // req.body.Department &&
      req.body.name
    ) {
      // console.log(req.body.user_id);
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
    }
  };
};

exports.validate_user_update_member = function () {
  return function (req, res, next) {
    if (
      // req.body.member_id &&
      req.body.first_name &&
      req.body.last_name &&
      req.body.age &&
      // req.body.education &&
      // req.body.Department &&
      req.body.farmer_id
    ) {
      // console.log(req.body.user_id);
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
    }
  };
};
//////////////////////////////////////////////////////////////////////////////

// user Ge,In,De,Up farmer area
exports.validate_user_add_area = function () {
  return function (req, res, next) {
    if (
      // req.body.area_owner &&
      // req.body.area_certificate && 
      // req.body.area_storage &&
      // req.body.area_holding &&
      req.body.area_wather &&
      req.body.water_storage &&
      req.body.gps &&
      req.body.employee_type &&
      // req.body.employee &&
      // req.body.farmer_id &&
      req.body.chemical_date
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
};

exports.validate_user_update_area = function () {
  return function (req, res, next) {
    if (// req.body.area_owner &&
      // req.body.area_certificate && 
      // req.body.area_storage &&
      // req.body.area_holding &&
      req.body.area_wather &&
      req.body.water_storage &&
      // req.body.gps &&
      req.body.employee_type &&
      // req.body.employee &&
      // req.body.farmer_id &&
      req.body.chemical_date &&
      // req.body.farm_worker &&
      // req.body.transformation &&
      // req.body.access_to_information &&
      // req.body.consultantsource) {
        req.body.land_home &&
      req.body.certified 

     ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
};
///////////////////////////////////////////////////////////////////////////

// user Ge,In,De,Up farmer factor
exports.validate_user_add_factor = function () {
  return function (req, res, next) {
    if (req.body.seed && req.body.equipment
      // && req.body.farmer_id && req.body.user_id
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
};

exports.validate_user_update_factor = function () {
  return function (req, res, next) {
    if (
      // req.body.factor_id &&
      // req.body.manure &&
      // req.body.manure_use &&
      req.body.manure_type &&
      req.body.seed &&
      req.body.equipment
      // req.body.equipment_organic &&
      // req.body.farmer_id 
      // req.body.user_id
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
};
//////////////////////////////////////////////////////////////////////////////

// user Ge,In,De,Up farmer harvest
exports.validate_user_add_harvest = function () {
  return function (req, res, next) {
    if (
      req.body.harvest_manage &&
      req.body.before_after_harvest &&
      req.body.packing &&
      req.body.transformation_exp &&
      req.body.have_otop &&
      req.body.agricultural_problem &&
      req.body.data_access &&
      req.body.need_and_problem
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
};

exports.validate_user_update_harvest = function () {
  return function (req, res, next) {
    if (
      req.body.harvest_manage &&
      req.body.before_after_harvest &&
      req.body.packing &&
      req.body.transformation_exp &&
      req.body.have_otop &&
      req.body.agricultural_problem &&
      req.body.data_access &&
      req.body.need_and_problem
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
};
//////////////////////////////////////////////////////////////////////////////

exports.validate_add_manufacture_value = function () {
  return function (req, res, next) {
    if (
      // req.body.plant_type &&
      req.body.program
      // req.body.begin_plant &&
      // req.body.end_plant &&
      // req.body.product_value &&
      // req.body.deliver_frequency &&
      // req.body.deliver_value &&
      // req.body.year_value &&
      // req.body.sell_price &&
      // req.body.insurance &&
      // req.body.gap 
      // req.body.gap_year &&
      // req.body.plant_type_best &&
      // req.body.sell_group
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
    }
  };
};

exports.validate_update_manufacture_value = function () {
  return function (req, res, next) {
    if (
      // req.body.farmer_id &&
      // req.body.manufacture_id &&
      req.body.program &&
      // req.body.begin_plant &&
      // req.body.end_plant &&
      // req.body.product_value &&
      // req.body.deliver_frequency &&
      // req.body.deliver_value &&
      // req.body.year_value &&
      // req.body.sell_price &&
      // req.body.insurance &&
      // req.body.gap &&
      // req.body.gap_year &&
      req.body.plant_type_best
      // req.body.plant_type
      // req.body.sell_group
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
    }
  };
};
/////////////////////////////////////////////////////////////////////////////
exports.validate_add_plant_type = function () {
  return function (req, res, next) {
    if (
      req.body.plant_type
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
    }
  };
}

exports.validate_update_plant_type = function () {
  return function (req, res, next) {
    if (req.body.plant_id && req.body.plant) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
    }
  };
};
////////////////////////////////////////////////////////////////////////////

exports.validate_add_logistic = function () {
  return function (req, res, next) {
    if (
      // req.body.farmer_id &&
      req.body.logistic_type &&
      req.body.logistic_price &&
      req.body.logistic_insurance &&
      req.body.insurance_price
      // req.body.logistic_weight_ton &&
      // req.body.logistic_weight_kg
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
    }
  };
}

exports.validate_update_logistic = function () {
  return function (req, res, next) {
    if (
      req.body.farmer_id &&
      req.body.logistic_type &&
      req.body.logistic_price &&
      req.body.logistic_insurance &&
      req.body.insurance_price &&
      req.body.logistic_weight_ton &&
      req.body.logistic_weight_kg
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
    }
  };
};
///////////////////////////////////////////////////////////////////////////

// se information
exports.validate_se_register = function () {
  return function (req, res, next) {
    if (req.body.username &&
      req.body.password &&
      req.body.name &&
      req.body.last_name &&
      req.body.address
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
};


exports.validate_update_se_small = function () {
  return function (req, res, next) {
    if (
      req.body.user_id &&
      req.body.username &&
      req.body.password &&
      req.body.name &&
      req.body.last_name &&
      req.body.address
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
};

exports.validate_update_trader = function () {
  return function (req, res, next) {
    if (
      req.body.user_id &&
      req.body.username &&
      req.body.password &&
      req.body.name &&
      req.body.last_name &&
      req.body.address
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
};

exports.validate_update_researcher = function () {
  return function (req, res, next) {
    if (
      req.body.user_id &&
      req.body.username &&
      req.body.password &&
      req.body.name &&
      req.body.last_name &&
      req.body.address
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
};

exports.validate_get_user_se = function () {
  return function (req, res, next) {
    if (req.body.team_code) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}
exports.validate_get_se_small = function () {
  return function (req, res, next) {
    if (req.body.product_id) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}

exports.validate_plant_chart = function () {
  return function (req, res, next) {
    if (req.body.plan_id) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}

exports.validate_get_plan_researchar = function () {
  return function (req, res, next) {
    if (req.body.product_id) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}

exports.validate_get_plan_researchar_show = function () {
  return function (req, res, next) {
    if (req.body.product_id) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}

exports.validate_plant_by_product = function () {
  return function (req, res, next) {
    if (req.body.product_id) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}

exports.send_plan_se = function () {
  return function (req, res, next) {
    if (req.body.plan_id &&
      req.body.product_id
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}

exports.send_plan_confirm = function () {
  return function (req, res, next) {
    if (req.body.plan_id &&
      req.body.product_id
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}

exports.send_researcher_confirm = function () {
  return function (req, res, next) {
    if (
      req.body.product_id &&
      req.body.begin &&
      req.body.end
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}

exports.send_researcher_cancel = function () {
  return function (req, res, next) {
    if (
      req.body.product_id
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}

exports.send_researcher_plan_end = function () {
  return function (req, res, next) {
    if (
      req.body.product_id && req.body.time_id
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}


exports.se_send_plan_trader = function () {
  return function (req, res, next) {
    if (req.body.plan_id &&
      req.body.product_id
    ) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}

exports.validate_nutrient_product = function () {
  return function (req, res, next) {
    if (req.body.product_id) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}

exports.validate_plant_type_chart = function () {
  return function (req, res, next) {
    if (req.body.name_se) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}


exports.validate_linechart_some_se = function () {
  return function (req, res, next) {
    if (req.body.some_se_name) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}

exports.validate_get_se_chart_value = function () {
  return function (req, res, next) {
    if (req.body.month && req.body.plant) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}

exports.validate_get_plant_volume_all_se = function () {
  return function (req, res, next) {
    if (req.body.name_plant) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}

exports.validate_get_chart_frequency = function () {
  return function (req, res, next) {
    if (req.body.plant_name) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}

exports.validate_get_chart_frequency_all = function () {
  return function (req, res, next) {
    if (req.body.plant_name) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}

exports.validate_get_se_all_farmer = function () {
  return function (req, res, next) {
    if (req.body.team_code) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}


exports.validate_delete_se_small = function () {
  return function (req, res, next) {
    if (req.body.user_id) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}

exports.validate_delete_trader = function () {
  return function (req, res, next) {
    if (req.body.user_id) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}

exports.validate_delete_researcher = function () {
  return function (req, res, next) {
    if (req.body.user_id) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}

exports.validate_delete_product = function () {
  return function (req, res, next) {
    if (req.body.product_id) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}

exports.validate_delete_product_plan = function () {
  return function (req, res, next) {
    if (req.body.plan_id) {
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data);
      return;
    }
  };
}

// exports.validate_admin_update_data_se = function () {
//   return function (req, res, next) {
//     if (
//       req.body.username &&
//       req.body.name &&
//       req.body.last_name &&
//       req.body.address &&
//       req.body.user_informationcol &&
//       req.body.team_code
//     ) {
//       // console.log(req.body.user_id);
//       next();
//     } else {
//       res.status(200).json(errorMessages.invalid_data);
//     }
//   };
// };
////////////////////////////////////////////////////////////////////

exports.validate_token = function () {
  return function (req, res, next) {
    // console.log(req.session.token)
    if (!Boolean(req.headers["authorization"])) {
      res.status(200).json({
        success: false,
        message: errorMessages.err_required_token
      });
    } else {
      // console.log("token")
      jsonwebToken.verify(
        req.headers.authorization,
        constance.sign,
        (err, decode) => {
          if (err) {
            res.status(200).json(errorMessages.err_required_fingerprint_token);
          } else {
            req.user_id = decode.id;
            next();
          }
        }
      )
    }
  }
}


exports.validate_token_se = function () {
  return function (req, res, next) {
    // console.log(req.session.token)
    if (!Boolean(req.headers["authorization"])) {
      res.status(200).json({
        success: false,
        message: errorMessages.err_required_token
      });
    } else {
      // console.log("token")
      jsonwebToken.verify(
        req.headers.authorization,
        constance.sign,
        (err, decode) => {
          if (err) {
            res.status(200).json(errorMessages.err_required_fingerprint_token);
          } else {
            if (decode.type > 3) {
              req.user_id = decode.id;

              next();
            } else {
              // console.log(decode.type)
              res
                .status(200)
                .json(errorMessages.err_required_fingerprint_token);
            }
          }
        }
      );
    }
  };
};

exports.validate_token_se_small = function () {
  return function (req, res, next) {
    // console.log(req.session.token)
    if (!Boolean(req.headers["authorization"])) {
      res.status(200).json({
        success: false,
        message: errorMessages.err_required_token
      });
    } else {
      // console.log("token")
      jsonwebToken.verify(
        req.headers.authorization,
        constance.sign,
        (err, decode) => {
          if (err) {
            res.status(200).json(errorMessages.err_required_fingerprint_token);
          } else {
            if (decode.type > 2) {
              req.user_id = decode.id;

              next();
            } else {
              // console.log(decode.type)
              res
                .status(200)
                .json(errorMessages.err_required_fingerprint_token);
            }
          }
        }
      );
    }
  };
};

exports.validate_token_trader = function () {
  return function (req, res, next) {
    // console.log(req.session.token)
    if (!Boolean(req.headers["authorization"])) {
      res.status(200).json({
        success: false,
        message: errorMessages.err_required_token
      });
    } else {
      // console.log("token")
      jsonwebToken.verify(
        req.headers.authorization,
        constance.sign,
        (err, decode) => {
          if (err) {
            res.status(200).json(errorMessages.err_required_fingerprint_token);
          } else {
            if (decode.type > 1) {
              req.user_id = decode.id;
              next();
            } else {
              // console.log(decode.type)
              res
                .status(200)
                .json(errorMessages.err_required_fingerprint_token);
            }
          }
        }
      );
    }
  };
};

exports.validate_token_researcher = function () {
  return function (req, res, next) {
    // console.log(req.session.token)
    if (!Boolean(req.headers["authorization"])) {
      res.status(200).json(errorMessages.err_required_fingerprint_token);
    } else {
      // console.log("token")
      jsonwebToken.verify(
        req.headers.authorization,
        constance.sign,
        (err, decode) => {
          if (err) {
            res.status(200).json(errorMessages.err_required_fingerprint_token);
          } else {
            if (decode.type > 0) {
              req.user_id = decode.id;
              next();
            } else {
              // console.log(decode.type)
              res.status(200).json(errorMessages.err_required_fingerprint_token);
            }
          }
        }
      );
    }
  };
};

exports.validate_token_admin = function () {
  return function (req, res, next) {
    // console.log(req.session.token)
    if (!Boolean(req.headers["authorization"])) {
      res.status(200).json({
        success: false,
        message: errorMessages.err_required_token
      });
    } else {
      // console.log("token")
      jsonwebToken.verify(
        req.headers.authorization,
        constance.sign,
        (err, decode) => {
          if (err) {
            // console.log(decode.type)
            res.status(200).json(errorMessages.err_required_fingerprint_token);
          } else {
            if (decode.type > 4) {
              req.user_id = decode.id;
              next();
            } else {
              console.log(decode.type)
              res
                .status(200)
                .json(errorMessages.err_required_fingerprint_token);
            }
          }
        }
      );
    }
  };
};

// SE
exports.validate_admin_update_se = function () {
  return function (req, res, next) {
    if (
      req.body.username &&
      req.body.name &&
      req.body.last_name &&
      req.body.address
      // req.body.user_informationcol  
    ) {
      // console.log(req.body.user_id);
      next();
    } else {
      res.status(200).json(errorMessages.invalid_data)
    }
  };
};
