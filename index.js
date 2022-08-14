
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(cors());
app.listen(port, () => {
  console.log('We are live on port ' , port);
});
app.get('/', (req, res) => {
  res.send('Welcome to my api');
})

app.post('/api/v1/contact', (req, res) => {
  console.log(req.body);
  var data = req.body;
  var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
      user: 'bandara00007@gmail.com',
      pass: 'jqeyoxaidxhfmaun'
    }
  });

  const createAttachment = (imgArr) => {
    let newAttachments = []
    for(const img of imgArr) {
      const image = {
        filename: img.filename,
        contentType: 'image/jpeg',
        content: new Buffer.from(img.content.split("base64,")[1], "base64")
      }
      newAttachments.push(image);
    }
    console.log(newAttachments);
    return newAttachments;
  }
  var mailOptions = {
    from: 'bandara00007@gmail.com',
    replyto: data.email,
    to: data.email,
    subject: data.title,
    html: `<p>${data.email}</p>
          <p>${data.message}</p>`,
    // attachments: [
    //   {
    //     filename: data.images[0].filename,
    //     contentType: 'image/jpeg',
    //     content: new Buffer.from(data.images[0].content.split("base64,")[1], "base64"),
    //     //content: new Buffer.from(req.body.image.split("base64,")[1], "base64"),
    //   }
    // ]
    attachments: createAttachment(data.images)
  };
  
  smtpTransport.sendMail(mailOptions,
    (error, response) => {
      if (error) {
        res.status(400).send(error)
      } else {
        res.send('Success')
      }
      smtpTransport.close();
    });
})





























// var nodemailer = require("nodemailer");

// var sender = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'bandara00007@gmail.com',
//     pass: 'jqeyoxaidxhfmaun'
//   }
// });

// var mail = {
//   from: "bandara00007@gmail.com",
//   to: "bandara00007@gmail.com",
//   subject: "Sending Email using Node.js",
//   text: "That was easy!",
//   attachments: [{   // file on disk as an attachment
//     filename: 'test.jpg',
//     path: './attachments/test.jpg' // stream this file
//   }]
// };

// sender.sendMail(mail, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent successfully: "
//       + info.response);
//   }
// });