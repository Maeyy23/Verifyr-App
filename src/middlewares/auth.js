const jwt = require ("jsonwebtoken");

async function authenticate(req, res, next) {
    try {
        const authorization = req.headers.authorization
        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(400).json({
                message: "Authorization header must start with 'Bearer'",
            status: "failure"
        })
        }
        const token = authorization.substring(7)
        console.log({token})
        const decodedUser = await jwt.decode(token)
        console.log({decodedUser})
        const foundStaff = await staff.findone ({_id: decodedUser._id})
        console.log({foundStaff});
        if (foundStaff.role !== "admin") {
            return res.status (400).json ({
                message: "Only admins are allowed",
                status: "failure"
            })
        }
        next()
    } catch (error) {
        return res.status(error?.statusCode).send(error?.message)
    }
}

module.exports = {
    authenticate
};