const strategyModel = require("../models/strategyModel");

const strategyServices = {};

strategyServices.createStrategy = async (payload) => {
    return await strategyModel(payload).save();
}

strategyServices.findOneStrategy = async (criteria, projection) => {
    return await strategyModel.findOne(criteria, projection);
}

strategyServices.findOneAndDeleteStrategy = async (criteria) => {
    return await strategyModel.findOneAndDelete(criteria);
}

strategyServices.findOneAndUpdateStrategy = async (criteria, updateQuery) => {
    return await strategyModel.findOneAndUpdate(criteria, updateQuery);
}

module.exports = strategyServices;