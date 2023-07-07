const express = require('express');
const router = express.Router()
const companyController = require('../controllers/companies.controller');
const authMiddleware = require("../middlewares/auth");

// I defined the routes and associated them with controller functions here

router.post('/create-account', companyController.createAccount);
router.post('/create-admin', authMiddleware.authenticate, companyController.createAdmin);
router.post('/login', companyController.login);
// router.post('/login', companyController.login);

module.exports = router;