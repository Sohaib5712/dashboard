const userRole = require("../models/userRole");
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

// get single record
const getRole = async (req, res) => {
    const { id } = req.params;
    const role = await userRole.findById({ _id: id });
    if (!role) {
        return res.status(400).json({ error: "no Record Found!!!" });
    }

    res.status(200).json({ role });
};

// delete row
const deleteRole = async (req, res) => {
    const { id } = req.params;
    const user = await userRole.findByIdAndDelete({ _id: id });
    if (!user) {
        return res.status(400).json({ error: "no Record Found!!!" });
    }

    res.status(200).json({ user });
};

// update reg role
const updateRole = async (req, res) => {
    const { id } = req.params;

    const user = await userRole.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
    });

    if (!user) {
        return res.status(400).json({ error: "No record found!!!" });
    }

    res.status(200).json({ user });
};

module.exports = {
    getRoleRecord,
    createRoleRecord,
    updateRole,
    deleteRole,
    getRole
};
