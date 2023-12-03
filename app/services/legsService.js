const legsModel = require("../models/legsModel");

const legsService={};
legsService.createMultipleLegs=async(payload)=>{
    return await legsModel.insertMany(payload);
}

legsService.createLeg=async(payload)=>{
    return await legsModel(payload).save();
}

legsService.findOneAndUpdateLeg = async (criteria,update) => {
    return await legsModel.findOneAndUpdate(criteria, update);
}

legsService.findOneAndDeleteLeg = async (criteria) => {
    return await legsModel.findOneAndDelete(criteria);
}

module.exports=legsService;