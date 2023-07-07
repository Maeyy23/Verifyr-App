const users = require("../Dummies/users");
const userServices = require("../services/users.services");

function loginController(req, res) {
  const response = userServices.loginService(req.body); //mabel please take note return
  res.status(response.statusCode).json(response);
}


function registerController(req, res) {
  console.log(req.body);
  res.status(200).json({ message: "Login successful" });
}

function getUsers(req, res) {
  console.log(req.body);
  res.status(200).json(users);
}

module.exports = {
  loginController,
  registerController,
  getUsers,
};
