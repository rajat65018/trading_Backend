const Joi = require('joi');

const joiSchema = {};

joiSchema.resetPassword = {
    body: {
        newPassword: Joi.string().min(8).max(20)
    }
}

joiSchema.changePasswordSchema = {
    body: {
        oldPassword: Joi.string().min(8).max(20).required(),
        newPassword: Joi.string().min(8).max(20).required()
    },
    headers: {
        authorization: Joi.string().required()
    }
};

joiSchema.passwordForgotSchema = {
    body: {
        email: Joi.string().email().required()
    }
};

joiSchema.checkUserExistSchema = {
    query: {
        mobile: Joi.string().required(),
        email: Joi.string().email().required()
    }
};

joiSchema.deleteUserSchema = {
    headers: { authorization: Joi.string().required() }
};

joiSchema.loginSchema = {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
};

joiSchema.sendOtpSchema = {
    body: {
        email: Joi.string().email().required()
    },
    headers: {
        authorization: Joi.string().required()
    }
};

joiSchema.signupSchema = {
    body: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        mobile: Joi.string().required(),
        // dob: Joi.date().required(),
        // addressLine1: Joi.string().required(),
        // country: Joi.string().required(),
        // state: Joi.string().required(),
        // city: Joi.string().required(),
        // postalCode: Joi.number().required(),
        password: Joi.string().min(8).max(20).required()
    }
};

joiSchema.updateUserSchema = {
    body: {
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        mobile: Joi.string().optional(),
        dob: Joi.date().optional(),
        addressLine1: Joi.string().optional(),
        county: Joi.string().required(),
        state: Joi.string().optional(),
        city: Joi.string().optional(),
        postalCode: Joi.number().optional()
    },
    headers: {
        authorization: Joi.string().required()
    }
};

joiSchema.getUserSchema = {
    headers: {
        authorization: Joi.string().required()
    }
};

joiSchema.verifyOtpSchema = {
    body: {
        email: Joi.string().email().required(),
        otp: Joi.number().required(),
    }
};

const legSchema = Joi.object({
    leg_id: Joi.number(),
    sid: Joi.number(),
    momentum_trade_by: Joi.string(),
    momentum_value: Joi.number(),
    range_breakout: Joi.string(),
    breakout_starttime: Joi.string(),
    breakout_endtime: Joi.string(),
    breakout_side: Joi.string(),
    expiry: Joi.string(),
    lots: Joi.string(),
    position: Joi.string(),
    inst_type: Joi.string(),
    strike_type: Joi.string(),
    strike: Joi.string(),
    range_min: Joi.number(),
    range_max: Joi.number(),
    premium: Joi.number(),
    strike_percent: Joi.number(),
    target_profit: Joi.string(),
    target_profit_value: Joi.number(),
    reentry_target: Joi.string(),
    reentry_target_times: Joi.number(),
    stoploss: Joi.string(),
    stoploss_value: Joi.number(),
    reentry_stoploss: Joi.string(),
    reentry_stoploss_times: Joi.number(),
    trail_stoploss: Joi.string(),
    move_to_profit: Joi.number(),
    move_stoploss: Joi.number(),
    status: Joi.string(),
    timestamp: Joi.string(),
    remarks: Joi.string(),
});

joiSchema.createStrategy = {
    body: {
        // sid: Joi.number(),
        index_type: Joi.string(),
        segment: Joi.string(),
        trade_type: Joi.string(),
        exit_position: Joi.string(),
        move_sl_to_cost: Joi.boolean(),
        startTime: Joi.string(),
        exitTime: Joi.string(),
        broker_id: Joi.number(),
        mtm_target_type: Joi.string(),
        mtm_target_value: Joi.string(),
        reentry_mtm_target: Joi.number(),
        lock_profit: Joi.number(),
        trail_profit: Joi.number(),
        profit_move_x: Joi.number(),
        trail_profit_y: Joi.number(),
        entry_order_type: Joi.string(),
        limit_order_buffer: Joi.number(),
        sl_by_broker_or_sys: Joi.string(),
        reentry_on: Joi.string(),
        candle_interval: Joi.number(),
        reentry_after: Joi.string(),
        reentry_befor: Joi.string(),
        remarks: Joi.string(),
        timestamp: Joi.string(),
        match_premium: Joi.string(),
        match_premium_value: Joi.number(),
        legs: Joi.array().items(legSchema),
    },
    headers: {
        authorization: Joi.string().required()
    }
}

const addLegSchema = Joi.object({
        _id: Joi.string().optional(),
        leg_id: Joi.number(),
        sid: Joi.number(),
        momentum_trade_by: Joi.string(),
        momentum_value: Joi.number(),
        range_breakout: Joi.string(),
        breakout_starttime: Joi.string(),
        breakout_endtime: Joi.string(),
        breakout_side: Joi.string(),
        expiry: Joi.string(),
        lots: Joi.string(),
        position: Joi.string(),
        inst_type: Joi.string(),
        strike_type: Joi.string(),
        strike: Joi.string(),
        range_min: Joi.number(),
        range_max: Joi.number(),
        premium: Joi.number(),
        strike_percent: Joi.number(),
        target_profit: Joi.string(),
        target_profit_value: Joi.number(),
        reentry_target: Joi.string(),
        reentry_target_times: Joi.number(),
        stoploss: Joi.string(),
        stoploss_value: Joi.number(),
        reentry_stoploss: Joi.string(),
        reentry_stoploss_times: Joi.number(),
        trail_stoploss: Joi.string(),
        move_to_profit: Joi.number(),
        move_stoploss: Joi.number(),
        status: Joi.string(),
        timestamp: Joi.string(),
        remarks: Joi.string(),
});

joiSchema.udpateStrategy = {
    body: {
        strategyId: Joi.string(),
        index_type: Joi.string(),
        segment: Joi.string(),
        trade_type: Joi.string(),
        exit_position: Joi.string(),
        move_sl_to_cost: Joi.boolean(),
        startTime: Joi.string(),
        exitTime: Joi.string(),
        broker_id: Joi.number(),
        mtm_target_type: Joi.string(),
        mtm_target_value: Joi.string(),
        reentry_mtm_target: Joi.number(),
        lock_profit: Joi.number(),
        trail_profit: Joi.number(),
        profit_move_x: Joi.number(),
        trail_profit_y: Joi.number(),
        entry_order_type: Joi.string(),
        limit_order_buffer: Joi.number(),
        sl_by_broker_or_sys: Joi.string(),
        reentry_on: Joi.string(),
        candle_interval: Joi.number(),
        reentry_after: Joi.string(),
        reentry_befor: Joi.string(),
        remarks: Joi.string(),
        timestamp: Joi.string(),
        match_premium: Joi.string(),
        match_premium_value: Joi.number(),
        legs: Joi.array().items(addLegSchema),
    },
    headers: {
        authorization: Joi.string().required()
    }
}

joiSchema.getStrategy = {
    headers: {
        authorization: Joi.string().required()
    }
}

module.exports = joiSchema;