const staffServices = require("../services/staff.services")

async function createStaff (req, res) {
    try {
        const data = await staffServices.createAccount(req.body)
        res.status(data.statusCode).json(data)
    } catch(error){
        res.status(500).json({
            message: "Unable to create staff",
            status: "failure"
        })
    }
}

module.exports = {
    createStaff
}