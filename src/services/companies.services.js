// const Company = require("../models/company.model")
const Company = require("../models/company.model");
const jwt = require("jsonwebtoken");
const staff = require("../models/staff.model");
const bcrypt = require("bcrypt");
const responses = require("../utils/response");

async function createCompany(payload) {

    /**
     * Check if name and email and regNo already exists
     * Add the company to db
     * 
     * const{name, contactEmail, regNo} = payload;
     */
        const foundName = await Company.findOne({name:payload.name});
        if (foundName) {
             return responses.buildFailureResponse("Company name already exists", 400)
            //     {message: "Company name already exists",
            //     statusCode: 400,
            //     status: "failure"
            // }
        }
        const foundEmail = await Company.findOne({email:payload.email});
        if (foundEmail) {
            return responses.buildFailureResponse("Company email already registered", 400)
            //     {message: "Company email already registered",
            //     statusCode: 400,
            //     status: "failure"
            // }
        }
        // const foundregNo = await Company.findOne({regNo:payload.regNo});
        // if (foundregNo) {
        //     return {
        //         message: "RegNo already registered",
        //         statusCode: 400,
        //         status: "failure"
        //     }
        // }
        // now that we have validated our data, let us create the db
        // const newCompany = new Company({
        //     name: payload.name,
        //     contactEmail: payload.contactEmail,
        //     regNo: payload.regNo
        // });
        // const savedCompany = await newCompany.save();
        // return savedCompany; // tabNine suggestions
        const newCompany = await Company.create(payload)
        return responses.buildSuccessResponse("Company created successfully", 201, newCompany);
//             message: "Company created successfully",
//             statusCode: 201,
//             status: "success",
//             data: newCompany
//         }; // tutors suggestion
}

async function createAdmin (payload) {

    const foundEmailOrPhone = await Staff.findOne ({$or: 
    [{email: payload.email}, {phone: payload.phone}
    ]})
    if (foundEmailOrPhone) {
    return responses.buildFailureResponse("STaff phone or email already registered", 400)
    //     {message: "Staff phone or email already registered",
    //     status: "failure",
    //     statusCode: 400
    // }
    } 
    // to hash a password
    const saltRounds = 10;
    const generatedSalt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(payload.password, generatedSalt)

    payload.password = hashedPassword;
    payload.role = "admin";
    const savedStaff = await Staff.create(payload)
    return responses.buildSuccessResponse("Staff account created successfully",201, savedStaff)
    
};


async function createStaff (payload) {

    const foundEmailOrPhone = await Staff.findOne ({$or: 
    [{email: payload.email}, {phone: payload.phone}
    ]})
    if (foundEmailOrPhone) {
    return responses.buildFailureResponse("Staff phone or email already registered", 400)
    } 
    // to hash a password
    const saltRounds = 10;
    const generatedSalt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(payload.password, generatedSalt)

    payload.password = hashedPassword;
    payload.role = "staff";
    const savedStaff = await Staff.create(payload)
    return responses.buildSuccessResponse("Staff account created successfully", 201, savedStaff);
}


const login = async (payload) => {
    try {
        const foundUser = await Staff.findOne({ email: payload.email})
        if(!foundUser) {
            return responses.buildFailureResponse("User not found", 404)
            //     message: "User not found",
            //     status: "failure",
            //     statusCode: 400
            // }
        }
        if (foundUser.role !== "admin") {
            return responses.buildFailureResponse("Only admins are allowed", 403)
        };
        
        const foundPassword = await bcrypt.compare(payload.password, foundUser.password)
        if(!foundPassword) {
             return responses.buildFailureResponse("Password Incorrect", 403)
            //    { message: "Password incorrect",
            //     status: "failure",
            //     statusCode: 403
            // }
        }

        const token = jwt.sign({
            email: foundUser.email, 
            firstName: foundUser.firstName, 
            role: foundUser.role, 
            _id: foundUser._id}, 
            process.env.JWT_SECRET, {
              expiresIn: '30d'}
        )
        foundUser.accessToken = token
        return responses.buildSuccessResponse("Login Successful", 200, foundUser)
    //    return {
    //     message: "Login Successful",
    //     status: "success",
    //     data: foundUser,
    //     accessToken: token,
    //     statusCode: 200
    //    }
    } catch (error) {
         return responses.buildFailureResponse("Unable to login",  500)
        //    { message: "Unable to Login",
        //     status: "failure",
        //     statusCode: 500
        // }
    }
}

module.exports = {
    createCompany,
    createStaff,
    createAdmin,
    login
}