const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    college: String,
    branch: String,
    specialization: String,
    batch: String,
    updatedAt: Date,
    createdAt: Date
});


const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
