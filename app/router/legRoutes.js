const express = require('express');
const strategyController = require('../controller/strategyController');
const userAuthentication = require('../middleware/auth');
const validateJoiSchema = require('../middleware/validateJoiSchema');
const joiSchema = require('../joiSchemas/joiSchema');

const legRoute = express.Router();

legRoute.post('/v2/leg/addleg', validateJoiSchema(joiSchema.addLegSchema), userAuthentication, strategyController.addLeg);

legRoute.put('/v2/leg/updateLeg', validateJoiSchema(joiSchema.addLegSchema), userAuthentication, strategyController.addLeg);

legRoute.delete('/v2/leg/deleteStrategy', validateJoiSchema(), userAuthentication,);

module.exports = legRoute;