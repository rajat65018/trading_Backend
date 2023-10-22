const userModel=require('../models/userModel');

const userServices={};

userServices.createUser=async(payload)=> {
    return userModel(payload).save();
}

userServices.findOneUser=async(searchQuery)=> {
    return await userModel.findOne(searchQuery);
}

userServices.findOneAndUpdateUser=async(searchQuery,projectionQuery)=> {
    return await userModel.findOneAndUpdate(searchQuery,projectionQuery);
}

userServices.findOneAndDeleteUser=async(searchQuery)=> {
    return await userModel.findOneAndDelete(searchQuery);
}

module.exports=userServices;