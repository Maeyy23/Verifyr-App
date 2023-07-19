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
  },
  regNo: {
    type: String,
    required: true,
    unique: true
  },
  contactEmail:{
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
    unique: true
  },
  contactPhone: {
    type: String,
    required: true
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

module.exports = mongoose.model("Company", companySchema);