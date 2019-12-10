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
      console.log(error);
      res.json({mailSent: false})
    } else {
      res.json({mailSent: true})
    }
  });

});

app.listen(PORT, console.log(`app listening in port ${PORT}`))
