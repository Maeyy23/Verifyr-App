const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendForgotPasswordMail = (mailPayload) => {
  const textMail = `<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        body{
            font-family: Arial, Helvetica, sans-serif;
            background-color: #f5f5f5;
        }
        .container{
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            background-color: bisque;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        }
        h1{
            color: #333356;
            font-size: 24px;
            margin-bottom: 20px;
        }
        .button{
            display: inline-block;
            padding: 10px 20px;
            background-color: cadetblue;
            color: #333356;
            text-decoration: solid;
            border-radius: 5px;
        }
    </style>
</head>
<body>
   <div class = "container">
        <h1>Reset Password</h1>
        <p>Your Password Reset pin is ${mailPayload.pin}</p>
        <a class = "button" href = "#">Reset Password</a>
   </div> 
</body>
</html>`;
  const msg = {
    to: mailPayload.to,
    from: "joshuatobiajagbe@gmail.com",
    subject: mailPayload.subject,
    html: textMail,
  };
  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
};
module.exports = {
  sendForgotPasswordMail,
};
