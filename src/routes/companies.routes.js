const express = require('express');
const router = express.Router()
const companyController = require('../controllers/companies.controller');
const authMiddleware = require("../middlewares/auth");

// I defined the routes and associated them with controller functions here

router.post('/create-account', companyController.createAccount);
router.post('/create-admin', companyController.createAdmin);
router.post('/create-staff', companyController.createStaff);
router.post('/login', companyController.login);
router.get('/allCompanies', companyController.getCompaniesControllers);
router.post('/forgot-password', companyController.forgotPasswordControllers);
router.post('/reset-password', companyController.resetPasswordControllers);
router.get('/staff', companyController.findStaffControllers)


module.exports = router;