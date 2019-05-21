exports.month_to_number = function (month) {
    let number_of_month = 0

    if (month === "มกราคม") {

        number_of_month = 1

    } else if (month === "กุมภาพันธ์") {

        number_of_month = 2

    } else if (month === "มีนาคม") {

        number_of_month = 3

    } else if (month === "เมษายน") {

        number_of_month = 4

    } else if (month === "พฤษภาคม") {

        number_of_month = 5

    } else if (month === "มิถุนายน") {

        number_of_month = 6

    } else if (month === "กรกฎาคม") {

        number_of_month = 7

    } else if (month === "สิงหาคม") {

        number_of_month = 8

    } else if (month === "กันยายน") {

        number_of_month = 9

    } else if (month === "ตุลาคม") {

        number_of_month = 10

    } else if (month === "พฤศจิกายน") {

        number_of_month = 11

    } else if (month === "ธันวาคม") {

        number_of_month = 12

    }else{ }

    return number_of_month;
}


