const bcrypt = require("bcrypt");
const Staff =  require("../models/staff.model");

// async function createAdmin (payload) {

//     const foundEmailOrPhone = await Staff.findOne ({$or: 
//     [{email: payload.email}, {phone: payload.phone}
//     ]})
//     if (foundEmailOrPhone) {
//     return{
//         message: "Staff phone or email already registered",
//         status: "failure",
//         statusCode: 400
//     }
//     }
//     // to hash a password
//     const saltRounds = 10;
//     const generatedSalt = await bcrypt.genSalt(saltRounds)
//     const hashedPassword = await bcrypt.hash(payload.password, generatedSalt)

//     payload.password = hashedPassword;
//     const savedStaff = await Staff.create(payload)
//     return {
//         message: "Staff account created successfully",
//         status: "success",
//         statusCode: 201,
//         data: savedStaff
//     }
// }

// module.exports = {
//     createAdmin
// }

// /* this above method is easier as compared to checkin for email seperatedly and then 
// checking for password as seen in the users.services js file */

// this fnction was moved to company services