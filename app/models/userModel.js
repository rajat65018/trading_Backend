const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: Date },
    isVerified: { type: Boolean, default: false },
    state: { type: String },
    country: { type: String },
    addressLine1: { type: String },
    city: { type: String },
    postalCode: { type: Number },
    isDeleted: { type: Boolean }
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
