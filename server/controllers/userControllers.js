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


// delete row
const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete({ _id: id });
    if (!user) {
        return res.status(400).json({ error: "no Record Found!!!" });
    }

    res.status(200).json({ user });
};

// update reg user
const updateUser = async (req, res) => {
    const { id } = req.params;

    const user = await User.findOneAndUpdate({ user: id }, req.body, {
        new: true,
    });

    if (!user) {
        return res.status(400).json({ error: "No record found!!!" });
    }

    res.status(200).json({ user });
};


module.exports = {
    loginUser,
    signupUser,
    getUserRecords,
    getUserRecord,
    updateUser,
    deleteUser
};
