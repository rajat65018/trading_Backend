const mongoose = require('mongoose');

const legSchema = new mongoose.Schema({
    leg_id: { type: Number, required:  false },
    sid: { type: Number, required:  false },
    momentum_trade_by: { type: String, required:  false },
    momentum_value: { type: Number, required:  false },
    range_breakout: { type: String, requried:  false },
    breakout_starttime: { type: String, required:  false },
    breakout_endtime: { type: String, required:  false },
    breakout_side: { type: String, required:  false },
    expiry: { type: String, required:  false },
    lots: { type: String, required:  false },
    position: { type: String, requried:  false },
    inst_type: { type: String, required:  false },
    strike_type: { type: String, required:  false },
    strike: { type: String, required:  false },
    range_min: { type: Number, required:  false },
    range_max: { type: Number, required:  false },
    premium: { type: Number, required:  false },
    strike_percent: { type: Number, required:  false },
    target_profit: { type: String, required:  false },
    target_profit_value: { type: Number, required:  false },
    reentry_target: { type: String, required:  false },
    reentry_target_times: { type: Number, required:  false },
    stoploss: { type: String, required:  false },
    stoploss_value: { type: Number, required:  false },
    reentry_stoploss: { type: String, required:  false },
    reentry_stoploss_times: { type: Number, requried:  false },
    trail_stoploss: { type: String, required:  false },
    move_to_profit: { type: Number, required:  false },
    move_stoploss: { type: Number, required:  false },
    status: { type: String, required:  false },
    timestamp: { type: String, required:  false },
    remarks: { type: String, required:  false }
});

const legsModel = mongoose.model('leg', legSchema);

module.exports = legsModel;
