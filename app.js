const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");

app.set("view engine","jade")
app.use(express.static(path.join(__dirname, "/assets")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render('index');
});
app.get('/cv', function (req, res) {
    res.sendFile(__dirname + "/Hassam-Resume.pdf");
});
app.post("/send_email",function(req,res,next){
    sendEmail(req.body);
    res.redirect("/");
});

var server = app.listen(3100, function () {
    console.log('http://localhost:3100/');
});

async function sendEmail(emailInfo) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let info = await transporter.sendMail({
    from: emailInfo.email,
    to: "minahilh21@gmail.com",
    subject: emailInfo.subject,
    text: emailInfo.message,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
