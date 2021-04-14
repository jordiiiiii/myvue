const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: "borsatreballjordi@gmail.com",
    pass: "borsatreballjordi123456",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

let message = {
  from: "sender@server.com",
  to: "a18jorgornei@inspedralbes.cat",
  subject: "Message title",
  text: "Plaintext version of the message",
  html: "<p>HTML version of the message</p>",
};

// exports.sendemail = (email, text) =>
//   transporter.sendMail({
//     from: email,
//     to: "a18jorgornei@inspedralbes.cat",
//     subject: "Registar-me en la vostra oferta",
//     text: text,
//   });

exports.sendemail = transporter.sendMail(message, function (err, info) {
  if (err) {
    console.log(err);
  } else {
    console.log(info);
  }
});
