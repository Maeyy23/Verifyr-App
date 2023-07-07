const mongoose = require('mongoose');

const staffSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastNamme: {
        type: String,
        required: true
    },
    phone:  {
        type: String,
        required: true
    },
    email:  {
        type: String,
        required: true
    },
    employeeId:  {
        type: String,
        required: true
    },
    companyRole:  {
        type: String,
        required: true
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },
    dateofBirth:  {
        type: Date,
        required: true
    },
    company:  {
        type: mongoose.Types.ObjectId,
        ref: "Company",
        required: true
    }
    // createdAt:  {
    //     type: Date,
    //     required: true,
    // }, this is changed to a mongodb function that has a timestamp

    
}, {
    timestamps: true
});


module.exports = mongoose.model("Staff", staffSchema);

// const staffSchema = {
//   firstName: "string",
//   lastNamme: "string",
//   phone: "string",
//   email: "string",
//   employeeId: "string",
//   companyRole: "string",
//   dateofBirth: "date",
//   company: "string",
//   createdAt: "date",
// };
