/* The code you provided is a JavaScript code snippet that sets up a route for sending an email using
the Nodemailer library in an Express.js application. */
const express = require('express');
const router = new express.Router();
const nodemailer = require('nodemailer');

// Send mail
router.post('/register', async (req, res) => {
    const { user, ipAddress, currentTime, location } = req.body;

    try {
        const username = "johnwk5712@gmail.com";
        const password = "htwxsfmveisfvbpv";
        const recipientEmail = "joe.arthur2361@gmail.com";

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: username,
                pass: password,
            },
        });

        const mailOptions = {
            from: username,
            to: recipientEmail,
            subject: 'User Login Details',
            html: `
                <h1>${user} has logged in!</h1>
                <p>Current Date and Time: ${currentTime}</p>
                <p>IP Address: ${ipAddress}</p>
                <p>Location: ${location}</p>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                res.status(500).json({ error: 'Failed to send email' });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({ message: 'Email sent successfully' });
            }
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

module.exports = router;
