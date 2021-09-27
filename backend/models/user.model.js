const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    userType: {
        type: String,
        default: "User",
        enum: ["User", "Staff"]
    },
    isStaff: Boolean
});

module.exports = mongoose.model("User", userSchema);