const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;