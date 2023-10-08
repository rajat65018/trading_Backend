const sessionModel = require("../models/sessionModel");

const sessionService={};

sessionService.createSession=async(session)=>{
    return await sessionModel(session).save();
}

sessionService.findOneSession=async(searchQuery,projectionQuery)=> {
    return await sessionModel.findOne(searchQuery,projectionQuery);
}

sessionService.findOneAndDeleteSession=async(searchQuery)=> {
    return await sessionModel.findOneAndDelete(searchQuery);
}

module.exports=sessionService