const User = require("../models/userSchema");

const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({ _id }, "sjvbsjdhbjavabvhaddabdfjaj", { expiresIn: "2d" });
};

// user.....

// login.....
const loginUser = async (req, res) => {
    const { user, password } = req.body;

    try {
        const acc = await User.login(user, password);

        // Create token
        const token = createToken(acc._id);

        // Set the acc._id value in the response object
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// sign up.....
const signupUser = async (req, res) => {
    const { user, password, role } = req.body;

    try {
        const acc = await User.signup(user, password, role);

        res.status(200).json({ user, acc });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get all user record
const getUserRecords = async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
};

// get single record
const getUserRecord = async (req, res) => {
    const { id } = req.params;
    const users = await User.findOne({ user: id });
    if (!users) {
        return res.status(400).json({ error: "no Record Found!!!" });
    }

    res.status(200).json({ users });
};


// send maill
const sendMail = async  (req, res) => {

    // const { email } = req.body;
    console.log("okkkk")


    // try {

    //     const transporter = nodemailer.createTransport({
    //         service: "gmail",
    //         auth: {
    //             user: 'joe.arthur2361@gmail.com',
    //             pass: '!Wasd@6996#'
    //         }
    //     });

    //     const mailOptions = {
    //         from: 'joe.arthur2361@gmail.com',
    //         to: email,
    //         subject: "Sending Email With React And Nodejs",
    //         html: '<h1>Congratulation</h1> <h1> You successfully sent Email </h2>'
    //     };

    //     transporter.sendMail(mailOptions, (error, info) => {
    //         if (error) {
    //             console.log("Error" + error)
    //         } else {
    //             console.log("Email sent:" + info.response);
    //             res.status(201).json({status:201,info})
    //         }
    //     })

    // } catch (error) {
    //     console.log("Error" + error);
    //     res.status(401).json({status:401,error})
    // }
};


module.exports = {
    loginUser,
    signupUser,
    getUserRecords,
    getUserRecord,
    sendMail
};
