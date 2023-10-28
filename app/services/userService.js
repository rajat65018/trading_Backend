const userModel=require('../models/userModel');

const userServices={};

userServices.createUser = async(payload) => {
    return userModel(payload).save();
}

userServices.findOneUser = async(criteria, projection) => {
    return await userModel.findOne(criteria, projection).lean();
}

userServices.findOneAndUpdateUser = async(criteria,projectionQuery) => {
    return await userModel.findOneAndUpdate(criteria,projectionQuery);
}

userServices.findOneAndDeleteUser = async(criteria) => {
    return await userModel.findOneAndDelete(criteria);
}

module.exports=userServices;