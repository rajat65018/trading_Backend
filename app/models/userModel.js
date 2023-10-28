const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    isVerified: { type: Boolean, default: false },
    state: { type: String, required: true },
    country: { type: String, required: true },
    addressLine1: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: Number, required: true },
    isDeleted: { type: Boolean }
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
