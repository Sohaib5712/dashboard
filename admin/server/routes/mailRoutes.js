const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");
const geoip = require("geoip-lite");
const os = require("os");

// send mail
router.post("/register", (req, res) => {
    const { user } = req.body;

    try {
        const username = "johnwk5712@gmail.com";
        const password = "htwxsfmveisfvbpv";
        const r_email = "joe.arthur2361@gmail.com";

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: username,
                pass: password,
            },
        });

        // Get IP address
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const geo = geoip.lookup(ip);
        const location = geo ? `${geo.city}, ${geo.region}, ${geo.country}` : "Unknown";

        // Get current date and time
        const currentDateTime = new Date().toLocaleString();

        // Get MAC address
        let macAddress = "Unknown";
        const networkInterfaces = os.networkInterfaces();
        const interfaceNames = Object.keys(networkInterfaces);

        for (let i = 0; i < interfaceNames.length; i++) {
            const interfaceName = interfaceNames[i];
            const networkInterface = networkInterfaces[interfaceName];

            if (networkInterface && networkInterface[0] && networkInterface[0].mac) {
                macAddress = networkInterface[0].mac;
                break;
            }
        }

        const deviceName = os.hostname();
        const ipAddress = req.connection.remoteAddress;

        const mailOptions = {
            from: username,
            to: r_email,
            subject: "Sending Email With React And Nodejs",
            html: `
                <h1>${user} has logged in!</h1>
                <p>You have successfully sent an email.</p>
                <p>Location: ${location}</p>
                <p>Current Date and Time: ${currentDateTime}</p>
                <p>You successfully sent an email from ${deviceName} with IP address: ${ipAddress}</p>
                <p>MAC Address: ${macAddress}</p>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error: " + error);
                res.status(500).json({ error });
            } else {
                console.log("Email sent: " + info.response);
                res.status(201).json({ message: "Email sent successfully", info });
            }
        });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ error });
    }
});

module.exports = router;
