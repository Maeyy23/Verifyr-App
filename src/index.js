const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

const company = require("./routes/companies.routes");
const payment = require("./routes/payment.routes.js");
const connectDB = require("./configs/database");
const job = require("./utils/scheduler.js");
const seedAdmin = require("./seeding/seeding.js");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(express.json());
app.use(morgan("combined"));
app.use("/companies", company);
app.use("/transaction", payment);

// connecting to the database
connectDB(process.env.MONGO_URI);
job.start();
seedAdmin();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "I am running",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running with speed at port ${PORT}`);
});
