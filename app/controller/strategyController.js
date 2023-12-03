const mongoose = require('mongoose');

const { createSuccessResponse, createErrorResponse } = require("../helpers/resHelper");
const legsService = require("../services/legsService");
const strategyServices = require("../services/strategyServices");
const userServices = require("../services/userService");
const CONSTANTS = require("../utils/constants");
const MESSAGES = require("../utils/messages");

const strategyController = {};

strategyController.createStrategy = async (req, res) => {
    try {

        const userId = req.user._id;
        const payload = req.body;
        const strategyData = payload;
        const legsData = strategyData.legs;

        const legsCreated = await legsService.createMultipleLegs(legsData);

        strategyData.legs = legsCreated;
        strategyData.sid = new mongoose.Types.objectId();
        const createStrategy = await strategyServices.createStrategy(strategyData);

        await userServices.findOneAndUpdateUser({ _id: userId, isVerified: true }, {
            $push: {
                strategyId: createStrategy._id
            }
        });

        res.status(200).json({ message: MESSAGES.STRATEGY_CREATED });

    } catch (error) {
        console.log(error, 'error');
        res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

strategyController.getStrategy = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await userServices.findOneUserWithStrategy({ _id: userId, isVerified: true }, { password: 0, isVerified: 0 })
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(createErrorResponse(MESSAGE.INTERNAL_SERVER_ERROR, CONSTANTS.ERROR_TYPES.INTERNAL_SERVER_ERROR));
    }
}

strategyController.updateStrategy = async (req, res) => {
    try {
        const payload = req.body;
        const strategyId = payload.strategyId;
        let legs = payload.legs;

        await Promise.all(legs.map(async (leg, index) => {
            let legData;

            if (leg._id) {
                legData = await legsService.findOneAndUpdateLeg({ _id: leg._id }, {
                    $set: payload
                });
            } else {
                legData = await legsService.createLeg(leg);
            }
            legs[index] = legData._id;
        }));

        payload.legs = legs;

        await strategyServices.findOneAndUpdateStrategy({ _id: strategyId }, {
            $set: payload
        });

        res.status(200).json(createSuccessResponse(MESSAGES.STRATEGY_UPDATED));
        
    } catch (error) {
        res.status(500).json(createErrorResponse(MESSAGES.INTERNAL_SERVER_ERROR, CONSTANTS.ERROR_TYPES.INTERNAL_SERVER_ERROR));
    }
}

strategyController.deleteStrategy = async (req, res) => {
    try {
        const strategyId = req.body.strategyId
        const userId = req.user._id;
        const strategyData = await strategyServices.findOneAndDeleteStrategy({ _id: strategyId });
        await userServices.findOneAndUpdateUser({ _id: userId, isVerified: true }, {
            $pull: {
                strategyId: strategyId
            }
        });
        await legsService.findOneAndDeleteLeg({ _id: { $in: strategyData } });
        res.status(200).json(createSuccessResponse(MESSAGES.STRATEGY_DELETED));
    } catch (error) {
        res.status(500).json(createSuccessResponse(MESSAGES.INTERNAL_SERVER_ERROR, CONSTANTS.ERROR_TYPES.INTERNAL_SERVER_ERROR));
    }
}

strategyController.addLeg = async (req, res) => {
    try {
        const payload = req.body;
        const strategyId = payload.strategyId;
        delete payload.strategyId;
        const legsData = await legsService.createLeg(payload);
        await strategyServices.findOneAndUpdateStrategy({ _id: strategyId }, {
            $push: {
                legs: legsData._id
            }
        });
        res.status(200).json({ message: MESSAGES.LEG_CREATED });
    }
    catch (error) {
        console.log(error, 'errorkskksk');
        res.status(500).json(createSuccessResponse(MESSAGES.INTERNAL_SERVER_ERROR, CONSTANTS.ERROR_TYPES.INTERNAL_SERVER_ERROR));
    }
}

strategyController.deleteLeg = async (req, res) => {
    try { } catch (error) {
        res.status(500).json(createSuccessResponse(MESSAGES.INTERNAL_SERVER_ERROR, CONSTANTS.ERROR_TYPES.INTERNAL_SERVER_ERROR));
    }
}

strategyController.updateLeg = async (req, res) => {
    try { } catch (error) {
        res.status(500).json(createSuccessResponse(MESSAGES.INTERNAL_SERVER_ERROR, CONSTANTS.ERROR_TYPES.INTERNAL_SERVER_ERROR));
    }
}


module.exports = strategyController;