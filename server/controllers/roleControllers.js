const UserRole = require("../models/userRole");

// Role.....
// get all role
const getRoleRecord = async (req, res) => {
    const roles = await UserRole.find({});
    res.status(200).json(roles);
};

// create role
// create new record
const createRoleRecord = async (req, res) => {
    const { user_roll } = req.body;

    try {
        const role = await UserRole.create({
            user_roll,
        });
        res.status(200).json(role);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports = {
    getRoleRecord,
    createRoleRecord,
};
