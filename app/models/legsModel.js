const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    leg_id: { type: Number, required: true },
    sid: { type: Number, required: true },
    momentum_trade_by: { type: String, required: true },
    momentum_value: { type: Number, required: true },
    range_breakout: { type: String, requried: true },
    breakout_starttime: { type: String, required: true },
    breakout_endtime: { type: String, required: true },
    breakout_side: { type: String, required: true },
    expiry: { type: String, required: true },
    lots: { type: String, required: true },
    position: { type: String, requried: true },
    inst_type: { type: String, required: true },
    strike_type: { type: String, required: true },
    strike: { type: String, required: true },
    range_min: { type: Number, required: true },
    range_max: { type: Number, required: true },
    premium: { type: Number, required: true },
    strike_percent: { type: Number, required: true },
    target_profit: { type: String, required: true },
    target_profit_value: { type: Number, required: true },
    reentry_target: { type: String, required: true },
    reentry_target_times: { type: Number, required: true },
    stoploss: { type: String, required: true },
    stoploss_value: { type: Number, required: true },
    reentry_stoploss: { type: String, required: true },
    reentry_stoploss_times: { type: Number, requried: true },
    trail_stoploss: { type: String, required: true },
    move_to_profit: { type: Number, required: true },
    move_stoploss: { type: Number, required: true },
    status: { type: String, required: true },
    timestamp: { type: String, required: true },
    remarks: { type: String, required: true }
});

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
