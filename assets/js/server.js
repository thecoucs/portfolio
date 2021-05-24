let express = require("express"),
  path = require("path"),
  nodeMailer = require("nodemailer"),
  bodyParser = require("body-parser");

let app = express();

app.use(express.static("../portfolio"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/send-email", function (req, res) {
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // should be replaced with real sender's account
      user: "thethecoucs@gmail.com",
      pass: "u2vscoldplay",
    },
  });
  let mailOptions = {
    // should be replaced with real recipient's account
    to: "carlos-andres-q@hotmail.com",
    subject: req.body.subject,
    text: req.body.email + " " + req.body.message,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
  });
  res.writeHead(301, { Location: "../../index.html" });
  res.end();
});

let server = app.listen(80, function () {
  let port = server.address().port;
  console.log("Server started at http://localhost:%s", port);
});
