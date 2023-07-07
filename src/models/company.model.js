const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true,
    unique: true
  },
  regNo: {
    type: String,
    required: true,
    unique: true
  },
  contactEmail:{
    type: String,
    required: true,
    unique: true
  },
  website: {
    type: String,
    required: true,
    unique: true
  },
  contactPhone: {
    type: String,
    required: true,
    unique: true
  },
  logo: {
    type: String,
    required: true,
    unique: true
  },
  contactPhone: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  }
})

module.exports = mongoose.model("Company", companySchema)





// const companySchema = {
//   name: "string", //required
//   address: "string",
//   cacNo: "string",
//   contactEmail: "string",
//   website: "string",
//   contactPhone: "string",
//   logo: "string",
// };
