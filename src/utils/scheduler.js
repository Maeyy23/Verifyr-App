const nodeCron = require("node-cron");

const job = nodeCron.schedule("* * * * *", () => {
  console.log("I am a Cron-Job on assignment");
});

module.exports = job;
