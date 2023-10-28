const sessionModel = require('../models/sessionModel');

const sessionService = {};

sessionService.createSession = async (session) => {
  return await sessionModel(session).save();
};

sessionService.findOneSession = async (criteria, projectionQuery) => {
  return await sessionModel.findOne(criteria, projectionQuery);
};

sessionService.findOneAndDeleteSession = async (criteria) => {
  return await sessionModel.findOneAndDelete(criteria);
};

sessionService.findOneAndUpdateSession = async (criteria, updateQuery, projection) => {
  return await sessionModel.findOneAndUpdate(criteria, updateQuery, projection);
};

module.exports = sessionService;
