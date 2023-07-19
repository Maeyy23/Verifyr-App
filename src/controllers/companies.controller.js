const companyServices = require("../services/companies.services")

// Create account controller
const createAccount = async (req, res) => {
  const data = await companyServices.createCompany(req.body)
  res.status(data.statusCode).json(data)
};
// Create admin controller
const createAdmin = async (req, res) => {
  const data = await companyServices.createAdmin(req.body)
  res.status(data.statusCode).json(data)
};
//createStaff controller
const createStaff = async (req, res) => {
  const data = await companyServices.createStaff(req.body)
  res.status(data.statusCode).json(data)
};
// login controller
const login = async (req, res) => {
  const data = await companyServices.login(req.body)
  res.status(data.statusCode).json(data)
};
// get companies controllers
const getCompaniesControllers = async (req, res) => {
  const data = await companyServices.fetchCompanies()
  res.status(data.statusCode).json(data)
};
// forgot password controller
const forgotPasswordControllers = async (req, res) => {
  const data = await companyServices.forgotPassword(req.body)
  res.status(data.statusCode).json(data)
};
// reset password controller
const resetPasswordControllers = async (req, res) => {
  const data = await companyServices.resetPassword(req.body)
  res.status(data.statusCode).json(data)
};


module.exports = {
  createAccount,
  createAdmin,
  login,
  createStaff,
  getCompaniesControllers,
  forgotPasswordControllers,
  resetPasswordControllers
};