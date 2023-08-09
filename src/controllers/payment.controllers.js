const paymentServices = require("../services/payment.services.js");

const initializePaymentController = async (req, res) => {
  try {
    const data = await paymentServices.initializePayment(req.user);
    console.log(data);
    res.status(data.statusCode).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failure",
      message: "Unable to make payment",
    });
  }
};

const paystackWebhookController = async (req, res) => {
  try {
    const data = await paymentServices.paystackWebhook(req.body);
    res.status(data.statusCode).json(data);
  } catch (error) {
    console.log({ error });
  }
};

module.exports = { initializePaymentController, paystackWebhookController };
