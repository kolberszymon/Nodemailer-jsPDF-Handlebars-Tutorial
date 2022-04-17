require("dotenv").config();

const nodemailer = require("nodemailer");
const { createPDF } = require("./createPDF");
const fs = require("fs");
const handlebars = require("handlebars");
const path = require("path");

let emailClient = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

const createHTMLToSend = (path, replacements) => {
  let html = fs.readFileSync(path, {
    encoding: "utf-8",
  });
  let template = handlebars.compile(html);

  let htmlToSend = template(replacements);

  return htmlToSend;
};

const sendPDF = async () => {
  const emailPath = path.resolve("./email-templates", "ticket.html");

  const replacements = {
    name: "Szymon",
    channel: "Usual20somethingguy",
  };

  let htmlToSend = createHTMLToSend(emailPath, replacements);
  let pdfOutput = await createPDF();

  try {
    emailClient.sendMail({
      from: `"Test"<${email}>`, // sender address
      to: "receive@gmail.com", // list of receivers
      subject: "Test", // Subject line
      text: "Test", // plain text body
      html: htmlToSend,
      attachments: [{ path: pdfOutput }],
    });
  } catch (e) {
    console.log(e);
  }
};

sendPDF();
