const bcrypt = require("bcrypt");
const Staff = require("../models/staff.model");

const seedAdmin = async () => {
  const foundAdmin = await Staff.find({
    role: "admin",
  });
  if (foundAdmin.length < 1) {
    const saltRounds = 10;
    const generatedSalt = await bcrypt.genSalt(saltRounds);
    const data = {
      firstName: "Abu",
      lastName: "Abass",
      phone: "08011225667",
      email: "abuabass@gmail.com",
      employeeId: "1",
      companyRole: "Staff Manager",
      role: "Admin",
      dateOfBirth: "06/06/1986",
      company: "Verifyr",
      password: await bcrypt.hash("password", generatedSalt),
    };

    const createdAdmin = await Staff.create(data);
    if (!createdAdmin) {
      console.log("Unable to send data");
      return;
    }
    console.log("Admin Seeding Successful");
    return;
  }
  return;
};

module.exports = seedAdmin;
