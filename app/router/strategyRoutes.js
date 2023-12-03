const express=require('express');
const validateJoiSchema = require('../middleware/validateJoiSchema');
const joiSchema = require('../joiSchemas/joiSchema');
const userAuthentication = require('../middleware/auth');
const strategyController = require('../controller/strategyController');

const strategyRoutes=express.Router();

strategyRoutes.post('/v2/strategy/create',validateJoiSchema(joiSchema.createStrategy),userAuthentication,strategyController.createStrategy);

strategyRoutes.post('/v2/strategy',validateJoiSchema(joiSchema.getStrategy),userAuthentication,strategyController.getStrategy);

strategyRoutes.put('/v2/strategy/udpateStrategy', validateJoiSchema(joiSchema.udpateStrategy),userAuthentication,strategyController.updateStrategy);

strategyRoutes.delete('/v2/strategy/delete/deleteStrategy',validateJoiSchema(),userAuthentication,strategyController.deleteStrategy);

// strategyRoutes.post('/v2/strategy/addleg',validateJoiSchema(joiSchema.addLegSchema),userAuthentication,strategyController.addLeg);

// strategyRoutes.put('/v2/strategy/updateLeg', validateJoiSchema(joiSchema.addLegSchema), userAuthentication, strategyController.addLeg);

// strategyRoutes.delete('/v2/strategy/deleteStrategy',validateJoiSchema())

module.exports= strategyRoutes;