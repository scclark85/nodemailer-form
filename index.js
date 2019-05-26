const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/api/form', (req, res) => {
    
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail= `
        <h3> Contact Details</h3>
        <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
        `

        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",  //will be different for google
            port: 587, //will be different for google
            auth: {
                // recommend making these secrets
                user: 'email',
                pass: 'password'
            }
        })

        let mailOptions = {
            from: 'test@testaccount.com',
            to: 'email',
            replyTo: 'test@testaccount.com',
            subject: 'New Message',
            text: req.body.message,
            html: htmlEmail
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err)
            }
            console.log("Message Sent: %s", info.message)
            console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))
        })
      });
})

const PORT = process.env.PORT || 3001

app.listen(PORT, function () {
    console.log(`App listening on PORT ${PORT}`);
});
