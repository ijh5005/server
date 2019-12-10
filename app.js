const express = require("express");
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const emailHosts = require("./emailHosts");
const cors = require("cors");

// turn off the secure mailing option to use gmail
// https://myaccount.google.com/lesssecureapps

const PORT = process.env.PORT || 3000;

app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => {
  res.json({
    api: true,
    builtBy: "Blakio"
  })
})

app.get("/ip", (req, res) => {
  res.send(req.ip)
})

app.post("/mail", (req, res) => {

  const {params, host} = req.body;
  const {email, password, template} = emailHosts[host];

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password
    }
  });

  var mailOptions = {
    from: email,
    to: email,
    subject: template.subject,
    text: template.body(params)
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.json({
        mailSent: false,
        error
      })
    } else {
      res.json({mailSent: true})
    }
  });


  // The message you are receiving directs you to a help page where the solutions you need are suggested.
  //
  // In particular you are being asked specifically to sign in using your browser.
  //
  // However, if you follow these steps, then you should be good to go:
  // First sign into the Gmail account in a browser on the device where you are setting up your client app
  // Go here and enable access for "less secure" apps: https://www.google.com/settings/security/lesssecureapps
  // Then go here: https://accounts.google.com/b/0/DisplayUnlockCaptcha and click Continue.
  // Then straightaway go back to your client app and try again
  // However, if you use 2 step verification on your GMail account, don't forget that you will also need an application specific password for your client/device. See http://support.google.com/mail/bin/answer.py?hl=en&answer=1173270 for how to do that. (NOTE - if you do not already have 2 step verification active in Gmail, enabling it will NOT solve your broken connection.)
  //
  // If none of these suggestions solve the problem, make sure your client or device is not checking your account more often than once every 10-15 minutes. Over-frequent access will generate repeated requests for your password and could cause rejection of your log-in.
  //
  // See the reference
  // http://support.google.com/mail/answer/78754?hl=en

});

app.listen(PORT, console.log(`app listening in port ${PORT}`))
