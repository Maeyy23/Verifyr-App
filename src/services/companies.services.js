const Company = require("../models/company.model");
const Staff = require("../models/staff.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const responses = require("../utils/response");
const generateResetPin = require('../utils/generateResetPin');
const sendMail = require("../utils/sendMail");


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
        }
        const foundEmail = await Company.findOne({contactEmail:payload.contactEmail});
        if (foundEmail) {
            return responses.buildFailureResponse("Company email already registered", 400)   
        }
        const foundregNo = await Company.findOne({regNo: payload.regNo});
        if (foundregNo) {
            return responses.buildFailureResponse ("Registration number already exists", 400)
        }

        // now that we have validated our data, lets create a new company
        const newCompany = await Company.create(payload)
        return responses.buildSuccessResponse("Company created successfully", 201, newCompany);
};

async function createAdmin (payload) {

    const foundEmailOrPhone = await Staff.findOne ({$or: [
        {email: payload.email},
        {phone: payload.phone}
    ]})
    if (foundEmailOrPhone) {
        return responses.buildFailureResponse("Staff phone or email already registered", 400)
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

    const foundEmailOrPhone = await Staff.findOne ({$or: [
        {email: payload.email},
        {phone: payload.phone}
    ]})
    if (foundEmailOrPhone) {
    return responses.buildFailureResponse("Staff phone or email already registered", 400)
    } 
    // to hash a password
    // const saltRounds = 10;
    // const generatedSalt = await bcrypt.genSalt(saltRounds)
    // const hashedPassword = await bcrypt.hash(payload.password, generatedSalt)

    // payload.password = hashedPassword;
    payload.role = "user";
    const savedStaff = await Staff.create(payload)
    return responses.buildSuccessResponse("Staff account created successfully", 201, savedStaff);
};


const login = async (payload) => {
    try {
        const foundUser = await Staff.findOne({ email: payload.email}).lean()
        if(!foundUser) {
            return responses.buildFailureResponse("User not found", 404)
        }
        if (foundUser.role !== "admin") {
            return responses.buildFailureResponse("Only admins are allowed", 403)
        };
        
        const foundPassword = await bcrypt.compare(payload.password, foundUser.password)
        if(!foundPassword) {
            return responses.buildFailureResponse("Password Incorrect", 403)
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
    } catch (error) {
        return responses.buildFailureResponse("Unable to login",  500)
    }
};

const fetchCompanies = async () => {
    const foundStaff = await Company.find({});
    if (!foundStaff) {
        return responses.buildFailureResponse("Unable to find Staff", 400);
    };
    const allCompanies = foundStaff.length;
    return responses.buildSuccessResponse(`Companies found are ${allCompanies}`, 200, foundStaff);
};

const forgotPassword = async (payload) => {
    const emailFound = await Staff.findOne({ email: payload.email });
    if(!emailFound) {
        return responses.buildFailureResponse("Email not found", 400);
    }
    const resetPin = generateResetPin();
    const updatedUser = await Staff.findByIdAndUpdate(
        { _id: emailFound._id},
        {resetPin: resetPin},
        {new: true});
    // console.log({updatedUser})
    const forgotPasswordPayload = {
        to: updatedUser.email,
        subject: "RESET PASSWORD",
        pin: resetPin
    };
    await sendMail.sendForgotPasswordMail(forgotPasswordPayload);
    return responses.buildSuccessResponse("Forgot Password Updated Successfully", 200, updatedUser);
};

const resetPassword = async (payload) => {
    /**
     * Validate if the user exists with the reset pin
     * Hash the new password
     * Store the new hashed password
     */

    const foundUserAndPin = await Staff.findOne({
        email: payload.email,
        resetPin: payload.resetPin
    });
    if (!foundUserAndPin) {
        return responses.buildFailureResponse("Reset Pin Invalid", 400);
    }
    // hashing the password
    const saltRounds = 10;
    const generatedSalt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(payload.password, generatedSalt);
    const updatedUser = await Staff.findByIdAndUpdate(
        {_id: foundUserAndPin._id},
        {password: hashedPassword},
        {resetPin: null},
        {new: true}
    );
    return responses.buildSuccessResponse("Password reset successfully", 201, updatedUser);
};

// const searchStaff = async (payload) =>{ 
//     const staffName = await Staff.findOne({firstName: payload.firstName})
//     if(!staffName){
//         return responses.buildSuccessResponse("The staff you are looking for is ", 200, staffName);
//     }
//     // const foundStaff = await Staff.findOne 
// };
// to implement search endpoint
const findStaff = async (query) => {
    try {
        const searchKeyword = query.search
        ? {
            $or: [
                { firstName: {$regex: query.search, $options: "i"} },
                { lastName: {$regex: query.search, $options: "i"} },
                { email: {$regex: query.search, $options: "i"} },
                { phone: {$regex: query.search, $options: "i"} },
            ],
            company: query.company,
        } : {};
        // const foundStaff = await Staff.find({...searchKeyword, Company: query.Company})
        const foundStaff = await Staff.find(searchKeyword)
        return responses.buildSuccessResponse("Staff found", 200, foundStaff);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createCompany,
    createStaff,
    createAdmin,
    login,
    fetchCompanies,
    forgotPassword,
    resetPassword, 
    findStaff
};