const express = require("express");
const paymentController = require("../controllers/payment.controllers.js");
const authMiddleware = require("../middlewares/auth.js");

const router = express.Router();

router.post(
  "/payment",
  authMiddleware.authenticate,
  paymentController.initializePaymentController
);
router.post("/webhook", paymentController.paystackWebhookController);

module.exports = router;
